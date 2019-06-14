import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserInterface } from '../../../../interfaces';
import { ApiService } from '../../../core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns = ['first_name', 'last_name', 'email'];
  userList: any[] = [];
  pagesCount: number;
  total_pages;
   per_page;
  page;
  skip;
  limit;


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  // this.activatedRoute.queryParams.subscribe(params => {
  //     if(!params.page){
  //       this.skip = 0;
  //     }else{
  //       this.page = +params.page;
  //       this.skip = this.page == 1 ? 0 : this.page * this.per_page - 1;
  //     }
  //     this.limit = this.skip + 3;
    
  //     console.log(params)
  //     console.log(this.skip)
  //     console.log(this.limit)
  // });

  this.fetchUsers()
  this.getPaginationInfo();

  }

  fetchUsers(){
    this.activatedRoute.data.pipe(
      map(data => data.users)
    )
      .subscribe((users: UserInterface[]) => {
        this.userList = users;
        // this.userList = users.slice(this.skip,this.limit);
        console.log(this.userList);
      });

  }

  getPaginationInfo(){
    this.activatedRoute.data.pipe(
      map(data => data.paginationInfo)
    )
      .subscribe(paginationInfo => {
        this.pagesCount = paginationInfo.total;
        this.total_pages= paginationInfo;
        this.per_page =paginationInfo.per_page;
        this.page =paginationInfo.page;
      })
  }

  pageChanged(event: PageEvent): void {
    let page: number = event.pageIndex + 1;
    this.router.navigate(['./'], { queryParams: { page } });
  }

  userSelected(user: UserInterface): void {
    this.router.navigate(['./user', user.id]);
  }

}
