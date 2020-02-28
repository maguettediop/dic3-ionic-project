import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RestaurantsService } from './../../service/restaurants.service';
import { PlatService } from './../../service/plat.service';
import { Restaurant } from 'src/app/Models/restaurant';
import { Plat } from 'src/app/Models/plat';
@Component({
  selector: 'app-ajouter-restaurant',
  templateUrl: './ajouter-restaurant.page.html',
  styleUrls: ['./ajouter-restaurant.page.scss'],
})
export class AjouterRestaurantPage implements OnInit {

	restaurant : Restaurant;
	plats: Plat [];
  constructor(private service : RestaurantsService,private servicePlat : PlatService,private toast : ToastController,private route: Router) {
    this.restaurant = new Restaurant();
    this.servicePlat.getPlats().subscribe(plats =>{
        this.plats = plats;
    }, 
    error=>
    { 
      this.presentToast('Erreur survenue','danger');

    });
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

 ajouterRestaurant(): void{
     console.log(this.restaurant);
     this.service.postRestaurant(this.restaurant).subscribe(restaurant => {
     this.presentToast("Restaurant ajoute avec succes", "Success");
     this.route.navigateByUrl('/tabs/restaurants');
     },error => {
     this.presentToast("Une erreur est survenue","danger");
   })
 } 

}
