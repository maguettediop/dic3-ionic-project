import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PlatService } from './../../service/plat.service';
import { Plat } from 'src/app/Models/plat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

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

}
