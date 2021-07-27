import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";

function CreateEmployee(props) {
  const id = props.match.params.id;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");

  // Idが変更されるたびに実施
  useEffect(() => {
    // edit
    if (id !== "_add") {
      EmployeeService.getEmployeeById(id).then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmailId(res.data.emailId);
      });
    }
  }, [id]);

  function changeFirstNameHandler(e) {
    setFirstName(e.target.value);
  }

  function changeLastNameHandler(e) {
    setLastName(e.target.value);
  }

  function changeEmailHandler(e) {
    setEmailId(e.target.value);
  }

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    // let employee = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   emailId: emailId,
    // };
    // ※可変の時はlet
    const employee = {
      firstName,
      lastName,
      emailId,
    };

    if (id === "_add") {
      EmployeeService.createEmployee(employee).then((res) => {
        props.history.push("/employees");
      });
    } else {
      EmployeeService.updateEmployee(employee, id).then((res) => {
        props.history.push("/employees");
      });
    }
  }

  function cancel() {
    props.history.push("/employees");
  }

  const title = id === "_add" ? "Add Employee" : "Update Employee";
  const getTitle = <h3 className="text-center">{title}</h3>;
  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {getTitle}
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> First Name: </label>
                  <input
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={changeFirstNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Last Name: </label>
                  <input
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={changeLastNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Email Id: </label>
                  <input
                    placeholder="Email Address"
                    name="emailId"
                    className="form-control"
                    value={emailId}
                    onChange={changeEmailHandler}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={saveOrUpdateEmployee}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={cancel}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
