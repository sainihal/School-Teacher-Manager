import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function TeacherPageDataRow(props) {
  const { class_id, grade, section, subject } = props.ele;
  const [initGrade, setInitGrade] = useState(grade);
  const [initSection, setInitSection] = useState(section);
  const [initSubject, setInitSubject] = useState(subject);

  const index = props.index;
  const token = useSelector((state) => state.auth.accessToken);
  const [newGrade, setNewGrade] = useState(grade);
  const [newSection, setNewSection] = useState(section);
  const [newSubject, setNewSubject] = useState(subject);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const editClass = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `https://school-teacher-manager.herokuapp.com/api/admin/editClass`,
          {
            class_id,
            grade: newGrade,
            section: newSection,
            subject: newSubject,
            teacher_id: props.teacher_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          alert("Class edited successfully");
          //   props.history.push("/mainPage")
          setInitGrade(res.data.data.grade);
          setInitSection(res.data.data.section);
          setInitSubject(res.data.data.subject);
        });
    } catch (err) {
      console.log("error in editing teacher", err);
    }
  };
  return (
    <>
      <li
        className="list-group-item listItem "
        data-toggle="modal"
        data-target={`#class${index}`}
      >
        <span>{class_id}</span>
        <span>{initGrade}</span>
        <span>{initSection}</span>
        <span>{initSubject}</span>
        <button
          type="button"
          class="btn btn-danger"
          style={{ width: 50, textAlign: "center" }}
          onClick={(e) => {
            props.deleteClass(e, class_id);
          }}
        >
          x{" "}
        </button>
      </li>
      <div
        class="modal fade"
        id={`class${index}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Class
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
                onSubmit={editClass}
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
                    value={newGrade}
                    onChange={(e) => {
                      setNewGrade(e.target.value);
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
                    value={newSection}
                    onChange={(e) => {
                      setNewSection(e.target.value);
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
                    value={newSubject}
                    onChange={(e) => {
                      setNewSubject(e.target.value);
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
    </>
  );
}
