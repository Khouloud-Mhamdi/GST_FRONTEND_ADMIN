import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DisciplineService } from 'src/app/services/discipline.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm !: FormGroup <any> ;
  public clubs : any ; 
  showDisciplines = false ; 
  FormGroup: any;
  ajout = false ; 
  erreur = false ; 
  showConfirmationDialog = false ; 
  constructor(private authService : AuthService , private disciplineService : DisciplineService , private formBuilder :FormBuilder) { }

  ngOnInit(): void {
    this.addUserForm= this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName : ["", [Validators.required , Validators.minLength(3)]],
      email : ["", [Validators.email,Validators.required]],
      adresse : ["", [Validators.required , Validators.minLength(3) , Validators.maxLength(100)]],
      telephone : ["", [Validators.required]],
      role : ["", [Validators.required]] ,
      id_discipline : ["", [Validators.required]]
     }
     );
     this.getAllclubs();
  }
  getAllclubs()
  {
    this.disciplineService.ListerDisciplines().subscribe((data)=>{
    this.clubs = data ; 
    })
  }
  
  addUser(){

    console.log(this.addUserForm.value); 
    this.authService.addNewUser(this.addUserForm.value).subscribe(
      (data) => {
        console.log(data); 
        this.ajout=true; 
        setTimeout(() => {
          this.ajout = false;
        }, 3000); // 3000 ms = 3 secondes
      },
      (err) => {
        console.log("here error from BE", err);
        this.erreur=true; 
        setTimeout(() => {
          this.erreur = false;
        }, 3000); // 3000 ms = 3 secondes
      }
      
    ); 
    this.closeConfirmationDialog(); 
  }
  
  // event of role selection 
 onRoleChange() {
    console.log("hello", this.showDisciplines)
    const selectedRole = this.addUserForm?.get('role')?.value;
    if (selectedRole !== undefined && selectedRole === 'moderateur') {
      this.showDisciplines = true;
    } else {
      this.showDisciplines = false;
    }
  }
  
  openConfirmationDialog(){
    this.showConfirmationDialog = true;
  }
  
  closeConfirmationDialog(){
    this.showConfirmationDialog = false;
  }
  
 

}
