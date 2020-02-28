import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Restaurant } from '../Models/restaurant';
import { Observable, from } from 'rxjs';
import {URL} from '../../environments/environment';
import { identifierModuleUrl } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  getRestaurants( ): Observable<Restaurant[]>{
    return this.http.get<Restaurant []>(URL+'/restaurants').pipe();

  }

  getRestaurant( id : Number) : Observable<Restaurant>
  {
    return this.http.get<Restaurant>(URL+'/Restaurants/'+id).pipe();
  }

  postRestaurant( restaurant : Restaurant) : Observable<Restaurant>
  {
    return this.http.post<Restaurant>(URL+'/restaurants',restaurant).pipe();
  }

  deleteRestaurant(id: Number) : Observable<Restaurant>
  {
    return this.http.delete<Restaurant>(URL+'/restaurants/'+id).pipe();
  }
  updateRestaurant( restaurant: Restaurant)
  {
    return this.http.put<Restaurant>(URL+'/restaurants/'+restaurant.id,restaurant).pipe();
  }
}
