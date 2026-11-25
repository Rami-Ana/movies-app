import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tmdbImage',
})
export class TmdbImagePipe implements PipeTransform {
  transform(path: string | null | undefined, size = 'w500'): string {
    if (!path) {
      return '/assets/no-poster.png'; // cambia por tu ruta real o imagen por defecto
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `https://image.tmdb.org/t/p/${size}${normalizedPath}`;
  }
}