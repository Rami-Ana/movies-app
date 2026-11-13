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


## Git Workflow
### Branches
```
main
└── develop
    ├── feature/hu-1-1-welcome
    ├── feature/hu-1-2-movies-list
    ├── feature/hu-1-3-search
    ├── feature/hu-1-4-filters
    └── feature/hu-1-5-pagination
```


## Architecture
```
src/app/
│
├── core/ → cosas que existen una sola vez (singleton)
│   ├── services/
│   │     └── movie-service.ts  (habla con TMDB)
│   │ 
│   ├── guards/
│   ├── interceptors/
│   └── constants/
│
├── shared/  → solo lo que usan 2+ 
│   ├── components/
│   │      ├── header/
│   │      └── footer/
│   │ 
│   ├── pipes/
│   ├── directives/
│   └── ui/
│   
├── models/ → Interfaces globales
│   ├── movie-model.ts
│   ├── movie-detail-model.ts //merece la pena??
│   ├── genre-model.ts
│   ├── person-model.ts
│   ├── credits-model.ts
│   └── pagination-model.ts
│   
├── features/
│   │
│   ├── home/
│   │     └── home-page
│   │          
│   │
│   ├── movies/
│   │   ├── pages/
│   │   │   ├── movies-page
│   │   │   └── movie-detail-page
│   │   │    
│   │   └── components/
│   │        ├── movie-card
│   │        ├── movie-gallery
│   │        └── search-bar // Posibilidad de ponerlo en Shared
│   │
│   ├── favorites/
│   │     ├── pages/
│   │     ├── components/
│   │     └── models/               (favorito + puntuación)
│   │           └── fav-model.ts
│   │
│   ├── profile/
│   │       
│   ├── people/  →  actor y director
│   │     ├── pages/
│   │     └── components/
│   │       
|   ├── auth/
│   │     ├── pages/
│   │     ├── components/
│   │     └── models/               (modelos exclusivos de auth)
│   │          └── auth-model.ts
│   │
│   └── stats/
│
└── mocks/   → datos de prueba (temporal)
```




## Features
Movie discovery
Search and filters
Movie details
User authentication
Favorites management
Personal ratings


### Test

```bash
ng test
```

## Resources
### Trello
`https://trello.com/invite/b/6af30de853b6693640af46a2/ATTI15e91be085013f47b0cac244f7db2839B066BF35/s5-movies-ejercicio`

### Figma
`https://www.figma.com/design/qqZwQfMxe2m1kkyzvKAALs/PROJECT-|-Movies?node-id=0-1&t=hLicfTUv2X6pYFeK-1`

### GitHub
`https://github.com/Rami-Ana/movies-app.git`



