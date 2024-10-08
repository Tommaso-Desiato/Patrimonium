import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey ='';
  //Tracks authentication status
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());

  authStatus$ = this.authStatus.asObservable();

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authStatus.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.authStatus.next(false);
  }
  //Verify if user is authenticated 
  isAuthenticated(): boolean {
    return !!this.getToken(); //Double negation returns true if token exist
  }
}
