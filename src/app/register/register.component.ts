import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent implements OnInit {
  constructor(private _AuthService:AuthService,private _Router:Router) { }

  registerForm:FormGroup = new FormGroup({
    first_name:new FormControl('', [ Validators.required ,Validators.maxLength(10), Validators.minLength(3)]),
    last_name:new FormControl('', [Validators.required ,Validators.maxLength(10), Validators.minLength(3)]),
    email:new FormControl('', [Validators.required , Validators.email]),
    password:new FormControl('', [Validators.required ,Validators.pattern('^[A-Z][a-z]{3,8}')]),
    age:new FormControl('', [Validators.required ,Validators.max(36), Validators.min(16)]),
  })

errorMsg:string = ''
isLoading:boolean=false
  submitRegister(){
    this.isLoading = true
    this._AuthService.register(this.registerForm.value).subscribe({
      next:(res)=> {
        if(res.message == 'success'){
          this.isLoading = false
          this._Router.navigate(['/login'])
        } else {
          this.isLoading = false
          this.errorMsg = res.errors.email.message
        }
      }
    })
  }

  
  ngOnInit(): void {
    
    
  }


}
