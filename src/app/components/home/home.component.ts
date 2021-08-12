import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  catGarfield = new Observable(observer => {
    observer.next(2)
    setTimeout(() => {
      observer.next(1);
      observer.complete();
    }, 4000)
  })
  constructor() {}

  ngOnInit(): void {
    this.catGarfield
      .pipe(
        map(elem => `Result: ${elem}`)
      )
      .subscribe(console.log)
  }

}
