import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My App';
  currentUser: any;
  login = false ; 
  constructor(private router: Router , private token: TokenStorageService ) {}

  ngOnInit() {
    console.log(this.login); 
    // Vérifiez si l'utilisateur est déjà connecté
    //const isLoggedIn =1 // implémenter la logique de vérification de connexion

    //if (!isLoggedIn) {
      // Rediriger l'utilisateur vers la page de connexion
      // this.router.navigate(['/login']);
    //}
     this.currentUser = this.token.getToken();  
     if (this.currentUser !== null) {
      // La valeur retournée n'est pas nulle, le code pour traiter la valeur peut être écrit ici
      console.log(this.currentUser);
      this.login = true ; 
      //this.router.navigate(['dashboard']);
    } else {
      // La valeur retournée est nulle, le code pour gérer cette situation peut être écrit ici
      this.login= false ; 
      console.log('Aucun utilisateur n\'a été trouvé');
      this.router.navigate(['login']);
    }
    console.log(this.login); 
  }
}
