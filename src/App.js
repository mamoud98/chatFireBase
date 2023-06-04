import "./App.css";

import { Routes, Route } from "react-router-dom";

import { getDatabase } from "firebase/database";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./utils/firebase/firebase.utils";
import Home from "./component/home/home";
import Chat from "./component/chat/chat";
import Clent from "./component/clent/clent";

function App() {
  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="chat" element={<Chat />} />
        <Route path="clent/:compantID/:chanleID" element={<Clent />} />
      </Routes>
    </div>
  );
}

export default App;
