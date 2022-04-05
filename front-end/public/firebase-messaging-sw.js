// It's a static script file, so it won't be covered by a module bundling system
// hence, it uses "importScripts" function to load the other libs
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyDlNWHnQTGrREEAUT5JtCqp1xAjSG7iad4",
    authDomain: "plantool-346019.firebaseapp.com",
    projectId: "plantool-346019",
    storageBucket: "plantool-346019.appspot.com",
    messagingSenderId: "692060939337",
    appId: "1:692060939337:web:cd7ddb880ef62cf80c0b98",
    measurementId: "G-YKJG44SM3V"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();


messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload); 
});
