import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { KnowledgeManagementComponent } from './components/knowledge-management/knowledge-management.component';
import { AuthGuard } from './guards/auth.guard';
import { SkillTreeComponent } from './components/skill-tree/skill-tree.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'knowledge-management', component: KnowledgeManagementComponent, canActivate: [AuthGuard] },
  { path: 'skill-tree/:id', component: SkillTreeComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Redireccionar a 'login' si la ruta no existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
