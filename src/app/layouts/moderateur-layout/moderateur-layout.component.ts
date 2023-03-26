import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-moderateur-layout',
  templateUrl: './moderateur-layout.component.html',
  styleUrls: ['./moderateur-layout.component.css']
})
export class ModerateurLayoutComponent implements OnInit {
  currentUser : any ; 
  constructor(private token : TokenStorageService , private router : Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser(); 
  }
  deconnect(){
    this.token.signOut(); 
    
   }
}
