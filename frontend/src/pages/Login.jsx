import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login() {

  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setMsg("All fields required");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      nav("/dashboard");

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

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <div className="center">
          <button type="submit">Login</button>
        </div>

      </form>

      {/* Error / Message */}
      <p className="error">{msg}</p>

      {/* Register Link */}
      <p style={{ textAlign: "center" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "#3498db", cursor: "pointer" }}
          onClick={() => nav("/register")}
        >
          Register here
        </span>
      </p>

    </div>
  );
}

export default Login;
