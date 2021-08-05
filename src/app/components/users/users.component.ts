import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { debounceTime, map, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  _users: any
  users: any
  @ViewChild('search', {static: true}) search

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getUsers()
      .subscribe(data => {
        setTimeout(() => {
          this.users = data;
          this._users = this.users;
        }, 1000)
      });
  }

  ngAfterViewInit(): void {
    const source = fromEvent(this.search.nativeElement, 'input')
    .pipe(
      map(el => {
        console.log(el)
        return el
      }),
      debounceTime(3000),
      tap(e => console.log(e))
    )
    .subscribe(data => {
      console.log(this.users)
      // this.users = data ? this._users.filter(e => e.name.includes(data)) : this._users
    })
    
  }
}
