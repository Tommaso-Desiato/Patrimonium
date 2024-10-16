import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  private apiUrl = 'https://gorest.co.in/public/v2/users';
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(newUser: User): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}`, newUser, { headers });
  }

  getUserPosts(userId: string):Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/posts`);
  }
}
