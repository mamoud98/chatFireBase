import React, { useEffect, useRef, useState } from "react";
import "./chat.scss";
import { useParams } from "react-router-dom";
import {
  child,
  get,
  onChildAdded,
  onChildChanged,
  push,
  ref,
  set,
} from "firebase/database";

function Chat({ reference, db }) {
  const [massges, setMassges] = useState([]);
  const [childChanged, setChildChanged] = useState("");
  const textInput = useRef();
  const { name } = useParams();
  const referencenew = ref(db, `ChannelsBase/${name}`);

  const getChatData = async () => {
    onChildChanged(referencenew, (data) => {
      setChildChanged(data);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const referencenew = ref(db, `ChannelsBase/${name}/massages`);

    const newPostRef = push(referencenew);
    set(newPostRef, {
      massages: textInput.current.value,
    });
    textInput.current.value = "";
  };

  const handAnyChanged = () => {
    const referencenew = ref(db, `ChannelsBase/${name}/massages`);
    onChildAdded(referencenew, (data) => {
      setMassges((prev) => [...prev, data.val()]);
    });
  };

  useEffect(() => {
    getChatData();
    handAnyChanged();
  }, []);
  const addMoreEmpoley = async (names) => {
    const referencenew = ref(db, `ChannelsBase/${name}/data`);
    const userChannelsSnapshot = await get(child(reference, `/${name}/data`));
    set(referencenew, {
      ...userChannelsSnapshot.val(),
      employees: [...userChannelsSnapshot.val().employees, names],
    });
  };
  return (
    <div className="container">
      <div>
        <button onClick={() => addMoreEmpoley("Empoley2")}>
          add more empoley
        </button>
      </div>
      <h1>Swanky Chatbox UI With React</h1>
      <div className="chatbox" ng-controller="MessageCtrl as chatMessage">
        <div className="chatbox__messages" ng-repeat="message in messages">
          <div className="chatbox__messages__user-message">
            {massges &&
              massges.map((mas, i) => (
                <div
                  key={i}
                  className="chatbox__messages__user-message--ind-message"
                >
                  <p className="name">{mas.massages}</p>
                  <br />
                  <p className="message">{mas.massages}</p>
                </div>
              ))}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" ref={textInput} placeholder="Enter your message" />
        </form>
      </div>
    </div>
  );
}

export default Chat;
