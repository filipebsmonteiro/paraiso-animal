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
} from "firebase/firestore";
import Firebase from "@/providers/firebase";
import { Model } from "@/models/Model";

interface FirebaseObject {
  id: string;
  [key: string]: any;
}

export abstract class FirebaseRepository implements RepositoryInterface {
  collectionRef: CollectionReference;

  constructor(public model: Model, public path: string) {
    this.collectionRef = collection(Firebase.database, `${this.path}`);
  }

  getDocReference(
    id: string | number | null = null,
    path: string | null = null
  ): DocumentReference {
    return doc(
      Firebase.database,
      `${path ? path : this.path}${id ? `/${id}` : ''}`
    )
  }

  subscribeAllChanges(): Unsubscribe {
    return onSnapshot(this.collectionRef, (snapshot) => {
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

  getRelationsReferences(entity: FirebaseObject, filter: Array<string> = []): Record<string, DocumentReference> {
    return Object.entries(entity)
      .reduce(
        (acc, [key, value]) => 
          value?.constructor.name === `_DocumentReference` && (filter.length === 0 || filter.includes(key))
          ? {...acc, [key]: doc(entity[key].path)}
          : acc,
        {}
      );
  }

  private async hydrateRelations(entity: FirebaseObject, relations: Array<string>) {
    return new Promise(async (resolve, reject) => {
      relations.forEach(async (relationKey: string) => {
        const relation: DocumentReference = entity[relationKey];

        await getDoc(doc(Firebase.database, relation.path))
          .then(async (snapshot: DocumentSnapshot) => {
            let data = { ...snapshot.data() },
            references = Object.entries(snapshot.data())
              .reduce((acc, [key, value]) => value?.constructor.name === `_DocumentReference` ? [...acc, key] : acc, [])

            if (references.length > 0) {
              data = await this.hydrateRelations(data, references);
            }
            entity[relationKey] = { ...data, id: snapshot.id, snapshot }
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

      await getDocs(this.collectionRef.withConverter(this.model.converter))
      .then(async (snapshot: QuerySnapshot) => {
        let data: Array<any> = [];

        await Promise.all(
          snapshot.docs.map((document: QueryDocumentSnapshot) => 
            new Promise(async (resolveReference, rejectReference) => {
              let element = { id: document.id, ...document.data() };
              if (params && params.with) {
                await this.hydrateRelations(element, params.with)
                  .then((hydratedElement: any) => {
                    element = hydratedElement;
                    resolveReference(hydratedElement);
                  })
                  .catch(error => rejectReference(error));
              }
              data.push(element)
              resolveReference(element)
            })
          )
        )

        resolve(data);
      })
      .catch(error => reject(error));
    })
  }

  find(id: string | number, params: any = null) {
    return new Promise(async (resolve, reject) => {
      await getDoc(doc(Firebase.database, `${this.path}/${id}`))
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
    const reference = doc(this.databaseRef);//.withConverter(this.converter);
    await setDoc(reference, params);
    return reference;
  }

  put(id: string, params: any) {
    return updateDoc(
      doc(Firebase.database, `${this.path}/${id}`),//.withConverter(this.converter),
      params
    );;
  }

  delete(id: string) {
    return deleteDoc(this.getDocReference(id))
  }
}
