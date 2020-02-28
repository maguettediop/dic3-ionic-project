import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../Models/restaurant';
import {RestaurantsService} from '../service/restaurants.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage implements OnInit {

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
}
