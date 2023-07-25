import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { KnowledgeManagementComponent } from './components/knowledge-management/knowledge-management.component';
import { SkillTreeComponent } from './components/skill-tree/skill-tree.component';
import { HeaderComponent } from './shared/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KnowledgeManagementComponent,
    SkillTreeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule ,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTreeModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
