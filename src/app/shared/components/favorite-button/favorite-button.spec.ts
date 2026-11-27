import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { FavoriteButton } from './favorite-button';
import { ModelMovie } from '../../../models/movie-model';
import { UserMoviesService } from '../../../core/services/user-movies-service';
import { AuthService } from '../../../core/services/auth-service';

describe('FavoriteButton', () => {
    let fixture: ComponentFixture<FavoriteButton>;

    const movie = { id: 1, title: 'Película de prueba' } as ModelMovie;

    const userMoviesServiceMock = {
        isFavorite: vi.fn().mockReturnValue(false),
        save: vi.fn().mockResolvedValue(undefined),
    };
    const authServiceMock = { user: vi.fn().mockReturnValue({ uid: 'u1' }) };
    const routerMock = { navigate: vi.fn(), url: '/movies/1' };


    beforeEach(async () => {
        vi.clearAllMocks();

        userMoviesServiceMock.isFavorite.mockReturnValue(false);
        userMoviesServiceMock.save.mockResolvedValue(undefined);
        authServiceMock.user.mockReturnValue({ uid: 'u1' });

        await TestBed.configureTestingModule({
            imports: [FavoriteButton],
            providers: [
                {
                    provide: UserMoviesService,
                    useValue: userMoviesServiceMock,
                },
                {
                    provide: AuthService,
                    useValue: authServiceMock,
                },
                {
                    provide: Router,
                    useValue: routerMock,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(FavoriteButton);
        fixture.componentRef.setInput('movie', movie);
        fixture.detectChanges();
    });


    it('muestra el texto accesible para añadir a favoritas', () => {
        const button = fixture.nativeElement.querySelector('button');

        expect(button.getAttribute('aria-label')).toBe(
            'Añadir Película de prueba a favoritas',
        );
    });


    it('redirige a login si el usuario no ha iniciado sesión', async () => {
        authServiceMock.user.mockReturnValue(null);

        await fixture.componentInstance.toggleFavorite();

        expect(routerMock.navigate).toHaveBeenCalledWith(
            ['/login'],
            {
                queryParams: {
                    returnUrl: '/movies/1',
                },
            },
        );

        expect(userMoviesServiceMock.save).not.toHaveBeenCalled();
    });

    it('guarda la película como favorita cuando hay sesión', async () => {
        await fixture.componentInstance.toggleFavorite();

        expect(userMoviesServiceMock.save).toHaveBeenCalledWith(
            movie,
            {
                isFavorite: true,
            },
        );
    });


    it('muestra un error cuando no se puede guardar el favorito', async () => {
        userMoviesServiceMock.save.mockRejectedValue(
            new Error('Firestore error'),
        );

        await fixture.componentInstance.toggleFavorite();

        expect(fixture.componentInstance.errorMessage()).toBe(
            'No se pudo actualizar el favorito.',
        );

        expect(fixture.componentInstance.saving()).toBe(false);
    });


});