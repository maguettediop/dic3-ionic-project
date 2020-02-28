import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PlatService } from './../../service/plat.service';
import { Plat } from 'src/app/Models/plat';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.page.html',
  styleUrls: ['./modifier.page.scss'],
})
export class ModifierPage implements OnInit {
  platId : number;
  plat: Plat;
  constructor(private route : ActivatedRoute, private service : PlatService, private toast : ToastController,
    private router: Router)
  { 
    this.platId = Number(this.route.snapshot.paramMap.get('id')); 
    this.plat= new Plat();
    this.getPlat();
    console.log("Id="+this.platId);
  }

  

  ngOnInit() {
  }
  async presentToast(message : string, color:string){
 const toast = await this.toast.create({
   message : message,
   position : "top",
   color:color,
   duration : 2000

 });
 toast.present();
}
 getPlat():void 
  {
    this.service.getPlat(this.platId).subscribe(plat =>{
        this.plat = plat;
    }, 
    error=>
    { 
      this.presentToast('Erreur survenue','danger');

    });
  }

modifierPlat(): void{
      
     console.log(this.plat);
     this.service.updatePlat(this.plat).subscribe(plat => {
     this.presentToast("Plat modifié avec succes", "Success");
     this.router.navigateByUrl('/tabs/plats');
     },error => {
     this.presentToast("Une erreur est survenue","danger");
   })
 } 
}
