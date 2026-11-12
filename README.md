# Movies

## Description
Movies is a Single Page Application (SPA) built with Angular that allows users to discover movies, explore detailed information, manage favorites and create personal rankings.

- Motivation: generate gallery of movies
- Problem solve:
- Learn:

## Tech Stack
Angular 22
Node 
TypeScript
CSS
TMDB API
Firebase Authentication
Firebase Firestore
Git & GitHub

## Prerequisites
 You need to use the software and how to install them.
- Node.js 
- Angular CLI (`npm install -g @angular/cli`)


## Installation
1. Clone the repo and NPM packages
```bash
    git clone https://github.com/Rami-Ana/movies-app.git
    npm install
```


### Server
```bash
ng serve
```
Link: `http://localhost:4200/`


### Test

```bash
ng test
```

## Architecture
```
movies-app/
├── src/
│   ├── main.ts
│   ├── index.html
│   ├── styles.css
│   └── app/
│       ├── components/
│       │   ├── movie-gallery/     
│       │   ├── movie-card/     
│       │   └── movie-detail/   
│       ├── models/
│       │   ├── movie-model.ts    
│       │   ├── genre-model.ts
│       │   ├── person-model.ts         //actores y directores
│       │   ├── movie-detail-model.ts
│       │   ├── credits-model.ts
│       │   └── pagination-model.ts     //response
│       ├── core/
│       │   └── services.ts
│       │        └── movie-service.ts
│       ├── app.config.ts
│       ├── app.css
│       ├── app.html
│       ├── app.routes.ts
│       └── app.ts
├── public/
├── angular.json
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```


## Features
Movie discovery
Search and filters
Movie details
User authentication
Favorites management
Personal ratings


## Resources
### Trello
`https://trello.com/invite/b/6af30de853b6693640af46a2/ATTI15e91be085013f47b0cac244f7db2839B066BF35/s5-movies-ejercicio`

### Figma
`https://www.figma.com/design/qqZwQfMxe2m1kkyzvKAALs/PROJECT-|-Movies?node-id=0-1&t=hLicfTUv2X6pYFeK-1`

### GitHub
`https://github.com/Rami-Ana/movies-app.git`



