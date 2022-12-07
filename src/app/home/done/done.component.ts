import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {

  constructor() { }
  hideCelebrate() {
    let taskDone:any = document.getElementById('taskDone')
    taskDone.classList.replace('d-flex','d-none')
  }
  ngOnInit(): void {
  }

}
