// Dati per la configurazione e l'accesso al database di Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDROnP5gUqj7hwcYMRrY2eImTiguxgfYtk",
    authDomain: "snakehighscoresandrealin.firebaseapp.com",
    databaseURL: "https://snakehighscoresandrealin.firebaseio.com",
    projectId: "snakehighscoresandrealin",
    storageBucket: "snakehighscoresandrealin.appspot.com",
    messagingSenderId: "131500805117",
    appId: "1:131500805117:web:2418a4770ffab1b8f7a794",
    measurementId: "G-25MHL8GGBB"
};

firebase.initializeApp(firebaseConfig); // Inizializzazione database

var db = firebase.firestore();  // Crea una variabile per accedere al database