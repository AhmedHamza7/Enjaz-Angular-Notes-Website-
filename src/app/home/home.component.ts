import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {container} from '../goals'
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  constructor() { }
  goal = document.getElementById('goal') as HTMLInputElement
  fromDate = document.getElementById('fromDate') as HTMLInputElement
  toDate = document.getElementById('toDate') as HTMLInputElement

  allGoals:container[] = []
  colorInput:any 

  goalDetails = new FormGroup({
    goalName: new FormControl('', [Validators.required]),
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    
  })


  target(e:any){
    let color1:any = e.target
    color1.classList.add('active')
        $(color1).siblings().removeClass('active')
    let myDivObjBgColor = window.getComputedStyle(color1, null).backgroundColor;
    this.colorInput = myDivObjBgColor
  }
   
addGoal(){

  let goal = document.getElementById('goal') as HTMLInputElement
  let fromDate = document.getElementById('fromDate') as HTMLInputElement
  let toDate = document.getElementById('toDate') as HTMLInputElement
  
  let goalValue = goal.value
  let fromDateValue = fromDate.value
  let toDateValue = toDate.value
  let colorValue = this.colorInput

  this.allGoals.push({
    goal: goalValue,
    fromDate: fromDateValue,
    toDate:toDateValue,
    color:colorValue
  })


  localStorage.setItem('goals',JSON.stringify(this.allGoals) )
  this.hide()

  this.resetAll()
}


  deleteItem(indexItem:any) {
    this.allGoals.splice(indexItem, 1)
    localStorage.setItem('goals',JSON.stringify(this.allGoals) )
  }

  display() {
    let addGoal:any = document.getElementsByClassName('addGoal')[0]
    addGoal.classList.replace('d-none','d-flex')
  }
  hide(){
    let addGoal:any = document.getElementsByClassName('addGoal')[0]
    addGoal.classList.replace('d-flex','d-none')
  }

  



  ngOnInit(): void {
    if(localStorage.getItem('goals') != null) {
      this.allGoals = JSON.parse(localStorage?.getItem('goals') || '')
    } else {
      this.allGoals = []
    }
  }
  resetAll() {
    this.goal.value = ''
    this.fromDate.value = ''
    this.toDate.value = ''
  }
}
