import { Injectable } from '@angular/core';
import { SkillPlanNode } from '../models/skill-plan.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  constructor() { }

  async obtenerDatosDummy(): Promise<any> {
    const rawData: SkillPlanNode[] = [
      {
        "id": "plan1",
        "lenguaje": "lenguaje1",
		    "usuarios": ["user1", "user2", "user3"],
        "puntuacion": 5,
        "ruta": [
          {
            "tec": {"tec":"tec-1", "descr": "descr1"},
            "puntuacion": 5,
            "childs": [
              {
                "tec": {"tec":"tec-1.1", "descr": "descr1"},
                "puntuacion": 5,
                "childs": []
              },
              {
                "tec": {"tec":"tec-1.2", "descr": "descr1"},
                "puntuacion": 5,
                "childs": [
                  {
                    "tec": {"tec": "tec-1.2.1", "descr": "descr1"},
                    "puntuacion": 5,
                    "childs": []
                  }
                ]
              }
            ]
          },
          {
            "tec": {"tec":"tec-2", "descr": "descr1"},
            "puntuacion": 5,
            "childs": [{
              "tec": {"tec":"tec-2.2", "descr": "descr1"},
              "puntuacion": 5,
              "childs": [
                {
                  "tec": {"tec":"tec-2.2.1", "descr": "descr1"},
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
