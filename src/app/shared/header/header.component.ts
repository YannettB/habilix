import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  nombreUsuario$: Observable<string> | undefined;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    // Suscribirse al Observable para obtener el nombre de usuario
    this.nombreUsuario$ = this.authService.getNombreUsuario();
  }


  cerrarSesion(): void {
    // Lógica para cerrar sesión utilizando el servicio de autenticación
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  irInicio(): void {
    this.router.navigate(['/knowledge-management']);
  }
}
