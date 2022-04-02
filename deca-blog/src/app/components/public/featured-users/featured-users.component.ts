import { Component, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/_models/requestParams';
import { UserModel } from 'src/app/_models/userModel';
import { UserService } from 'src/app/_services/_user_service/user.service';

@Component({
  selector: 'app-featured-users',
  templateUrl: './featured-users.component.html',
  styleUrls: ['./featured-users.component.css']
})
export class FeaturedUsersComponent implements OnInit {
  featuredUsersArray : any  [] = [];
  requestParams: RequestParams = {PerPage:11, PageNumber:1};
  loading: boolean;
  constructor( private userService : UserService ) { }

  ngOnInit(): void {
    this.loading = true;
      this.userService.getUsers(this.requestParams).subscribe(
        (response:any)=>{
        this.featuredUsersArray = response.Data.Data;
        this.loading = false;
     },
     (error) => {
       this.loading = false;
     })
  }

}
