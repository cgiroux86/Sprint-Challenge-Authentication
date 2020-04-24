import React, { useState, useEffect } from "react";
import Axios from "axios";

const Users = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3300/api/jokes", {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => {
        setJokes(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {jokes.length > 0 &&
        jokes.map((joke) => {
          return (
            <div key={joke.id}>
              <p>{joke.joke}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Users;
