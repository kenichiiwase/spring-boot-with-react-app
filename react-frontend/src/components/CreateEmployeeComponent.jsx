import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";

function CreateEmployeeComponent(props) {
  const id = props.match.params.id;
  const [employee, setEmployee] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");

  useEffect(() => {
    if (id === "_add") {
      return;
    } else {
      EmployeeService.getEmployeeById(id).then((res) => {
        setEmployee(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmailId(res.data.emailId);
      });
    }
  }, []);

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

    let employee = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
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
                    value={firstName || employee.firstName}
                    onChange={changeFirstNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Last Name: </label>
                  <input
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={lastName || employee.lastName}
                    onChange={changeLastNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Email Id: </label>
                  <input
                    placeholder="Email Address"
                    name="emailId"
                    className="form-control"
                    value={emailId || employee.emailId}
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

export default CreateEmployeeComponent;
