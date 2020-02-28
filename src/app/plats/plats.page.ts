import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plat } from '../Models/plat';
import {PlatService} from '../service/plat.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'plats.page.html',
  styleUrls: ['plats.page.scss']
})
export class Tab2Page {
 
  plats : Plat [];
  constructor(private route : Router, private service: PlatService, private toast : ToastController) {
    this.getPlats();

  }

  async presentToast(message: string,  color: string) {
    const toast = await this.toast.create({
      message: message,
      position: 'top',
      color: color,
      duration: 2000
    });
    toast.present();
  }

  getPlats():void 
  {
    this.service.getPlats().subscribe(plats =>{
        this.plats = plats;
    }, 
    error=>
    { 
      this.presentToast('Erreur survenue','danger');


    });
  }
  modifierPlat (id:any):void
  {
    this.route.navigate(['tabs/plats/modifier',id]);
  }
  deletePlat(id: number):void
  {
    this.service.deletePlat(id).subscribe(plat=>{
      this.presentToast('Supprimé avec succès','success');
      this.getPlats();
    });
  }


  detailsPlat(id:any):void{
    this.route.navigate(['tabs/plats/details',id]);

  }
  }
