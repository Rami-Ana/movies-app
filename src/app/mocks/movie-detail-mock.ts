import { ModelMovieDetail } from '../models/movie-detail-model';

const data = {
    "adult": false,
    "backdrop_path": "/tlm8UkiQsitc8rSuIAscQDCnP8d.jpg",
    "belongs_to_collection": {
        "id": 2344,
        "name": "Matrix - Colección",
        "poster_path": "/roEEKejljtahGx75nYwSlYougS9.jpg",
        "backdrop_path": "/bRm2DEgUiYciDw3myHuYFInD7la.jpg"
    },
    "budget": 63000000,
    "genres": [
        {
            "id": 28,
            "name": "Acción"
        },
        {
            "id": 878,
            "name": "Ciencia ficción"
        }
    ],
    "homepage": "",
    "id": 603,
    "imdb_id": "tt0133093",
    "origin_country": [
        "US"
    ],
    "original_language": "en",
    "original_title": "The Matrix",
    "overview": "Thomas Anderson lleva una doble vida: por el día es programador en una importante empresa de software, y por la noche un hacker informático llamado Neo. Su vida no volverá a ser igual cuando unos misteriosos personajes le inviten a descubrir la respuesta a la pregunta que no le deja dormir: ¿qué es Matrix?",
    "popularity": 39.525,
    "poster_path": "/8rT9kG2EYkZpJmYCuTJNnPDEube.jpg",
    "production_companies": [
        {
            "id": 79,
            "logo_path": "/at4uYdwAAgNRKhZuuFX8ShKSybw.png",
            "name": "Village Roadshow Pictures",
            "origin_country": "US"
        },
        {
            "id": 372,
            "logo_path": null,
            "name": "Groucho II Film Partnership",
            "origin_country": ""
        },
        {
            "id": 1885,
            "logo_path": "/xlvoOZr4s1PygosrwZyolIFe5xs.png",
            "name": "Silver Pictures",
            "origin_country": "US"
        },
        {
            "id": 174,
            "logo_path": "/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png",
            "name": "Warner Bros. Pictures",
            "origin_country": "US"
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "1999-03-31",
    "revenue": 463517383,
    "runtime": 138,
    "softcore": false,
    "spoken_languages": [
        {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
        }
    ],
    "status": "Released",
    "tagline": "Bienvenido al mundo real.",
    "title": "Matrix",
    "video": false,
    "vote_average": 8.264,
    "vote_count": 29316
};

export const movieDetailMock: ModelMovieDetail = data;