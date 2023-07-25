import { Injectable } from '@angular/core';
import { FirebaseDataService } from './firebase-data.service';
import { Observable, map } from 'rxjs';
import { SkillTec } from '../models/skill-tec.model';
import { SkillData } from '../models/skill-data.model';
import { Conocimiento, Usuario } from '../models/skill-user.model';
import { SkillDataNode, SkillPlanNode } from '../models/skill-plan.model';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {

  constructor(private firebasedataService: FirebaseDataService) { }

  getPlanPuntajes(planId: string): Observable<any> {
    // Obtiene el plan de trabajo y el equipo
    let planObservable = this.firebasedataService.getDocumentbyAttr("PlanDeTrabajo", "id", planId);
    let equipoObservable = this.firebasedataService.getCollection("Usuarios");

    // Combina los dos observables y calcula la media del conocimiento
    return planObservable.pipe(
      map((plan: SkillPlanNode) => {
        equipoObservable.subscribe(equipo => {
          // Filtra el equipo para obtener solo los usuarios asociados a este plan
          let usuariosAsociados = equipo.filter(usuario => plan.usuarios.includes(usuario.id));

          // Asumimos que 'plan' y 'usuariosAsociados' son arrays y seguimos la lógica de la respuesta anterior
          plan.ruta.forEach((tec:SkillDataNode) => {
            
            let puntuaciones = usuariosAsociados.flatMap((usuario: Usuario) => {
              return usuario.conocimientos
                .filter((conocimiento: Conocimiento) => conocimiento.tec_id === tec.tec.id)
                .map(conocimiento => conocimiento.puntuacion);
            });
            
            let suma = puntuaciones.reduce((a, b) => Number(a) + Number(b), 0);
            let media = suma / puntuaciones.length;
            
            tec.puntuacion = media;
            
          });
        });

        return plan;
      })
    );
  }
}
