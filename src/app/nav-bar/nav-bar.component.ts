import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private _AuthService:AuthService) { }

  deleteData(){
    this._AuthService.deleteUserDate()
  }

userInfo:any = {}
  isLogin: boolean = false
  
  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next:(res)=> {        
        if(res) {
          this.isLogin = true;
          this.userInfo = this._AuthService.userData.getValue()
        }else{
          this.isLogin = false;
        }
      }
    })
  }




}

