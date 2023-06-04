import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  onChildChanged,
  onValue,
  child,
  get,
} from "firebase/database";
import { useNavigate } from "react-router-dom";

function Empoley({ reference, db }) {
  const [childAdded, setChildAdded] = useState("");
  const [newChat, setNewChat] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onChildAdded(reference, (data) => {
      setChildAdded(data.val());
      setNewChat(true);
    });
  }, []);

  const addEmployees = async (name) => {
    const userChannelsSnapshot = await get(
      child(reference, `/${childAdded.data.name}`)
    );

    const referencenew = ref(db, `ChannelsBase/${childAdded.data.name}`);

    if (newChat) {
      set(referencenew, {
        data: {
          ...userChannelsSnapshot.val().data,
          employees: [name],
        },
      });
    }
    setNewChat(false);
    navigate(`/chat2/${childAdded.data.name}`);
  };

  return (
    <div>
      {newChat ? (
        <button onClick={() => addEmployees("Employees1")}>addEmployees</button>
      ) : (
        <p>No Customers</p>
      )}
    </div>
  );
}

export default Empoley;