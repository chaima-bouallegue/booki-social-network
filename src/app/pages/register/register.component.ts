import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { RegistrationRequest } from '../../services/models/registration-request';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = { email: '', firstname: '', lastname: '', password: '' };
  errorMsg: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = []; // Réinitialiser les messages d'erreur avant la soumission

    this.authService.register({
      body: this.registerRequest
    }).pipe(
      catchError((error) => {
        // Gérer l'erreur ici et afficher les messages d'erreur
        this.errorMsg = error.message.split(', '); // Séparer les erreurs en tableau
        return []; // Retourner un tableau vide pour éviter l'échec de la requête
      })
    ).subscribe({
      next: () => {
        this.router.navigate(['activate-account']);
      },
      error: () => {
        // L'erreur est déjà gérée dans le catchError, on n'a pas besoin de la traiter ici
      }
    });
  }
}
