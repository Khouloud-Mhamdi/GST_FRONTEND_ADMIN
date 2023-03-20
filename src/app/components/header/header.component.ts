import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser : any ; 
  constructor(private token : TokenStorageService , private router : Router ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser(); 
  }
  deconnect(){
   this.token.signOut(); 
   this.router.navigate(["login"]);
  }

}
