import React, { useEffect } from "react";
import data from "./data.json";
import MainPageDataRow from "./MainPageDataRow";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import { logout } from "../Redux/Auth/actions";

export default function MainPage(props) {
  // const [details,setDetails] = useState({})
  let [details, setDetails] = useState([]);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const id = props.match.params.id;
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newGender, setNewGender] = useState("");
  const [current, setCurrent] = useState(1);
  const [next, setNext] = useState(-1);
  const [prev, setPrev] = useState(-1);
  const [genderFilter, setGenderFilter] = useState("none");
  const [sort, setSort] = useState("none");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const addTeacher = async (e) => {
    e.preventDefault();
    alert(" in add Teacher");
    try {
      await axios
        .post(
          `http://localhost:6001/api/admin/addTeacher`,
          { name: newName, age: newAge, gender: newGender },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          alert("Teacher added successfully");
          setData([...res.data.data]);
        });
    } catch (err) {
      console.log("error in adding teacher", err);
    }
  };
  useEffect(() => {
    return axios
      .get(
        `http://localhost:6001/api/admin/getAllTeachers?page=${current}&limit=4&sort=${sort}&filter=${genderFilter}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        //   setDetails(res.data.data)
        details = res.data.data;
        setDetails([...res.data.data.current]);
        setNext((res.data.data.next && res.data.data.next.page) || -1);
        setPrev((res.data.data.prev && res.data.data.prev.page) || -1);
      })
      .catch((err) => {
        console.log("error in fetching teacher details", err);
      });
  }, [current, sort, genderFilter, data]);
  return (
    <>
      {
        <div>
          <h1 style={{ textAlign: "center", margin: 25 }}>MainPage</h1>
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Add Teacher
            </button>
            <div>
              <label>Gender Filter</label>

              <select
                value={genderFilter}
                onChange={(e) => {
                  setGenderFilter(e.target.value);
                }}
                style={{ margin: 15 }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="none">None</option>
              </select>
            </div>
            <div>
              <label>Sort By</label>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
                <option value="ageAsc">Age Ascending</option>
                <option value="ageDesc">Age Descending</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <ul class="list-group" style={{ width: "1200px", margin: "auto" }}>
            <li key={uuidv4()} className="list-group-item listItem title">
              <span>Name</span>
              <span>Age</span>
              <span>Gender</span>
              <span>Class_Count</span>
            </li>
            {details &&
              details.map((ele) => <MainPageDataRow {...props} ele={ele} />)}
            <div style={{ margin: "auto", marginTop: 25 }}>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li
                    class={`page-item ${prev == -1 ? "disabled" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrent(prev == -1 ? current : prev);
                    }}
                  >
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li
                    class={`page-item ${prev == -1 ? "disabled" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrent(prev == -1 ? current : prev);
                    }}
                  >
                    <a class="page-link" href="#">
                      Prev
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      {current}
                    </a>
                  </li>
                  <li
                    class={`page-item ${next == -1 ? "disabled" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrent(next == -1 ? current : next);
                    }}
                  >
                    <a
                      class="page-link"
                      href="#"
                      disabeld={next == -1 ? true : false}
                    >
                      Next
                    </a>
                  </li>
                  <li
                    class={`page-item ${next == -1 ? "disabled" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrent(next == -1 ? current : next);
                    }}
                  >
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </ul>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Add Teacher
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form
                    onSubmit={addTeacher}
                    style={{
                      width: 400,
                      margin: "auto",
                      marginTop: 10,
                      border: "1px solid lightgray",
                      padding: 100,
                      backgroundColor: "lightblue",
                    }}
                  >
                    <div class="form-group">
                      <label for="exampleInputName">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id={`exampleInputName`}
                        aria-describedby="NameHelp"
                        placeholder="Enter name"
                        value={newName}
                        onChange={(e) => {
                          setNewName(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputAge">Age</label>
                      <input
                        type="number"
                        class="form-control"
                        id={`exampleInputAge`}
                        placeholder="Age"
                        value={newAge}
                        onChange={(e) => {
                          setNewAge(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputGender">Gender</label>
                      <input
                        type="text"
                        class="form-control"
                        id={`exampleInputGender`}
                        placeholder="Gender"
                        value={newGender}
                        onChange={(e) => {
                          setNewGender(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <button
        className="btn btn-danger"
        onClick={() => {
          dispatch(logout());
          props.history.push("/login");
        }}
        style={{ position: "fixed", top: 50, right: 100 }}
      >
        LOGOUT
      </button>
    </>
  );
}
