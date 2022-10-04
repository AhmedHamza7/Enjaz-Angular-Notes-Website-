import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router) { }

  loginForm:FormGroup = new FormGroup({
    email:new FormControl('', [Validators.required , Validators.email]),
    password:new FormControl('', [Validators.required ,Validators.pattern('^[A-Z][a-z]{3,8}')])
  })


  errorMsg:string = ''
  isLoading:boolean=false


  submitLogin(){
    this.isLoading = true
    this._AuthService.Login(this.loginForm.value).subscribe({
      next:(res)=> {
        if(res.message == 'success') {
          localStorage.setItem('token', res.token)
          this._AuthService.saveUserData()
          this.isLoading = false
          this._Router.navigate(['/home'])
        } else {
          this.isLoading = false
          this.errorMsg = res.message
        }
      }
    })
  }



  ngOnInit(): void {
    
  }

}
