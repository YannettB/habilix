import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, catchError, tap } from 'rxjs';
import { SkillDataNode, SkillPlanNode } from 'src/app/models/skill-plan.model';import { Usuario } from 'src/app/models/skill-user.model';
;
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-knowledge-management',
  templateUrl: './knowledge-management.component.html',
  styleUrls: ['./knowledge-management.component.css']
})
export class KnowledgeManagementComponent implements OnInit {
  jsonForm: FormGroup;
  usuarioForm: FormGroup;
  usuario: Usuario = new Usuario();
  jsonData: SkillPlanNode = new SkillPlanNode;
  displayedColumns: string[] = ['id', 'lenguaje', 'acciones'];
  dataSource: any[] = [];
  @ViewChild(MatTable) tablaSkillPlan!: MatTable<SkillPlanNode>;

  constructor(private fireBaseDataService: FirebaseDataService, private formBuilder: FormBuilder, private router: Router) {
    this.jsonForm = this.formBuilder.group({
      file: ['', Validators.required]
    });
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      conocimientos: this.formBuilder.array([]) // Inicializamos como un FormArray vacío
    });
  }

  ngOnInit(): void {
    this.cargarDatosPlan();
  }

  // Obtener el control del FormArray para conocimientos
  get conocimientosArray(): FormArray {
    return this.usuarioForm.get('conocimientos') as FormArray;
  }

  // Agregar un nuevo conocimiento al FormArray de conocimientos
  agregarConocimiento(): void {
    this.conocimientosArray.push(this.formBuilder.group({
      tec_id: ['', Validators.required],
      puntuacion: [0, Validators.required]
    }));
  }

  // Remover un conocimiento del FormArray de conocimientos
  removerConocimiento(index: number): void {
    this.conocimientosArray.removeAt(index);
  }

  onSubmitUser(): void {
    if (this.usuarioForm.valid) {
      const nuevoUsuario: Usuario = this.usuarioForm.value;
      console.log(nuevoUsuario);
      // Aquí puedes hacer lo que necesites con el nuevo usuario, como enviarlo a Firebase para guardarlo
    }
  }

  onSubmit(): void {
    if (this.jsonForm.valid) {
      const obj = this.jsonForm.get('file');
      const file = obj == null ? "" : obj.value;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          this.jsonData = JSON.parse(event.target.result);
          console.log('JSON cargado correctamente:', this.jsonData);
          this.guardarPlanDeTrabajo(this.jsonData);
        } catch (error) {
          console.error('Error al leer el archivo JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.jsonForm.patchValue({ file: inputElement.files[0] });
    }
  }

  async guardarPlanDeTrabajo(json: SkillPlanNode) {
    this.fireBaseDataService.addDocument('PlanDeTrabajo', json)
      .then(() => {
        this.cargarDatosPlan();
        console.log('Plan de trabajo guardado correctamente.');
      })
      .catch((error) => {
        console.error('Error al guardar el plan de trabajo:', error);
      });
  }


  getPlan() {
    const planId = "plan1"; // ID personalizado para el documento

    this.fireBaseDataService.getDocumentbyAttr("PlanDeTrabajo", "id", planId)
      .pipe(
        tap((data) => {
          if (data) {
            // El documento fue encontrado, hacer algo con los datos obtenidos
            console.log(data);
          } else {
            // El documento no fue encontrado
            console.log("Documento no encontrado.");
          }
        }),
        catchError((error) => {
          // Manejar errores en la obtención del documento
          console.error("Error al obtener el documento:", error);
          return [];
        })
      )
      .subscribe();
  }

  verPlan(id: string): void {
    // Navegar al componente skill-tree con el id del plan seleccionado
    this.router.navigate(['/skill-tree', id]);
  }

  cargarDatosPlan() {
    this.fireBaseDataService.getCollection('PlanDeTrabajo').subscribe((planes) => {
      this.dataSource = planes;
      this.tablaSkillPlan.renderRows();
    });
  }

}

