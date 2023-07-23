import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  status: string = 'login';

  constructor(private authService: AuthenticationService, private router: Router) { }

  onLogin() {
    // Lógica para realizar el inicio de sesión con el servicio de autenticación
    this.authService.loginWithEmail(this.email, this.password)
      .then(() => {
        // Redirección o acciones adicionales después del inicio de sesión exitoso
        console.log('Inicio de sesión exitoso');
        console.log(this.authService.isLoggedInUser());
        this.status = 'logueado';
        this.router.navigate(['/knowledge-management']);
      })
      .catch((error) => {
        // Manejar errores de inicio de sesión aquí
        console.error('Error al iniciar sesión:', error);
        this.status = 'error';
        alert('error');
      });
  }

  onRegister() {
    this.authService.register(this.registerEmail, this.registerPassword)
      .then(() => {
        // Registro exitoso, puedes realizar alguna acción adicional si lo deseas
        console.log('Registro exitoso');
        this.status = 'registrado';
      })
      .catch((error) => {
        // Manejar errores de registro
        console.error('Error al registrar:', error);
        this.status = 'error';
      });
  }

  onLogout() {
    this.authService.logout()
      .then(() => {
        // Cierre de sesión exitoso, puedes realizar alguna acción adicional si lo deseas
        console.log('Cierre de sesión exitoso');
        this.status = 'login';
      })
      .catch((error) => {
        // Manejar errores de cierre de sesión
        console.error('Error al cerrar sesión:', error);
        this.status = 'error';
      });
  }
  
}
