import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject(null)
  encoded:any
  decoded:any 
  constructor(private _httpClient:HttpClient, private _Router:Router) {
    if(localStorage.getItem('token')){
      this.saveUserData()
    } 
}

  deleteUserDate(){
    localStorage.removeItem('token')
    this.userData.next(null)
    this._Router.navigate(['login'])
  }
  saveUserData(){
      this.encoded = JSON.stringify(localStorage.getItem('token'))
      this.decoded = jwtDecode(this.encoded)
      this.userData.next(this.decoded)
  }
  register(registerForm:object):Observable<any>{
    return this._httpClient.post(`https://route-movies-api.vercel.app/signup`,registerForm)
  }

  Login(loginForm:object):Observable<any>{
    return this._httpClient.post(`https://route-movies-api.vercel.app/signin`,loginForm)
  }
  
}
