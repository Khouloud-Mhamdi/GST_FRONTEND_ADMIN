import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public adherents :any;



  constructor( private UserService :  UtilisateurService , private route :Router) { }

  ngOnInit(): void {

    this.UserService.ListeDesUtilisateurs('adhérent').subscribe((data)=>{
      this.adherents = data;

    })



  }
  deleteUser(id:any){
    this.UserService.SupprimerUtilisateur(id).subscribe((data)=>{
      console.log(id);

      window.alert("Utilisateur Supprimé ");
    })
  }

}
