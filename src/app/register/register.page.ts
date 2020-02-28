import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ToastController } from '@ionic/angular'; 
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

   registerForm: FormGroup;   
   constructor(private service : AuthService, private formBuilder: FormBuilder,
    	private toastController: ToastController, private route : Router) { 
   } 
   ngOnInit() {    
   	 this.registerForm = this.formBuilder.group({ 
   	 	'username' : [null, [Validators.required,Validators.minLength(3)]], 
        'email' : [null, [Validators.required, Validators.email]],
    	'password' : [null,[Validators.required]]});   
   	} 

   	async presentToast(message : string, color:string){
    const toast = await this.toastController.create({
   	message : message,
   	position : "top",
   	color:color,
   	duration : 2000

 	});
 	toast.present();
	}
   register(userInfo : User)   {       
   		this.service.register(userInfo).subscribe(data=>{ 
   	     this.presentToast('Inscription réussie','success');   
   	     this.route.navigateByUrl('login');   

		},error=>{       
			switch (error.error.message[0].messages[0].id) { 
				 case "Auth.form.error.email.taken":            
				 	 this.presentToast('Email déjà utilisé!','danger');          
				 	 break;         
				 case "Auth.form.error.username.taken":           
				 	 this.presentToast("Nom d'utilisateur déjà utilisé!",'danger');
				     break;         
				 default:            
				 	this.presentToast('Une erreur est survenue!','danger');           
				 	break; 
 
     		 }	   
		});
	}

}
