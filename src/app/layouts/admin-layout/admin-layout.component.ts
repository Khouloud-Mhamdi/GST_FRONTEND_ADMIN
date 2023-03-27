import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private token : TokenStorageService , private router : Router) { }
  currentUser : any ;

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
  deconnect(){
    this.token.signOut();

   }
   toggleSidebar(event: { preventDefault: () => void; }) {
    event.preventDefault(); // empêcher le comportement de navigation par défaut
    // Code pour ouvrir/fermer la barre latérale
  }
 







}
