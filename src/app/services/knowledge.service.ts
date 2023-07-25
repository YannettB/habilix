import { Injectable } from '@angular/core';
import { FirebaseDataService } from './firebase-data.service';
import { Observable, map, switchMap } from 'rxjs';
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
    // Obtiene el plan de trabajo
    let planObservable = this.firebasedataService.getDocumentbyAttr("PlanDeTrabajo", "id", planId);
  
    // Combina los dos observables y calcula la media del conocimiento
    return planObservable.pipe(
      switchMap((plan: SkillPlanNode) => {
        // Obtiene el equipo
        let equipoObservable = this.firebasedataService.getCollection("Usuarios");
  
        // Mapea el equipo a los usuarios asociados y calcula la media del conocimiento
        return equipoObservable.pipe(
          map(equipo => {
            // Filtra el equipo para obtener solo los usuarios asociados a este plan
            let usuariosAsociados = equipo.filter(usuario => plan.usuarios.includes(usuario.id));
  
            // Asumimos que 'plan' y 'usuariosAsociados' son arrays y seguimos la lógica de la respuesta anterior
            this.obtenerMediaPuntaje(plan.ruta, usuariosAsociados);
  
            return plan;
          })
        );
      })
    );
  }
  

  private obtenerMediaPuntaje(ruta: SkillDataNode[], usuariosAsociados: any[]) {
    ruta.forEach((tec: SkillDataNode) => {

      let puntuaciones = usuariosAsociados.flatMap((usuario: Usuario) => {
        return usuario.conocimientos
          .filter((conocimiento: Conocimiento) => conocimiento.tec_id === tec.tec.id)
          .map(conocimiento => conocimiento.puntuacion ?? 0);
      });

      let suma = puntuaciones.reduce((a, b) => Number(a) + Number(b), 0);
      let media = suma / (puntuaciones.length == 0 ? 1 : puntuaciones.length );

      tec.puntuacion = Number(media.toFixed(1));

      if(tec.childs && tec.childs.length > 0) {
        this.obtenerMediaPuntaje(tec.childs, usuariosAsociados);
      }

    });
  }
}