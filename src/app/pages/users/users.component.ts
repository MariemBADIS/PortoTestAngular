import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../../models/user.model'  ;
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  userId = 1;

  usersList: any[] = [];

  constructor(
    private userService: UserService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['userId'];
    });
    this.userService.getUsers().subscribe((users: any) => {
      this.usersList = users.data;
    });
  }

  goToProfile(userId: number) {
    this.userService.getUserFromId(userId).subscribe((user: any) => {
      this.userId = user.data.id;
    });

    const url = '/profile/' + this.userId;
    this.router.navigate(['/profile', userId]);
  }
}
