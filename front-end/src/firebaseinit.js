// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlNWHnQTGrREEAUT5JtCqp1xAjSG7iad4",
  authDomain: "plantool-346019.firebaseapp.com",
  projectId: "plantool-346019",
  storageBucket: "plantool-346019.appspot.com",
  messagingSenderId: "692060939337",
  appId: "1:692060939337:web:cd7ddb880ef62cf80c0b98",
  measurementId: "G-YKJG44SM3V"
};
// BM3xp8F4L0kUC6zPoFdYwwaWpiIpqYq4RJAmeuNaiSeSMAf-B8SfjyIcOO1wryz3gMh_qqk5H6-4llJmR4e53gI
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const messaging = getMessaging();

export async function getFCMToken() {
    try {
        const token = await getToken(messaging, {vapidKey: "BM3xp8F4L0kUC6zPoFdYwwaWpiIpqYq4RJAmeuNaiSeSMAf-B8SfjyIcOO1wryz3gMh_qqk5H6-4llJmR4e53gI"});
        return token;
    } catch (error) {
        console.log('Error: FCM key', error);
        return undefined;
    }
}

export const onMessageListener = () => {
    new Promise((resolve)=>{
        messaging.onMessage((payload)=>{
            resolve(payload);
        });
    });
};