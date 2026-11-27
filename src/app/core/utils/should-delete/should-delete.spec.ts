import { shouldDelete } from './should-delete';

describe('shouldDelete', () => {
  it('devuelve true si no es favorita y no tiene puntuación', () => {
    const entry = {
      movieId: 1,
      title: 'Película de prueba',
      poster_path: null,
      release_date: '2020-01-01',
      genre_ids: [],
      isFavorite: false,
      rating: null,
      addedAt: 0,
    };

    expect(shouldDelete(entry)).toBe(true);
  });
});