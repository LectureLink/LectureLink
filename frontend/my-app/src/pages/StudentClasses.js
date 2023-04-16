import React from "react";
import Class from "../components/Class";
import "../styles/StudentClasses.css";
import logo from "../assets/logo2.png";

function StudentClasses() {
  const classes = [
    { id: 1, title: "ENTR 3000" },
    { id: 2, title: "MATH 1010" },
    { id: 3, title: "PHYS 2020" },
    { id: 4, title: "ENGL 2010" },
    { id: 5, title: "HIST 2000" },
    { id: 6, title: "CS 1400" },
    { id: 7, title: "CS 1400" },
    { id: 8, title: "CS 1400" },
    { id: 9, title: "CS 1400" },
  ];

  return (
    <div className="container">
      <img src={logo} alt="logo" className="logo" />
      <h1 className="title">My Classes</h1>
      <div className="scrollView">
        {classes.map((c) => (
          <Class key={c.id} title={c.title} />
        ))}
        <button className="addClassButton">Add class +</button>
      </div>
    </div>
  );
}

export default StudentClasses;
