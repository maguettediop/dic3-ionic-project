import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RestaurantsService } from './../../service/restaurants.service';
import { PlatService } from './../../service/plat.service';
import { Restaurant } from 'src/app/Models/restaurant';
import { Plat} from 'src/app/Models/plat';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-restaurant',
  templateUrl: './modifier-restaurant.page.html',
  styleUrls: ['./modifier-restaurant.page.scss'],
})
export class ModifierRestaurantPage implements OnInit {

  restaurantId : number;
  restaurant: Restaurant;
  plats: Plat[];
  constructor(private route : ActivatedRoute, private service : RestaurantsService, private servicePlat : PlatService, private toast : ToastController,
    private router: Router)
  { 
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id')); 
    this.restaurant= new Restaurant();
    this.getPlats();
    this.getRestaurant();
    console.log("Id="+this.restaurantId);
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
 getRestaurant():void 
  {
    this.service.getRestaurant(this.restaurantId).subscribe(restaurant =>{
        this.restaurant = restaurant;
    }, 
    error=>
    { 
      this.presentToast('Erreur survenue','danger');

    });
  }
getPlats(): void{
	this.servicePlat.getPlats().subscribe(plats =>{
        this.plats = plats;
    }, 
    error=>
    { 
      this.presentToast('Erreur survenue','danger');

    });
     }

modifierRestaurant(): void{
      
     console.log(this.restaurant);
     this.service.updateRestaurant(this.restaurant).subscribe(restaurant => {
     this.presentToast("Restaurant modifié avec succes", "Success");
     this.router.navigateByUrl('/tabs/restaurants');
     },error => {
     this.presentToast("Une erreur est survenue","danger");
   })
 } 

}
