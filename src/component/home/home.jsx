import { onValue, set, ref, child, push } from "firebase/database";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ reference, db }) => {
  const [inputs, setInputs] = useState({});
  const [value, setValue] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      setValue(data);
    });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    set(reference, {
      ...value,
      [inputs.name]: {
        data: {
          email: inputs.email,
          name: inputs.name,
        },
      },
    });
    navigate(`chat/${inputs.name}`);
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

export default Home;
