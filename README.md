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


## Environment setup
The TMDB API key is not stored in the repository.
1. Copy `src/environments/environment.example.ts` to `src/environments/environment.ts` and `src/environments/environment.development.ts`.
2. Replace `YOUR_API_KEY_HERE` with your own TMDB API key.

## Git Workflow


## Git Workflow
### Branches
```
main
└── develop
    ├── feature/setup
    ├── feature/welcome
    ├── feature/home-explore-link
    ├── feature/hu-1-2-movies-list
    ├── feature/hu-1-3-search
    ├── feature/hu-1-4-filters
    ├── feature/search-filter-integration
    ├── fix/search-filters-integration
    ├── refactor/movie-gallery-state
    ├── feature/hu-1-6-api-connexion
    ├── feature/hu-2-1-detail-routes
    ├── 
    ├── 
    ├── 
    ├── feature/hu-3-1-register
    ├── feature/hu-3-2-login-logout
    ├──
    ├──
    ├──
    └── 

```

## Architecture
```
src/app/
│
├── core/ 
│   ├── data/
│   │     └── auth-errors.json
│   │ 
│   ├── services/
│   │     ├── auth-service.ts  
│   │     ├── genre-service.ts  
│   │     └── movie-service.ts  
│   │ 
│   ├── (NOT YET) guards/
│   ├── (NOT YET) interceptors/
│   └── (NOT YET) constants/
│
├── shared/  
│   ├── components/
│   │      ├── header-component/
│   │      └── footer-component/
│   ├── pipes/
│   │      └── tmdb-image-pipe.ts
│   ├── (NOT YET) directives/
│   └── (NOT YET) ui/
│
├── models/
│   ├── pagination-model.ts
│   ├── genre-model.ts
│   ├── movie-model.ts
│   ├── sort-order-model.ts
│   ├── (NOT YET) movie-detail-model.ts 
│   ├── (NOT YET) person-model.ts
│   └── (NOT YET) credits-model.ts
│
├── features/  → una carpeta por funcionalidad; las páginas van sueltas dentro de su feature
│   │
│   ├── auth/
│   │     └── components
│   │           ├── register/
│   │           ├── login/
│   │           ├── (NOT YET) pages/
│   │           └── models/
│   │                  └── auth-model.ts/
│   │
│   ├── home/ 
│   │      └── home-page
│   │
│   ├── movies/
│   │      ├── movies-page
│   │      ├── movie-detail-page
│   │      └── components/
│   │           ├── movie-card
│   │           ├── movie-gallery
│   │           ├── movie-filters
│   │           └── search-bar
│   │
│   ├── people/ 
│   │     └── person-detail-page
│   │
│   ├── features/            → una carpeta por funcionalidad; las páginas van dentro de su feature
│   │   ├── home/
│   │   │     └── home-page
│   │   │
│   │   ├── movies/
│   │   │   ├── movies-page
│   │   │   ├── movie-detail-page
│   │   │   └── components/
│   │   │        ├── movie-card
│   │   │        ├── movie-gallery
│   │   │        ├── movie-filters
│   │   │        └── search-bar
│   │   │
│   │   ├── people/            → actor y director
│   │   │     └── person-detail-page
│   │   │
│   │   ├── not-found/
│   │   │     └── not-found-page
│   │   │
│   │   ├── favorites/
│   │   │     ├── pages/
│   │   │     ├── components/
│   │   │     └── models/            (favorito + puntuación)
│   │   │           └── fav-model.ts
│   │   │
│   │   ├── profile/
│   │   │
│   │   ├── auth/
│   │   │     ├── pages/
│   │   │     ├── components/
│   │   │     └── models/            (modelos exclusivos de auth)
│   │   │           └── auth-model.ts
│   │   │
│   │   └── stats/
│   │
│   ├── favorites/
│   │     ├── pages/
│   │     ├── components/
│   │     └── models/             
│   │           └── fav-model.ts
│   │
│   ├── profile/
│   └── (NOT YET)stats/
│
├── mocks/ (borrable??)
│   ├── genre-mock.ts
│   ├── movie-detail-mock.ts
│   └── movies-mock.ts
│
└── environments/  
    ├── environment.ts              (No disponible en GitHub)
    ├── environment.development.ts  (No disponible en GitHub)
    └── environment.example.ts      
```

## Features
- Movie discovery
- Search and filters
- Movie, credits and person details
- User authentication
- Favorites management
- Personal ratings
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



