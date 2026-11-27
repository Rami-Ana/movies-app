import { shouldDelete } from './should-delete';

function buildEntry(overrides = {}) {
  return {
    movieId: 1,
    title: 'Película de prueba',
    poster_path: null,
    release_date: '2020-01-01',
    genre_ids: [],
    isFavorite: false,
    rating: null,
    addedAt: 0,
    ...overrides,
  };
}

describe('shouldDelete', () => {

  it('devuelve true si no es favorita y no tiene puntuación, se puede borrar los datos de firebase', () => {
    const entry = buildEntry();

    expect(shouldDelete(entry)).toBe(true);
  });


  it('devuelve false si no es favorita pero tiene puntuación, no se borra de firebase', () => {
    const entry = buildEntry({ rating: 8 });

    expect(shouldDelete(entry)).toBe(false);
  });


  it('devuelve false si es favorita y tiene puntuación, no se borra de firebase', () => {
    const entry = buildEntry({ isFavorite: true, rating: 8 });

    expect(shouldDelete(entry)).toBe(false);
  });


it('devuelve false si es favorita y no tiene puntuación', () => {
  const entry = buildEntry({ isFavorite: true });

  expect(shouldDelete(entry)).toBe(false);
});

});
