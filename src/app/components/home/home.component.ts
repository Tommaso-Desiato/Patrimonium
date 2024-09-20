import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { User } from '../../models/user-model';
import { response } from 'express';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  users: User[] = [];
  customUser:User = {
    name: 'Gogo McVoid',
    email: 'gogo@mcvoid.com',
    gender: 'male',
    status: 'active'
  }

  constructor(private apiCall: ApiCallService) {}

  ngOnInit(): void {
   this.apiCall.createUser(this.customUser).subscribe(data =>{
      console.log(data);
    }); 

    this.apiCall.getUsers().subscribe(res => {
      this.users = res;
    }); 
    
  }
}
