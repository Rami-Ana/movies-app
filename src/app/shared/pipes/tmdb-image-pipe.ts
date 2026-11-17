import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tmdbImage',
})
export class TmdbImagePipe implements PipeTransform {

  transform(path: string | null, size = 'w500'): string  {

    return path ? `https://image.tmdb.org/t/p/${size}${path}` : '';
  }
}
