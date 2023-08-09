import { RepositoryInterface } from "@/repositories/Base/Repository";
import {
  CollectionReference,
  collectionGroup,
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentReference,
  getDoc,
  DocumentSnapshot,
  onSnapshot,
  Unsubscribe,
  DocumentChange,
  updateDoc,
  deleteDoc,
  FirestoreDataConverter
} from "firebase/firestore";
import Firebase from "@/providers/firebase";
// import { useAuthStore } from "@/stores/auth";

interface FirebaseObject {
  id: string;
  [key: string]: any;
}

export abstract class FirebaseRepository implements RepositoryInterface {
  firebasePath: string;
  databaseRef: CollectionReference;
  converter: FirestoreDataConverter<any>;

  constructor(path: string, converter: FirestoreDataConverter<any>) {
    this.firebasePath = path
    this.databaseRef = collection(Firebase.database, `${this.firebasePath}`);
    this.converter = converter
  }

  getQuery() {
    return query(
      collectionGroup(Firebase.database, `${this.firebasePath}`)
        .withConverter(this.converter)
    )
  }

  getDocReference(
    id: string | number | null = null,
    path: string | null = null
  ): DocumentReference {
    return doc(
      Firebase.database,
      `${path ? path : this.firebasePath}${id ? `/${id}` : ''}`
    )
  }

  subscribeAllChanges(): Unsubscribe {
    const q = this.getQuery();
    return onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change: DocumentChange) => {
        if (change.type === "added") {
          console.log("New: ", change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Modified: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed: ", change.doc.data());
        }
      });
    });
  }

  async hydrateRelations(entity: FirebaseObject, relations: Array<string>) {
    return new Promise(async (resolve, reject) => {
      relations.forEach(async (relationKey: string) => {
        const relation: DocumentReference = entity[relationKey];

        await getDoc(doc(Firebase.database, relation.path))
          .then(async (document: DocumentSnapshot) => {
            let data = { ...document.data() },
            references = Object.entries(document.data())
              .filter(([key, value]) => typeof value === `object` && value.constructor.name === `_DocumentReference`)
              .map(([key, value]) => ({key, value}));

            if (references.length > 0) {
              data = await this.hydrateRelations(data, references.map(reference => reference.key));
            }
            entity[relationKey] = { id: document.id, ...data }
            resolve(entity);
          })
          .catch(error => {
            console.error(`Error on hydrate ${entity.id} Relations`);
            reject(error);
          });
      })
    });
  }

  async fetch(params: any = null) {
    return new Promise(async (resolve, reject) => {
      await getDocs(this.getQuery())
      .then(async (snapshot: QuerySnapshot) => {
        let data: Array<any> = [];

        await Promise.all(
          snapshot.docs.map((document: QueryDocumentSnapshot) => 
            new Promise(async (resolveHydration, rejectHydration) => {
              let element = { id: document.id, ...document.data() };
              if (params && params.with) {
                await this.hydrateRelations(element, params.with)
                  .then((hydratedElement: any) => {
                    element = hydratedElement;
                    resolveHydration(hydratedElement);
                  })
                  .catch(error => rejectHydration(error));
              }
              data.push(element)
              resolveHydration(element)
            })
          )
        )

        resolve(data);
      })
      .catch(error => reject(error));
    })
  }

  fetchOne(id: string | number, params: any = null) {
    return new Promise(async (resolve, reject) => {
      await getDoc(doc(Firebase.database, `${this.firebasePath}/${id}`))
        .then(async (document: DocumentSnapshot) => {
          let element = { id: document.id, ...document.data() };
          if (params && params.with) {
            await this.hydrateRelations(element, params.with)
              .then((hydratedElement: any) => {
                element = hydratedElement;
                resolve(hydratedElement);
              })
              .catch(error => reject(error));
          }
          resolve(element)
        })
        .catch(error => reject(error));
    })
  }

  async post(params: any) {
    const reference = doc(this.databaseRef).withConverter(this.converter);
    await setDoc(reference, params);
    return reference;
  }

  put(id: string, params: any) {
    return updateDoc(
      doc(Firebase.database, `${this.firebasePath}/${id}`).withConverter(this.converter),
      params
    );;
  }

  delete(id: string) {
    return deleteDoc(this.getDocReference(id))
  }
}
