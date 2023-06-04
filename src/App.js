import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "./component/home/home";
import Empoley from "./component/empoley/empoley";
import { getDatabase, ref } from "firebase/database";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./utils/firebase/firebase.utils";
import Chat from "./component/chat/chat";
import Chat2 from "./component/chat2/chat";

function App() {
  const db = getDatabase();
  const reference = ref(db, "ChannelsBase");
  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);
  return (
    <div>
      <Routes>
        <Route index element={<Home reference={reference} />} />
        <Route
          path="empoley"
          element={<Empoley reference={reference} db={db} />}
        />
        <Route
          path="chat/:name"
          element={<Chat reference={reference} db={db} />}
        />
        <Route
          path="chat2/:name"
          element={<Chat2 reference={reference} db={db} />}
        />
      </Routes>
    </div>
  );
}

export default App;
