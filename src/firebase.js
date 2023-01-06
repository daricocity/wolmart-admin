import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyASqbkr4KQxiIFkC3WiIfOPM6C0BhV78JY',
    authDomain: 'shop-ee4a7.firebaseapp.com',
    projectId: 'shop-ee4a7',
    storageBucket: 'shop-ee4a7.appspot.com',
    messagingSenderId: '1049234098268',
    appId: '1:1049234098268:web:6468c2fcbcad083f7f7e99',
    measurementId: 'G-70FQQP1H4C'
};

const app = initializeApp(firebaseConfig);
export default app;
