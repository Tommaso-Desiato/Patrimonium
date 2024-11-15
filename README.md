# Patrimonium

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Description
Patrimonium is a web application built with Angular that allows users to view, add, edit, and delete posts and users. The application is designed to promote the protection of cultural and natural heritage while improving social and environmental ties. It uses a Bearer token authentication system to access GoRest's REST APIs.

## Features
Login: The login page accepts only a token that must be obtained by visiting GoRest Login. Once acquired, the token is used to authenticate API requests.

Main Page – Users List: Displays a list of users with basic information. Users can be added or removed. Additionally, search and pagination features are available.

User Details Page: Displays detailed information for a single user, their posts, and comments related to each post. Users can also add comments.

Posts List: Displays all posts with the ability to add new posts, search posts by title or body, and view comments for each post.

Tests and Code Quality: The project includes unit tests with a coverage of at least 60%.

Logout: Includes a logout feature that removes the token and disconnects the user.

Lazy Loading and Multi-modules: The application is structured into multiple modules with lazy loading for better performance and code management.

## Technologies and External Libraries Used

    Angular (v18): Framework used to build the web application.
    Angular Material: UI component library for Angular.
    Tailwind CSS: A mobile-first and customizable design framework.
    HttpClient: For making API calls with Bearer Token authentication.
    Karma/Jasmine: Used for unit testing the application.

# Installation
## Prerequisites

  Node.js (v18 or higher) must be installed on your system.
  Angular CLI: Install it globally using the following command:

    npm install -g @angular/cli

## Steps to Set Up Locally

   Clone the repository:
   
    git clone https://github.com/Tommaso-Desiato/Patrimonium.git
    cd Patrimonium


 Install dependencies:

    npm install



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## API URLs

The application communicates with GoRest's API, which is a public REST API for managing users, posts, and comments.

  Login Endpoint: 
  
    https://gorest.co.in/consumer/login
        
  Users API:
    
    https://gorest.co.in/public-api/users
    
  Posts API:
  
    https://gorest.co.in/public-api/posts
    
  Comments API:
    
    https://gorest.co.in/public-api/comments



## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).



## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
