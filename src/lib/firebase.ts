import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence, signOut, onAuthStateChanged, getIdToken } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Set persistence to session, meaning the user will be logged out when the session ends (i.e., when the browser is closed)
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("🔥 Auth persistence set to SESSION");
  })
  .catch((error) => {
    console.error("❌ Error setting persistence:", error);
  });

// Check if the user is logged in or not (use token to verify)
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("✅ User is logged in:", user);

    try {
      // Check if the user has a valid token
      const idToken = await getIdToken(user, true); // Force refresh the token
      console.log("Token:", idToken);  // You can use this token for further API calls

      // If the token is valid, the user stays logged in
    } catch (error) {
      console.error("❌ Error fetching token:", error);
      signOut(auth);  // Logout the user if the token is invalid
    }
  } else {
    console.log("🚫 User is logged out");
  }
});

export { db, collection, addDoc, getDocs, doc, auth };
