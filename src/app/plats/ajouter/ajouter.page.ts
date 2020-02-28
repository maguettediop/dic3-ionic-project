import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PlatService } from './../../service/plat.service';
import { Component, OnInit } from '@angular/core';
import { Plat } from 'src/app/Models/plat';


@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.page.html',
  styleUrls: ['./ajouter.page.scss'],
})
export class AjouterPage implements OnInit {
   plat : Plat;
  constructor(private service : PlatService,private toast : ToastController,private route: Router) {
    this.plat = new Plat();
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

 ajouterPlat(): void{
     console.log(this.plat);
     this.service.postPlat(this.plat).subscribe(plat => {
     this.presentToast("Plat ajoute avec succes", "Success");
     this.route.navigateByUrl('/tabs/plats');
     },error => {
     this.presentToast("Une erreur est survenue","danger");
   })
 } 

}
