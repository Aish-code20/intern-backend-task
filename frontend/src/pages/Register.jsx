import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Register() {

  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      setMsg("All fields required");
      return;
    }

    try {

      await api.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Registration successful");
      nav("/login");

    } catch (err) {

      if (err.response) {
        setMsg(err.response.data.msg);
      } else {
        setMsg("Server error");
      }

    }
  };

  return (
    <div className="container">

      <h1>Register</h1>

      <form onSubmit={handleSubmit} className="form-group">

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="center">
          <button type="submit">Register</button>
        </div>

      </form>

      <p className="error">{msg}</p>

    </div>
  );
}

export default Register;
