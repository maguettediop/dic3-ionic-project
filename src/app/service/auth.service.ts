import { Injectable } from '@angular/core';
import { User } from '../Models/user'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import {URL} from '../../environments/environment'; 
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

   redirectUrl :string= "/tabs/menu";
   isAuth = new BehaviorSubject(false);
   constructor(private http: HttpClient) { } 
 
   login(user : User): Observable<any>   {    
   		return this.http.post(URL+'/auth/local',user).pipe();  
    } 
 
   register(user: User)   {     
  	return this.http.post(URL+'/auth/local/register',user).pipe();   
  } 
   isAuthenticated() {
    return this.isAuth.value;
  }

}
