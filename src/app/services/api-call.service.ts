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

  //Get users list
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  //Create user with post request and bearer token
  createUser(newUser: User): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/users`, newUser, { headers });
  }

  //Delete user by userId and delete request w/bearer token
  deleteUser(userId: string):Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers });
  }

  //Get list of user posts by user Id
  getUserPosts(userId: string):Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/users/${userId}/posts`);
  }

  //Get comments by post Id 
  getComments(postId: string):Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }

  //Get user list by name
  searchByName(userName: string):Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users?name=${userName}`);
  }

  addComment(commentData : { body: string, post_id: string, name: string, email: string}):Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/posts/${commentData.post_id}/comments`, commentData, { headers });
  }
}
