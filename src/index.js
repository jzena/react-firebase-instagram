import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
  apiKey: 'AIzaSyDxMApcCbLHgOPcQ6IA9F0NsfLuhZuwHRc',
  authDomain: 'pseudogram-92f4f.firebaseapp.com',
  databaseURL: 'https://pseudogram-92f4f.firebaseio.com',
  projectId: 'pseudogram-92f4f',
  storageBucket: 'pseudogram-92f4f.appspot.com',
  messagingSenderId: '473672233600'
});

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
registerServiceWorker();
