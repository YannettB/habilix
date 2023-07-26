import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { SkillPlanNode } from 'src/app/models/skill-plan.model'; import { Conocimiento, Usuario } from 'src/app/models/skill-user.model';
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
  conocimientoForm: FormGroup;
  detalleConocimiento: Usuario | undefined;
  jsonData: SkillPlanNode = new SkillPlanNode;

  displayedColumns: string[] = ['id', 'lenguaje', 'acciones'];
  displayedColumnsUsuario: string[] = ['usuario', 'acciones'];
  displayedColumnsConocimiento: string[] = ['tec_id', 'puntuacion'];

  dataSourceConocimiento: MatTableDataSource<Conocimiento> = new MatTableDataSource<Conocimiento>();
  dataSource: MatTableDataSource<SkillPlanNode> = new MatTableDataSource<SkillPlanNode>(); //any[] = [];
  dataSourceUsuario: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();

  @ViewChild(MatTable) tablaSkillPlan!: MatTable<SkillPlanNode>;
  @ViewChild(MatTable) tablaUsuarios!: MatTable<SkillPlanNode>;
  @ViewChild(MatTable) tablaConocimientos!: MatTable<SkillPlanNode>;
  

  constructor(private fireBaseDataService: FirebaseDataService, private formBuilder: FormBuilder, private router: Router) {
    this.jsonForm = this.formBuilder.group({
      file: ['', Validators.required]
    });
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      conocimientos: this.formBuilder.array([]) // Inicializamos como un FormArray vacío
    });
    this.conocimientoForm = this.formBuilder.group({
      tec_id: ['', Validators.required],
      puntuacion: ['', Validators.required] // Inicializamos como un FormArray vacío
    });
  }

  ngOnInit(): void {
    this.cargarDatosPlan();
    this.cargarDatosUsuarios();
  }

  get conocimientosFormArray() {
    return this.usuarioForm.get('conocimientos') as FormArray;
  }

  agregarUsuario(): void {
    this.dataSourceUsuario.data.push({
      id: this.usuarioForm.get('nombre')?.value,
      nombre: this.usuarioForm.get('nombre')?.value,
      conocimientos: []
    });
    this.dataSourceUsuario._updateChangeSubscription(); // Actualizar datos de la tabla
    this.usuarioForm.reset();
  }

  verDetalle(usuario: Usuario) {
    this.detalleConocimiento = usuario;
    this.dataSourceConocimiento.data = usuario.conocimientos;
  }

  agregarConocimiento(): void {
    if (this.detalleConocimiento) {
      this.detalleConocimiento.conocimientos.push({
        tec_id: this.conocimientoForm.get('tec_id')?.value,
        puntuacion: this.conocimientoForm.get('puntuacion')?.value
      });
      this.dataSourceConocimiento.data = this.detalleConocimiento.conocimientos;
    }
    this.dataSourceConocimiento._updateChangeSubscription(); // Actualizar datos de la tabla
    this.conocimientoForm.reset();
  }

  guardarUsuarios(): void {
    if (this.dataSourceUsuario.data) {
      this.fireBaseDataService.addCollection('Usuarios', this.dataSourceUsuario.data)
      .then(() => {
        this.cargarDatosUsuarios();
        console.log('Los usuarios se han guardado correctamente.');
        console.log(this.dataSourceUsuario.data);
      })
      .catch((error) => {
        console.error('Error al guardar los usuarios:', error);
      });
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


  getPlan(): void {
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

  cargarDatosPlan(): void {
    this.fireBaseDataService.getCollection('PlanDeTrabajo').subscribe((planes: SkillPlanNode[]) => {
      this.dataSource.data = planes;
      this.tablaSkillPlan.renderRows();
    });
  }

  cargarDatosUsuarios(): void {
    this.fireBaseDataService.getCollection('Usuarios').subscribe((usuarios) => {
      this.dataSourceUsuario.data = usuarios;
      this.tablaUsuarios.renderRows();
      this.detalleConocimiento = undefined;
      this.dataSourceConocimiento = new MatTableDataSource<Conocimiento>();
      this.tablaConocimientos.renderRows();
    });
  }

  applyFilterUsuario(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsuario.filter = filterValue?.trim().toLowerCase() || '';
  }

  applyFilterTecnologia(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceConocimiento.filter = filterValue?.trim().toLowerCase() || '';
  }

  applyFilterPlanTrabajo(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue?.trim().toLowerCase() || '';
  }

}

