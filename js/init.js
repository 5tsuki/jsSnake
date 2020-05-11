const firebaseConfig = {
    apiKey: "AIzaSyAYujxHd6YgvLmX4NhtBDbgDdQS3tNqgd8",
    authDomain: "snakehighscores.firebaseapp.com",
    databaseURL: "https://snakehighscores.firebaseio.com",
    projectId: "snakehighscores",
    storageBucket: "snakehighscores.appspot.com",
    messagingSenderId: "694910444803",
    appId: "1:694910444803:web:d415b2d0a1db6d91a57536",
    measurementId: "G-P2N748DPER"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();