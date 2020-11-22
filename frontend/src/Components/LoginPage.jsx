import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../Redux/Auth/actions";

export default function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const loginError = useSelector((state) => state.auth.loginError);
  const login_message = useSelector((state) => state.auth.login_message);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ school_id: email, password: password }));
    alert(email + " " + password);
  };
  if (isAuth) {
    return <Redirect to="/mainPage" />;
  }
  return (
    <>
      <h1 style={{ textAlign: "center", color: "crimson", marginTop: 50 }}>
        Login Page
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          width: 400,
          margin: "auto",
          marginTop: 100,
          border: "1px solid lightgray",
          padding: 100,
          backgroundColor: "lightblue",
        }}
      >
        <div class="form-group">
          <label for="exampleInputEmail1">School_ID</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
        <p>{loginError && login_message}</p>
        <small
          id="help"
          class="form-text text-muted"
          style={{ fontSize: 15, textDecoration: "none" }}
        >
          not registered?<Link to="/register">Register </Link>
        </small>
      </form>
    </>
  );
}
