import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from './services/http.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    console.log("Task 01 done");
  }
}



