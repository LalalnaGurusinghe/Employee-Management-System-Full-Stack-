import React, { useEffect, useState } from "react";
import { saveEmployee , updateEmployee , deleteEmployee } from "../services/EmployeeService";
import { useNavigate  , useParams} from "react-router-dom";
import { getEmployeeById } from "../services/EmployeeService";


const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const { id } = useParams(); // Extracts the `id` from the URL
  console.log("Employee ID:", id); // Example: If URL is /update-employee/5 → logs 5

  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
  });

  

  const validateForm = () => {
    let validate = true;

    const errorCoppy = { ...error };

    if (firstName === "") {
      errorCoppy.firstNameError = "First Name is required";
      validate = false;
    }
    if (lastName === "") {
      errorCoppy.lastNameError = "Last Name is required";
      validate = false;
    }
    if (email === "") {
      errorCoppy.emailError = "Email is required";
      validate = false;
    }

    setError(errorCoppy);
    return validate;
  };

  function handleFirstName(event) {
    setFirstName(event.target.value);
  }

  function handleLastName(event) {
    setLastName(event.target.value);
  }

  function handleEmailAddress(event) {
    setEmail(event.target.value);
  }

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
          navigate("/");
        });
    }
  }, [id, navigate]);
  
  function saveEmployeeData(event) {
    event.preventDefault();

    if (validateForm()) {
        const employee = { firstName, lastName, email };
        console.log("Employee Data:", employee);

        if (id) {
            updateEmployee(id, employee).then((response) => {  // Call update function
                console.log(response.data);
                alert("Employee Updated Successfully");
                navigate("/");
            });
        } else {
            saveEmployee(employee).then((response) => {
                console.log(response.data);
                alert("Employee Added Successfully");
                navigate("/");
            });
        }
    }
}

  
  

  const pageTitle = ()=> {
    return (
      <div className="text-center" style={{ fontSize: "24px", fontWeight: "bold" }}>
        {id ? "Update Employee" : "Add Employee"}
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "40px", width: "50%" }}>
      <div className="row">
        <div className="card" style={{ minHeight: "400px", padding: "20px" }}>
          {
            pageTitle()
            
          }
          <div
            className="card-body"
            style={{
              minHeight: "350px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <form action="">
              <div className="form-group mb-3">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  className={`form-control ${
                    error.firstNameError ? "is-invalid" : ""
                  } `}
                  value={firstName}
                  onChange={handleFirstName}
                ></input>
                {error.firstNameError && (
                  <div className="invalid-feedback">{error.firstNameError}</div>
                )}
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  className={`form-control ${
                    error.lastNameError ? "is-invalid" : ""
                  } `}
                  value={lastName}
                  onChange={handleLastName}
                ></input>
                {error.lastNameError && (
                  <div className="invalid-feedback">{error.lastNameError}</div>
                )}
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Work Email:</label>
                <input
                  type="text"
                  placeholder="Email Address"
                  name="email"
                  className={`form-control ${
                    error.emailError ? "is-invalid" : ""
                  } `}
                  value={email}
                  onChange={handleEmailAddress}
                ></input>
                {error.emailError && (
                  <div className="invalid-feedback">{error.emailError}</div>
                )}
              </div>
              <div className="text-center">
                <button
                  type="button"
                  class="btn btn-outline-success btn-rounded"
                  data-mdb-ripple-init
                  data-mdb-ripple-color="dark"
                  onClick={saveEmployeeData}
                  style={{ marginTop: "20px", height: "40px" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
