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
  }
}
