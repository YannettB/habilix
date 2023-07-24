import { Injectable } from '@angular/core';
import { FireBaseData } from '../models/firebase-data.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  constructor() { }

  async obtenerDatosDummy(): Promise<any> {
    const rawData: FireBaseData[] = [
      {
        "lenguaje": "lenguaje1",
        "ruta": [
          {
            "tec": "tec-1",
            "descr": "descr1",
            "childs": [
              {
                "tec": "tec-1.1",
                "descr": "descr1",
                "childs": []
              },
              {
                "tec": "tec-1.2",
                "descr": "descr1",
                "childs": [
                  {
                    "tec": "tec-1.2.1",
                    "descr": "descr1",
                    "childs": []
                  }
                ]
              }
            ]
          },
          {
            "tec": "tec-2",
            "descr": "descr1",
            "childs": []
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
