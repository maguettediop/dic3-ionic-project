import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ToastController } from '@ionic/angular'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   loginForm: FormGroup;   
   constructor(private service : AuthService, private formBuilder: FormBuilder,
    	private toastController: ToastController, private route : Router) { 
   } 
   ngOnInit() {    
   	 this.loginForm = this.formBuilder.group({ 
   	 	'identifier' : [null, [Validators.required,Validators.email]], 
        'password' : [null, [Validators.required]]});   
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
   login(userInfo : any)   {     
   		console.log(this.service.redirectUrl);    
   		this.service.login(userInfo).subscribe(data=>{ 
   	    this.service.isAuth.next(true);      
   	    window.localStorage.setItem('token',data.jwt);       
   	    this.route.navigateByUrl(this.service.redirectUrl); 

		},error=>{       
			this.presentToast("Nom d'utilisateur ou mot de passe incorrect",'danger'
				);
		});
	}

}
