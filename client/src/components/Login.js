import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const history = useHistory();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3300/api/auth/login", input)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/jokes");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input onChange={handleChange} name="username"></input>
        <label>Password</label>
        <input onChange={handleChange} name="password" type="password"></input>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
