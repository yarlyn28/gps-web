import "firebaseui/dist/firebaseui.css";

import * as firebaseui from "firebaseui";

import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMCI4DR73yUxXztu55v9PcWdIHHDIMgts",
  authDomain: "tesis-arduino-gps-iot.firebaseapp.com",
  projectId: "tesis-arduino-gps-iot",
  storageBucket: "tesis-arduino-gps-iot.appspot.com",
  messagingSenderId: "839557450268",
  appId: "1:839557450268:web:643716541e591b8deeadd9",
};

firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Initialize the FirebaseUI Widget using Firebase.
const initiateSignInUI = () => {
  ui.start("#firebaseui-auth-container", {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
      },
    ],
    callbacks: {
      signInSuccess: function (currentUser, credential, redirectUrl) {
        return false;
      },
    },
  });
}

const initApp = function () {
  firebase.auth().onAuthStateChanged(
    function (user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;

        user.getIdToken().then(function (accessToken) {
          document.getElementById("sign-in-status").textContent = "Signed in";
          document.getElementById("sign-in").textContent = "Sign out";
          document.getElementById("account-details").textContent =
            JSON.stringify(
              {
                displayName: displayName,
                email: email,
                emailVerified: emailVerified,
                phoneNumber: phoneNumber,
                photoURL: photoURL,
                uid: uid,
                accessToken: accessToken,
                providerData: providerData,
              },
              null,
              "  "
            );
        });
      } else {
        // User is signed out.
        document.getElementById("sign-in-status").textContent = "Signed out";
        document.getElementById("sign-in").textContent = "Sign in";
        document.getElementById("account-details").textContent = "null";
        initiateSignInUI()
      }
    },
    function (error) {
      console.log(error);
    }
  );
};

window.addEventListener("load", function () {
  initApp();
});

async function logout() {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.log(error);
  }
}

const signInComponent = document.getElementById("sign-in");

signInComponent.addEventListener("click", logout);
