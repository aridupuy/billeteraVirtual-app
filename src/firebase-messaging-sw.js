// import { firebaseConfig } from './environments/firebaseconfig';
importScripts('https://www.gstatic.com/firebasejs/5.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.7.1/firebase-messaging.js');


//const messaging = firebase.messaging();

if (firebase.messaging.isSupported()){
   firebase.initializeApp({
    'messagingSenderId': '394225840157'
   });
   const messaging = firebase.messaging({vapidKey:"BFVl0lHti6HQMLQ_k9mzve-MrHo5Y73r2NTVaqrMnnz3m6j_WoIZP2MYMi7PdrnfHDhHoKvftX2sHe6p6bamF7g"});
}