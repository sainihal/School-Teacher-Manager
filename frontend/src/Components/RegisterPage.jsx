import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { register } from "../Redux/Auth/actions";

export default function RegisterPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const registerError = useSelector((state) => state.auth.registerError);
  const register_message = useSelector((state) => state.auth.register_message);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(name + " " + email + " " + password);
    dispatch(
      register({ school_id: email, password: password, school_name: name })
    );
  };
  return (
    <>
      <h1 style={{ textAlign: "center", color: "crimson", marginTop: 50 }}>
        Register Page
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          width: 400,
          margin: "auto",
          marginTop: 50,
          border: "1px solid lightgray",
          padding: 100,
          backgroundColor: "lightblue",
        }}
      >
        <div class="form-group">
          <label for="exampleInputName1">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputName1"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">School_Id</label>
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
            required
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
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
        <p>{registerError && register_message}</p>
        <p>{!registerError && register_message}</p>
        <small
          id="help"
          class="form-text text-muted"
          style={{ fontSize: 15, textDecoration: "none" }}
        >
          already registered?<Link to="/login">login </Link>
        </small>
      </form>
    </>
  );
}
