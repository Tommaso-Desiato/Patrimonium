import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, MatButtonModule, RouterLink, MatTabsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private authService: AuthService){}

  isAuthenticated: boolean = false;
  links = ['Home', 'Feed', 'Logout'];
  activeLink = this.links[0];

  ngOnInit(): void {
    this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
    });
  }

  logout() {
    this.authService.removeToken();
  }
}
