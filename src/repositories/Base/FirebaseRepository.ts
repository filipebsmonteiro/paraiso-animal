import { RepositoryInterface } from "@/repositories/Base/Repository";
import {
  CollectionReference,
  collection,
  doc,
  getDocs,
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
  addDoc,
} from "firebase/firestore";
import Firebase from "@/providers/firebase";
import { FirestoreModel } from "@/models/Base/FirestoreModel";

interface FirebaseObject {
  id: string;
  [key: string]: any;
}

export abstract class FirebaseRepository implements RepositoryInterface {
  collectionRef: CollectionReference;

  constructor(public model: FirestoreModel, public path: string) {
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

  private async hydrateReferences(model: FirestoreModel): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      let references = {...model.getRelations()};
      Object.entries(references).map(async ([key, value]) => {
        const relationRef: DocumentReference = doc(Firebase.database, value.reference.path).withConverter(value.converter);

        await getDoc(relationRef)
          .then(async (snapshot: DocumentSnapshot) => {
            let data = snapshot.data() as FirestoreModel,
            subReferences: any = {};

            if (Object.keys(value.getRelations()).length > 0) {
              subReferences = await this.hydrateReferences(data);
            }

            references[key] = {...data, ...subReferences};
          })
          .catch(error => reject(error));
      })
      resolve(references);
    })
  }

  async fetch(params: any = null) {
    return new Promise(async (resolve, reject) => {

      await getDocs(this.collectionRef.withConverter(this.model.converter))
      .then(async (snapshot: QuerySnapshot) => {
        let data: Array<any> = [];

        await Promise.all(
          snapshot.docs.map((document: QueryDocumentSnapshot) => 
            new Promise(async (resolveReference) => {
              let model = document.data() as FirestoreModel;;
              // if (params && params.with) {
                await this.hydrateReferences(model)
              // }
              data.push(model)
              resolveReference(model)
            })
          )
        )

        resolve(data);
      })
      .catch(error => reject(error));
    })
  }

  find(id: string | number) {
    return new Promise(async (resolve, reject) => {

      const reference = this.getDocReference(id).withConverter(this.model.converter)
      await getDoc(reference)
        .then(async (snapshot: DocumentSnapshot) => {
          let model: FirestoreModel = snapshot.data() as FirestoreModel;
          await this.hydrateReferences(model);
          Object.assign(model, { reference });
          resolve(model)
        })
        .catch(error => reject(error));
    })
  }

  async post(params: any) {
    return addDoc(this.collectionRef, params);
  }

  put(id: string, params: any) {
    return updateDoc(
      doc(Firebase.database, `${this.path}/${id}`),
      params
    );;
  }

  delete(id: string) {
    return deleteDoc(this.getDocReference(id))
  }
}
