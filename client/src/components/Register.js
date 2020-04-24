import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const history = useHistory();
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3300/api/auth/register", input)
      .then((res) => history.push("/login"))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Sign Up!</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input onChange={handleChange} name="username" type="text"></input>
        <label>Password</label>
        <input onChange={handleChange} name="password" type="password"></input>
        <button type="submit">Enter</button>
      </form>
    </div>
  );
};

export default Register;
