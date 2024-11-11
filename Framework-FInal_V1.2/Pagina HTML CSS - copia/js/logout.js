// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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

const logout = document.getElementById("logout");
logout.addEventListener("click", function (event) {
    event.preventDefault();

    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = "index.html";
        alert("Se ha cerrado la sesión")
    }).catch((error) => {
        // An error happened.
    });
});