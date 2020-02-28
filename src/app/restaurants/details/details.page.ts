import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RestaurantsService } from './../../service/restaurants.service';
import { Restaurant } from 'src/app/Models/restaurant';
import { GoogleMapsComponent } from './../../google-maps/google-maps.component';

import { Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  
  restaurantId : number;
  restaurant: Restaurant;
  constructor(private route : ActivatedRoute, private service : RestaurantsService, private toast : ToastController,
    private router: Router)
  { 
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id')); 
    this.restaurant= new Restaurant();
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

   afficherCarte(id:any):void
   {
    	this.router.navigate(['tabs/restaurants/carte',id]);

   } 

}
