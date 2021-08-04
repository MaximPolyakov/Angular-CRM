import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from './http.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: any
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getUsers()
      .subscribe(data => {
        setTimeout(() => {
          this.data = data;
        }, 3000)
      });
  } 


  ngAfterViewInit(): void {
    
  }
}



