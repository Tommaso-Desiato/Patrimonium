import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'user-posts/:id', 
   loadComponent: ()=> import('./components/user-posts/user-posts.component').then(c => c.UserPostsComponent)}
];
