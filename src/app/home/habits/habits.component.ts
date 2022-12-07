import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss']
})
export class HabitsComponent implements OnInit {
  habits:any[] = []
  habitCheck: any[] = []
  habitsCounter:number = 0
  constructor() { }
      
  addHabit() {
    let inputHabit = document.getElementById('inputHabit') as HTMLInputElement

    if (inputHabit.value != ''){
    this.habits.push(inputHabit.value)
    }
    localStorage.setItem('habits', JSON.stringify(this.habits))

    inputHabit.value = ''
  }

  deleteHabit(i:any){
    this.habits.splice(i,1)
    localStorage.setItem('habits', JSON.stringify(this.habits))
  }

  reChecked(){
    let habitCheck = document.getElementsByClassName('habitCheck') as HTMLCollectionOf<HTMLInputElement>

    for(let x=0; x < this.habits.length; x++){
      if ( $('.habitCheck').prop("checked",true)){
        $('.habitCheck').prop("checked",false)

      }
    }
    
    this.habitsCounter++

    localStorage.setItem('habitsCounter', JSON.stringify(this.habitsCounter))

    if (this.habitsCounter >= 30) {
      this.habitsCounter = 0


      let taskDone = document.getElementById('taskDone')
          const diplayCelebrate = setTimeout(() => {
            taskDone?.classList.replace('d-none','d-flex')
          }, 0);
        
      }
    

    localStorage.setItem('habitsCounter', JSON.stringify(this.habitsCounter))

  }
  ngOnInit(): void {
    if (localStorage.getItem('habitsCounter') != null) {
      this.habitsCounter = JSON.parse(localStorage.getItem('habitsCounter') || '')
    }
    if (localStorage.getItem('habits') != null) {
      this.habits = JSON.parse(localStorage?.getItem('habits') || '')
  } 
  }

}
