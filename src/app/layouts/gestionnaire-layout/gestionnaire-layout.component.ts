import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-gestionnaire-layout',
  templateUrl: './gestionnaire-layout.component.html',
  styleUrls: ['./gestionnaire-layout.component.css']
})
export class GestionnaireLayoutComponent implements OnInit {

  constructor(private token : TokenStorageService , private router : Router) { }
  currentUser : any ;
  ngOnInit(): void {
    this.currentUser = this.token.getUser(); 
  }
  deconnect(){
    this.token.signOut(); 
   }
}
