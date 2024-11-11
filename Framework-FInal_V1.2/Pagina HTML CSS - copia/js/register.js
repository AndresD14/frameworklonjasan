// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8IAUJ6cjAWsu3O1-bve_MR5gMI29QO5Y",
    authDomain: "lonjasan-ad566.firebaseapp.com",
    projectId: "lonjasan-ad566",
    storageBucket: "lonjasan-ad566.appspot.com",
    messagingSenderId: "928977258129",
    appId: "1:928977258129:web:9cdabd7af065d510bca130"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inputs
/* const email = document.getElementById('email').value;
const password = document.getElementById('password').value; */

// Submit button
const submit = document.getElementById('submit_sign');
submit.addEventListener("click", function (event) {
    event.preventDefault()
    const email = document.getElementById('email_sign').value;
    const password = document.getElementById('password_sign').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            /* alert("Su cuenta ha sido creada con exito") */
            window.location.href = "indexLogin_.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            /* alert(errorMessage) */
            // ..    
        });

})