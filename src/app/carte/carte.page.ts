import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';
import {ActivatedRoute} from '@angular/router';
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router'
import { RestaurantsService } from '../service/restaurants.service';

import { Restaurant } from 'src/app/Models/restaurant';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage implements OnInit {

   restaurantId : number;
   restaurant: Restaurant;


  constructor(private route : ActivatedRoute,private service:RestaurantsService, private toast : ToastController, private router: Router)
   {
   	   this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
   	    this.restaurant= new Restaurant();
    	this.getRestaurant();

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
}
