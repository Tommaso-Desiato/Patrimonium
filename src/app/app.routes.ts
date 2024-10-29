import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  //Components with lazy loading
  {path: 'user-posts/:id', 
    loadComponent: ()=> import('./components/user-posts/user-posts.component').then(c => c.UserPostsComponent)
  },
  {path: 'user-creation', 
    loadComponent: ()=> import('./components/user-creation/user-creation.component').then(c => c.UserCreationComponent)
  },
  {path: 'posts-feed', 
    loadComponent: ()=> import('./components/posts-feed/posts-feed.component').then(c => c.PostsFeedComponent)
  },
  {path: 'post-creation',
    loadComponent: ()=> import('./components/post-creation/post-creation.component').then(c => c.PostCreationComponent)
  }
];