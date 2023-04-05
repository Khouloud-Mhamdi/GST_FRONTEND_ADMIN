import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EvenementService } from 'src/app/services/evenement.service';

@Component({
  selector: 'app-ajout-event',
  templateUrl: './ajout-event.component.html',
  styleUrls: ['./ajout-event.component.css']
})
export class AjoutEventComponent implements OnInit {
  userFile : any   ;
  public imagePath : any ;
  imgURL: any;
  public message !: string;
  showConfirmationDialog = false ; 
  ajoutEvent =  false ; 
  erreur = false ; 

  
  constructor(  private router : Router  , public  eventService : EvenementService , public formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.eventService.dataForm = this.formBuilder.group ({
      titre : ['', [Validators.required]],
      lieu : ['', [Validators.required]],
      date: ['' ,  [Validators.required] ],
      description : ['', [Validators.required]],
    }) ; 
  }
  onSelectFile(event : any ) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
     // this.f['profile'].setValue(file);
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
     
      
    }
   
    addData() {
      const formData = new  FormData();
      const event = this.eventService.dataForm.value ; 
      formData.append('event',JSON.stringify(event));
      formData.append('file',this.userFile);
      this.eventService.createData(formData).subscribe( 
      (data) => {
      console.log("succée mayssa ! ") ; 
        this.ajoutEvent = true ; 
        setTimeout(() => {
          this.ajoutEvent = false;
        }, 3000);
        this.eventService.dataForm.reset() ; 
        this.ngOnInit() ; 
      }, 
      (err) => {
        console.log('probleme !!! ', err);
        this.erreur = true;
        setTimeout(() => {
          this.erreur = false;
        }, 3000); // 3000 ms = 3 secondes
      }
      ); 
    }


    onSubmit(){
      if ((!this.userFile)||(!this.eventService.dataForm.value.date)){
        this.erreur = true ; 
        setTimeout(() => {
          this.erreur = false;
        }, 3000); // 3000 ms = 3 secondes
      }
      else {
        this.addData() ; 
        if (this.ajoutEvent == true ) {
          this.eventService.dataForm.reset() ; 
        }
      }
     this.closeConfirmationDialog() ; 
    }
    closeConfirmationDialog(){
       this.showConfirmationDialog = false ; 
    }
    openConfirmationDialog(){
      this.showConfirmationDialog = true;
    }
  
   

}
