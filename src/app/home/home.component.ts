import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {allGoals} from '../goals'
import {goalTasks} from '../goals'
// import {allTasks} from '../goals'
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  constructor() { }
  // goal = document.getElementById('goal') as HTMLInputElement
  fromDate = document.getElementById('fromDate') as HTMLInputElement
  toDate = document.getElementById('toDate') as HTMLInputElement

  allGoals:allGoals[] = []
  oncetasks:goalTasks[] = []
  onlyTasks:any[] = []
  everyTasksGoal: string[][] = []

  colorInput:any 


  goalDetails = new FormGroup({
    goalName: new FormControl('', [Validators.required]),
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    
  })

  taskDetails = new FormGroup({
    task: new FormControl("", [Validators.required]),
    goalsList: new FormControl("", [Validators.required]),

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
  let taskInput = document.getElementById("taskInput") as HTMLInputElement

  
  let goalValue = goal.value
  let fromDateValue = fromDate.value
  let toDateValue = toDate.value
  let colorValue = this.colorInput

  this.allGoals.push({
    goal: goalValue,
    fromDate: fromDateValue,
    toDate:toDateValue,
    color:colorValue,
    
  })

  this.oncetasks = JSON.parse(localStorage.getItem('goals') || '')

  localStorage.setItem('goals',JSON.stringify(this.allGoals) )
  this.hide()

}


addTask(i:any) {
  let taskInput = document.getElementsByClassName("taskInputinner") as HTMLCollectionOf<HTMLInputElement>
  this.oncetasks = JSON.parse(localStorage.getItem('goals') || '')
    console.log(this.everyTasksGoal[i]);
    
    if(taskInput[i].value != ''){
      this.everyTasksGoal[i].push(taskInput[i].value)
    }
    localStorage.setItem('goalTasks',JSON.stringify(this.everyTasksGoal))
  this.resetTasks(i)
  
}
resetTasks(i:any){
  let taskInput = document.getElementsByClassName("taskInputinner") as HTMLCollectionOf<HTMLInputElement>
  taskInput[i].value = ''

}

deleteItem(indexItem:any) {
    this.allGoals.splice(indexItem, 1)
    localStorage.setItem('goals',JSON.stringify(this.allGoals) )
  }
  
deleteGoalTask(i:any, e:any){
  console.log(this.everyTasksGoal);
  console.log(i);

  // this.everyTasksGoal[i].splice()

    this.everyTasksGoal[i].splice(e, 1)
    
    localStorage.setItem('goalTasks', JSON.stringify(this.everyTasksGoal))
  }
  display() {
    let addGoal:any = document.getElementsByClassName('addGoal')[0]
    addGoal.classList.replace('d-none','d-flex')
  }
  hide(){
    let addGoal:any = document.getElementsByClassName('addGoal')[0]
    addGoal.classList.replace('d-flex','d-none')
  }

  todayTasks: string[] = []
  todayAdd(e:any){
    let target = e.target
    let arrow = document.getElementsByClassName('arrow')
    let textTask = $(target).parent().prev().children().text()
    if(textTask != '') {
    this.todayTasks.push(textTask)

    }
    console.log(textTask);
  }


  selectedValue = null;
  ngOnInit(): void {
    
    if(localStorage.getItem('goals') != null) {
      this.allGoals = JSON.parse(localStorage?.getItem('goals') || '')
      for (let x=0; x < this.allGoals.length; x++) {

        
        this.everyTasksGoal[x] = new Array()
        console.log(this.everyTasksGoal);
        
        }
    } else {
      this.allGoals = []
    }

      if (localStorage.getItem('goalTasks') != null) {
        this.everyTasksGoal = JSON.parse(localStorage?.getItem('goalTasks') || '')

        console.log(this.everyTasksGoal);
        
    } 
    

  }
}
