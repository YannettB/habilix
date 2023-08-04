import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc, getDocs, deleteDoc, query, where, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  constructor() { }

  // Función para agregar un documento a una colección
  async addDocument(collectionName: string, data: any): Promise<void> {
    const db = getFirestore();
    const collectionRef = doc(collection(db, collectionName), data.id);
    await setDoc(collectionRef, data);
  }

  async addCollection(collectionName: string, data: any[]): Promise<void> { 
    for (const docData of data) {
      await this.addDocument(collectionName, docData);
    }
  }

  // Función para actualizar un documento existente en una colección
  async updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
    const db = getFirestore();
    const docRef = doc(collection(db, collectionName), docId);
    await updateDoc(docRef, data);
  }

  // Función para obtener un documento por su ID
  getDocument(collectionName: string, docId: string): Observable<any> {
    const db = getFirestore();
    const docRef = doc(collection(db, collectionName), docId);
    return new Observable<any>(observer => {
      getDoc(docRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            observer.next(snapshot.data());
          } else {
            observer.next(null);
          }
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // Función para obtener todos los documentos de una colección
  getCollection(collectionName: string): Observable<any[]> {
    const db = getFirestore();
    const collectionRef = collection(db, collectionName);
    return new Observable<any[]>(observer => {
      getDocs(collectionRef)
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          observer.next(data);
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // Función para eliminar un documento de una colección por su ID
  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    const db = getFirestore();
    const docRef = doc(collection(db, collectionName), docId);
    await deleteDoc(docRef);
  }

  getDocumentbyAttr(collectionName: string, attributeName: string, attributeValue: any): Observable<any> {
    const db = getFirestore();
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(attributeName, '==', attributeValue));
  
    return new Observable<any>(observer => {
      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            // Se encontraron documentos que cumplen el criterio de búsqueda
            querySnapshot.forEach((doc) => {
              observer.next(doc.data());
            });
          } else {
            // No se encontraron documentos que cumplan el criterio de búsqueda
            observer.next(null);
          }
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  
}
