import ReactDOM from 'react-dom/client'
import App from "./App";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {createContext} from "react";

const app = initializeApp({
  apiKey: "AIzaSyBos7DozB6QVLC3ahTyB2P6bPzwjdQnhJw",
  authDomain: "react-chat-73d52.firebaseapp.com",
  projectId: "react-chat-73d52",
  storageBucket: "react-chat-73d52.appspot.com",
  messagingSenderId: "642789256513",
  appId: "1:642789256513:web:b4a24e0868ce00081a05c0"
});

const auth = getAuth(app);
const db = getFirestore(app);

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      auth,
      db,
    }}
  >
    <App />
  </Context.Provider>
)