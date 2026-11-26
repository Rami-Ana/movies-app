const fs = require('fs');
const path = require('path');

// Seguridad: en tu ordenador NO toca tu environment.ts real
if (process.env.NETLIFY !== 'true') {
  console.log('No estamos en Netlify: no se genera environment.ts');
  process.exit(0);
}

const required = [
  'TMDB_API_KEY',
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
];

const missing = required.filter((name) => !process.env[name]);

if (missing.length > 0) {
  console.error(`Faltan variables de entorno: ${missing.join(', ')}`);
  process.exit(1);
}

const value = (name) => JSON.stringify(process.env[name]);

const content = `export const environment = {
  production: true,
  tmdbApiKey: ${value('TMDB_API_KEY')},
  baseUrl: 'https://api.themoviedb.org/3',

  firebase: {
    apiKey: ${value('FIREBASE_API_KEY')},
    authDomain: ${value('FIREBASE_AUTH_DOMAIN')},
    projectId: ${value('FIREBASE_PROJECT_ID')},
    storageBucket: ${value('FIREBASE_STORAGE_BUCKET')},
    messagingSenderId: ${value('FIREBASE_MESSAGING_SENDER_ID')},
    appId: ${value('FIREBASE_APP_ID')}
  },
};
`;

const dir = path.join(__dirname, '..', 'src', 'environments');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'environment.ts'), content);

console.log('environment.ts generado');