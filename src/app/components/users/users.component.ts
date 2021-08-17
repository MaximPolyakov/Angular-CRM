import { AfterViewInit,
         Component,
         ElementRef,
         OnInit,
         ViewChild,
         ChangeDetectionStrategy,
         ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { debounceTime, map, tap } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, AfterViewInit {

  _users: any
  users: any
  sortDirection = 1
  sortName: string
  @ViewChild('search', {static: true}) search: ElementRef

  constructor(private httpService: HttpService,
              private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.httpService.getUsers()
      .subscribe(data => {
        setTimeout(() => {
          this.users = data;
          this._users = this.users;
          this.ref.detectChanges()
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
      this.ref.detectChanges()
    })

  }

  sortBy(param: string, field: string): void {
    this.sortDirection = this.sortName === field ? -this.sortDirection : 1;
    if (param === 'num') {
      this.users.sort((a, b) => (a[field] - b[field]) * this.sortDirection)
      this.sortName = field;
    }
    if (param === 'str') {
      this.users.sort((a, b) => (a[field].toLowerCase().localeCompare(b[field].toLowerCase())) * this.sortDirection)
      this.sortName = field;
    }
  }
}
