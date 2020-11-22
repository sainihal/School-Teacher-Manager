import React from "react";
import { Redirect } from "react-router-dom";

export default function MainPageDataRow(props) {
  const { name, age, gender, class_count, _id } = props.ele;
  const handleClick = (e) => {
    alert(name + " " + age + " " + " " + gender + " " + class_count);
    alert(`redirecting to /teacherPage/${_id}`);
    props.history.push(`/teacherPage/${_id}`);
    return;
  };

  return (
    <>
      <li className="list-group-item listItem " onClick={handleClick}>
        <span>{name}</span>
        <span>{age}</span>
        <span>{gender}</span>
        <span>{class_count ? class_count : 0}</span>
      </li>
    </>
  );
}
