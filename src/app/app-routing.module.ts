import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { KnowledgeManagementComponent } from './components/knowledge-management/knowledge-management.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'knowledge-management', component: KnowledgeManagementComponent, canActivate: [AuthGuard] },
  // Otras rutas si las tienes
  // ...
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Redireccionar a 'login' si la ruta no existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
