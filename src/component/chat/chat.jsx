import { getDatabase, onValue, ref, set } from "firebase/database";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const companyID = 1685879244747;
  const [inputs, setInputs] = useState({});
  const [value, setValue] = useState({});
  const navigate = useNavigate();

  const db = getDatabase();

  useEffect(() => {
    const Newreference = ref(db, `Company/${companyID}/chats`);

    onValue(Newreference, (snapshot) => {
      const data = snapshot.val();
      setValue(data);
    });
  }, [companyID, db]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    const Key = companyID;
    const chanleID = Date.now();
    const Newreference = ref(db, `Company/${companyID}/chats`);
    event.preventDefault();
    set(Newreference, {
      ...value,
      [`chat${chanleID}`]: {
        data: {
          email: inputs.email,
          name: inputs.name,
        },
      },
    });

    navigate(`/clent/${Key}/chat${chanleID}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>user name</label>
        <input
          name="name"
          type="text"
          value={inputs.name}
          onChange={handleChange}
        />
        <br />
        <label>email</label>
        <input
          type="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <br />
        <button>New Chat</button>
      </form>
    </div>
  );
};

export default Chat;
