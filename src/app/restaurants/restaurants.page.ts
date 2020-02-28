import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../Models/restaurant';
import {RestaurantsService} from '../service/restaurants.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  restaurants : Restaurant [];
  constructor(private route : Router, private service: RestaurantsService, private toast : ToastController) {
    this.getRestaurants();

  }

  ngOnInit() {
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

  getRestaurants():void 
  {
    this.service.getRestaurants().subscribe(restaurants =>{
        this.restaurants = restaurants;
    }, 
    error=>
    { 
      this.presentToast('Erreur survenue','danger');


    });
  }
  modifierRestaurant (id:any):void
  {
    this.route.navigate(['tabs/restaurants/modifier',id]);
  }
  deleteRestaurant(id: number):void
  {
    this.service.deleteRestaurant(id).subscribe(plat=>{
      this.presentToast('Supprimé avec succès','success');
      this.getRestaurants();
    });
  }

  detailsRestaurant(id:any):void{
  	this.route.navigate(['tabs/restaurants/details',id]);

  }
  

}
