import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user-model';
import { AuthService } from './auth.service';
import { Post } from '../models/post-model';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  private apiUrl = 'https://gorest.co.in/public/v2';
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  createUser(newUser: User): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/users`, newUser, { headers });
  }

  deleteUser(userId: string):Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers });
  }

  getUserPosts(userId: string):Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/users/${userId}/posts`);
  }

  getComments(postId: string):Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }

  searchByName(userName: string):Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users?name=${userName}`);
  }
}
