import { Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, User, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);

  private currentUser = signal<User | null>(null);
  private currentAuthReady = signal<boolean>(false);
  readonly user = this.currentUser.asReadonly();
  readonly authReady = this.currentAuthReady.asReadonly();


  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.set(user);
      this.currentAuthReady.set(true);
    });
  }


  async waitForAuthReady(): Promise<void> {

    if (this.authReady()) { return; }
    await new Promise<void>((resolve) => {

      const interval = setInterval(() => {
        if (this.authReady()) {
          clearInterval(interval);
          resolve();
        }
      }, 50);

    });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(
      this.auth,
      email,
      password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  logout() { return signOut(this.auth); }

  async updateDisplayName(displayName: string,): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) { return; }
    await updateProfile(user, { displayName },);
    this.currentUser.set(this.auth.currentUser,);
  }

}

