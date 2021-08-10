import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: any

  constructor(private route: ActivatedRoute, 
              private httpService: HttpService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.httpService.getUsers()
      .subscribe(users => {
        this.user = users.find(e => e.id == data.id)
        console.log(this.user)
      });
    })
  }

}
