import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import TeacherPageDataRow from "./TeacherPageDataRow";
import { v4 as uuidv4 } from "uuid";
import { logout } from "../Redux/Auth/actions";

export default function TeacherPage(props) {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [classes, setClasses] = useState([]);
  const id = props.match.params.id;
  const [newName, setNewName] = useState(name);
  const [newAge, setNewAge] = useState(age);
  const [newGender, setNewGender] = useState(gender);
  const [teacherId, setTeacherId] = useState("");
  const [grade, setGrade] = useState(0);
  const [subject, setSubject] = useState("");
  const [section, setSection] = useState("");

  const deleteTeacher = async (e) => {
    e.preventDefault();
    try {
      await axios
        .delete(`http://localhost:6001/api/admin/deleteTeacher/${teacherId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          alert("Teacher deleted successfully");
          props.history.push("/mainPage");
        });
    } catch (err) {
      console.log("error in deleting teacher", err);
    }
  };

  const editTeacher = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `http://localhost:6001/api/admin/editTeacher`,
          {
            name: newName,
            age: newAge,
            gender: newGender,
            _id: teacherId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          alert("Teacher edited successfully");
          setName(res.data.data.name);
          setAge(res.data.data.age);
          setGender(res.data.data.gender);
          // props.history.push("/mainPage")
        });
    } catch (err) {
      console.log("error in deleting teacher", err);
    }
  };

  const addClass = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `http://localhost:6001/api/admin/addClass`,
          {
            teacher_id: teacherId,
            grade,
            section,
            subject,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          alert("Class Added successfully");
          setClasses([...res.data.data.classes]);
          // props.history.push("/mainPage")
        });
    } catch (err) {
      console.log("error in deleting teacher", err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
    // dispatch(login({school_id:email,password:password}))
    // alert(email+" "+password)
  };
  const deleteClass = async (e, class_id) => {
    alert("in deleting class");
    e.preventDefault();
    e.stopPropagation();
    try {
      await axios
        .delete(
          `http://localhost:6001/api/admin/deleteClass/${teacherId}/${class_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          //   props.history.push("/mainPage")
          setClasses([...res.data.data.classes]);
        });
    } catch (err) {
      console.log("error in deleting teacher", err);
    }
  };

  useEffect(() => {
    return axios
      .get(
        `http://localhost:6001/api/admin/getTeacher/${props.match.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setName(res.data.data.name);
        setNewName(res.data.data.name);
        setAge(res.data.data.age);
        setNewAge(res.data.data.age);
        setGender(res.data.data.gender);
        setNewGender(res.data.data.gender);
        setClasses([...res.data.data.classes]);
        setTeacherId(res.data.data["_id"]);
      })
      .catch((err) => {
        console.log("error in fetching teacher details", err);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ margin: 25 }}>Teacher Page</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h3>
          <span style={{ color: "crimson" }}>Id</span> {id}{" "}
        </h3>
        <h3>
          <span style={{ color: "crimson" }}>Name</span> {name}
        </h3>
        <h3>
          <span style={{ color: "crimson" }}>Age</span> {age}
        </h3>
        <h3>
          <span style={{ color: "crimson" }}>Gender</span> {gender}
        </h3>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#addClass`}
        style={{ marginRight: "15px" }}
      >
        Add Class
      </button>

      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#exampleModal`}
      >
        Edit Details
      </button>
      <button
        className="btn btn-danger"
        style={{ marginLeft: 25 }}
        onClick={deleteTeacher}
      >
        Delete Teacher
      </button>
      <ul class="list-group" style={{ width: "1200px", margin: "auto" }}>
        <li key={uuidv4()} className="list-group-item listItem title">
          <span>Id</span>
          <span>Grade</span>
          <span>Section</span>
          <span>Subject</span>
        </li>
        {classes &&
          classes.map((ele, i) => (
            <div key={uuidv4()}>
              {" "}
              <TeacherPageDataRow
                {...props}
                ele={ele}
                index={i}
                teacher_id={teacherId}
                deleteClass={deleteClass}
              />
            </div>
          ))}
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
                Edit
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
                onSubmit={editTeacher}
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
      <div
        class="modal fade"
        id="addClass"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add Class
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
                onSubmit={addClass}
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
                  <label for="exampleInputName">Grade</label>
                  <input
                    type="number"
                    class="form-control"
                    id={`exampleInputNumber`}
                    aria-describedby="NameHelp"
                    placeholder="Enter grade"
                    value={grade}
                    onChange={(e) => {
                      setGrade(e.target.value);
                    }}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputAge">Section</label>
                  <input
                    type="text"
                    class="form-control"
                    id={`exampleInputAge`}
                    placeholder="Section"
                    value={section}
                    onChange={(e) => {
                      setSection(e.target.value);
                    }}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputGender">Subject</label>
                  <input
                    type="text"
                    class="form-control"
                    id={`exampleInputGender`}
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
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
    </div>
  );
}
