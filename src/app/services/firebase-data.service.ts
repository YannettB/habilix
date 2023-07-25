import { Injectable } from '@angular/core';
import { SkillPlanNode } from '../models/skill-plan.model';
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  constructor() { }

  // Función para agregar un documento a una colección
  async addDocument(collectionName: string, data: any): Promise<void> {
    const db = getFirestore();
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, data);
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

  async obtenerDatosDummy(): Promise<any> {
    const rawData: SkillPlanNode[] = [
      {
        "id": "plan1",
        "lenguaje": "lenguaje1",
        "usuarios": ["user1", "user2", "user3"],
        "puntuacion": 5,
        "ruta": [
          {
            "tec": { "tec": "tec-1", "descr": "descr1" },
            "puntuacion": 5,
            "childs": [
              {
                "tec": { "tec": "tec-1.1", "descr": "descr1" },
                "puntuacion": 5,
                "childs": []
              },
              {
                "tec": { "tec": "tec-1.2", "descr": "descr1" },
                "puntuacion": 5,
                "childs": [
                  {
                    "tec": { "tec": "tec-1.2.1", "descr": "descr1" },
                    "puntuacion": 5,
                    "childs": []
                  }
                ]
              }
            ]
          },
          {
            "tec": { "tec": "tec-2", "descr": "descr1" },
            "puntuacion": 5,
            "childs": [{
              "tec": { "tec": "tec-2.2", "descr": "descr1" },
              "puntuacion": 5,
              "childs": [
                {
                  "tec": { "tec": "tec-2.2.1", "descr": "descr1" },
                  "puntuacion": 5,
                  "childs": []
                }
              ]
            }]
          }
        ]
      }
    ];

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = rawData;
        resolve(data);
      }, 2000);
    });

  }
}
