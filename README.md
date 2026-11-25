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
```text
main
└── develop
    ├── feature/hu-1-2-movies-list
    ├── feature/hu-1-3-search
    ├── feature/hu-1-4-filters
    ├── feature/hu-1-5-pagination
    ├── feature/hu-1-6-api-connexion
    ├── feature/hu-2-1-detail-routes
    ├── feature/hu-2-2-detail-service
    ├── feature/hu-2-3-movie-detail
    ├── feature/hu-2-4-person-detail
    ├── feature/hu-2-5-detail-navigation
    ├── feature/hu-3-1-register
    ├── feature/hu-3-2-login-logout
    ├── feature/hu-3-3-guards
    ├── feature/hu-3-4-profile
    ├── feature/hu-4-1-user-movies-persistence
    ├── feature/hu-4-2-favorite-button
    ├── feature/hu-4-3-rating
    ├── feat/user-favorites-service
    ├── refactor/movie-gallery-state
    └── fix/movie-images-and-pagination
```

## Architecture
```text
public/
src/
├── app/
│   ├── core/
│   │   ├── data/
│   │   │     └── auth-errors.json
│   │   ├── guards/
│   │   │     ├── auth-guard.ts
│   │   │     └── guest-guard.ts
│   │   ├── services/
│   │   │     ├── auth-service.ts
│   │   │     ├── genre-service.ts
│   │   │     ├── movie-service.ts
│   │   │     ├── user-favorites-service.ts
│   │   │     └── user-movies-service.ts
│   │   └── utils/
│   │
│   ├── features/
│   │   ├── auth/
│   │   │     └── components/
│   │   │           ├── login/
│   │   │           └── register/
│   │   ├── favorites/
│   │   │     └── favorites-page.*
│   │   ├── home/
│   │   │     └── home-page.*
│   │   ├── movies/
│   │   │     ├── components/
│   │   │     │     ├── actor-card/
│   │   │     │     ├── movie-card/
│   │   │     │     ├── movie-filters/
│   │   │     │     ├── movie-gallery/
│   │   │     │     └── search-bar/
│   │   │     ├── movie-detail-page/
│   │   │     └── movies-page.*
│   │   ├── not-found/
│   │   │     └── not-found-page.*
│   │   ├── people/
│   │   │     └── person-detail-page.*
│   │   └── profile/
│   │         └── profile-page.*
│   │
│   ├── mocks/
│   │   ├── credits-mock.ts
│   │   ├── genre-mock.ts
│   │   ├── movie-detail-mock.ts
│   │   ├── movies-mock.ts
│   │   └── person-detail-mock.ts
│   │
│   ├── models/
│   │   ├── credits-model.ts
│   │   ├── genre-model.ts
│   │   ├── movie-detail-model.ts
│   │   ├── movie-model.ts
│   │   ├── pagination-model.ts
│   │   ├── person-model.ts
│   │   ├── sort-order-model.ts
│   │   └── user-movie-entry.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │     ├── favorite-button/
│   │   │     ├── footer-component/
│   │   │     └── header-component/
│   │   └── pipes/
│   │         └── tmdb-image-pipe.ts
│   │
│   ├── app.config.ts
│   ├── app.css
│   ├── app.html
│   ├── app.routes.ts
│   ├── app.spec.ts
│   └── app.ts
│
└── environments/
      ├── environment.ts              # No disponible en GitHub (ignorado en .gitignore)
      ├── environment.development.ts  # No disponible en GitHub (ignorado en .gitignore)
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



