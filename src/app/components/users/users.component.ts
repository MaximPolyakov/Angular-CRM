import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { debounceTime, map, tap } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  _users: any
  users: any
  sortDirection = 1
  sortName: string
  @ViewChild('search', {static: true}) search: ElementRef

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
    const source: Observable<any> = fromEvent(this.search.nativeElement, 'input');
    source.pipe(
      debounceTime(2000),
      map(e => e.target.value)
    )
    .subscribe(data => {
      this.users = data ? this._users.filter(e => e.name.toLowerCase().includes(data.toLowerCase())) : this._users
    })

  }

  sortBy(param: string, field: string): void {
    this.sortName === field  ? this.sortDirection = -this.sortDirection : this.sortDirection = this.sortDirection;
    if (param === 'num') {
      this.users.sort((a, b) => (a[field] - b[field]) * this.sortDirection)
      this._users.sort((a, b) => (a[field] - b[field]) * this.sortDirection)
      this.sortName = field;
    }
    if (param === 'str') {
      this.users.sort((a, b) => (a[field].toLowerCase().localeCompare(b[field].toLowerCase())) * this.sortDirection)
      this._users.sort((a, b) => (a[field].toLowerCase().localeCompare(b[field].toLowerCase())) * this.sortDirection)
      this.sortName = field;
    }
  }
}
