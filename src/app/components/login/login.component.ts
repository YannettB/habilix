import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

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

  constructor(private authService: AuthenticationService) { }

  onLogin() {
    // Lógica para realizar el inicio de sesión con el servicio de autenticación
    this.authService.loginWithEmail(this.email, this.password)
      .then(() => {
        // Redirección o acciones adicionales después del inicio de sesión exitoso
        console.log('Inicio de sesión exitoso');
        this.status = 'logueado';
      })
      .catch((error) => {
        // Manejar errores de inicio de sesión aquí
        console.error('Error al iniciar sesión:', error);
        this.status = 'error';
        alert('error');
      });
  }

  onRegister() {
    this.authService.register(this.email, this.password)
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
