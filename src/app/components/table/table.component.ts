import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  [x: string]: any;

  public adherents :any;
  public adherentsInitiaux :any;
  visibleItems = 2;
  conteur=0;
  query !:any;


  constructor( private UserService :  UtilisateurService , private route :Router) { }

  ngOnInit(): void {

    this.UserService.ListeDesUtilisateurs('adhérent').subscribe((data)=>{
      this.adherents = data;
      this.adherentsInitiaux=data;
      this.adherents.slice(this.conteur , this.visibleItems);

    })
  }

  onInputChange(): void {
    if (this.query === '') {
      this.adherents = this.adherentsInitiaux;// Réinitialise la liste des utilisateurs lorsque le champ de recherche est vide
      this.adherents.slice(this.conteur , this.visibleItems);
    }
  }

  VoirSuivant() {
    this.visibleItems += 2;
    this.conteur +=2;



  }
  VoirPrecedent() {
    this.visibleItems -= 2;
    this.conteur -=2;
  }


  deleteUser(id:any){
    this.UserService.SupprimerUtilisateur(id).subscribe((data)=>{
      console.log(id);

      this.UserService.ListeDesUtilisateurs('adhérent').subscribe((data)=>{
        this.adherents = data;
        this.adherentsInitiaux=data;
        this.adherents.slice(this.conteur , this.visibleItems);

      })


    })
  }
   search(query: any){
    console.log(this.query);
    this.UserService.RechercherUtilisateur('adhérent',this.query).subscribe((data)=>{
      this.adherents = data;

      this.adherents.slice(this.conteur , this.visibleItems);


    })
  }

}
