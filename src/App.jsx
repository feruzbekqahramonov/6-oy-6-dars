import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

import { validate, getUsers } from "./utilits/functctions";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [nat, setNat] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdataId] = useState("");
  useEffect(() => {
    let u = getUsers();
    setUsers(u);
  }, []);

  function handleRadio(value) {
    setNat(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate(name, age, email, pass, nat);
    if (isValid) {
      const user = {
        name: name,
        age: age,
        email: email,
        pass: pass,
        nat: nat,
        id: nanoid(),
      };

      let copied = JSON.parse(JSON.stringify(users));
      copied.push(user);
      localStorage.setItem("users", JSON.stringify(copied));
      setName("");
      setAge("");
      setEmail("");
      setPass("");
      window.location.reload();
    }
  }

  function handleUpdate() {
    if (updateId) {
      const isValid = validate(name, age, email, pass, nat);
      if (isValid) {
        const user = {
          name: name,
          age: age,
          email: email,
          pass: pass,
          nat: nat,
          id: updateId,
        };
        let copied = JSON.parse(JSON.stringify(users));
        copied = copied.map((el) => {
          if (el.id == updateId) {
            el = user;
          }
          return el;
        });
        setUsers(copied);
        localStorage.setItem("users", JSON.stringify(copied));
        setIsUpdate(false);
        setName("");
        setAge("");
        setEmail("");
        setPass("");
      }
    }
  }

  function handleUpdateItem(user) {
    setName(user.name);
    setAge(user.age);
    setEmail(user.email);
    setPass(user.pass);
    setNat(user.nat);
    setIsUpdate(true);
    setUpdataId(user.id);
  }


  return (
    <>
      <div className="container mt-3"></div>
      <h2 className="text-center">Users</h2>
      <form className="w-50 mx-auto shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          type="number"
          className="form-control mt-3"
          placeholder="Enter age"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />

        <input
          type="email"
          className="form-control mt-3"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="password"
          className="form-control mt-3"
          placeholder="Enter password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />

        {
          <div className="radio mt-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefoult"
                value="uzbek"
                checked={nat == "uzbek" ? true : false}
                onChange={(e) => {
                  handleRadio(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="uzbek">
                Uzbek
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefoult"
                value="engilish"
                checked={nat == "engilish" ? true : false}
                onChange={(e) => {
                  handleRadio(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="engilish">
                Engilish
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefoult"
                value="russian"
                checked={nat == "russian" ? true : false}
                onChange={(e) => {
                  handleRadio(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="russian">
                Russian
              </label>
            </div>
          </div>
        }

        {!isUpdate && (
          <button
            onClick={handleSubmit}
            className="btn btn-primary w-100 mt-4 mt-3"
          >
            Save
          </button>
        )}
        {isUpdate && (
          <button
            onClick={handleUpdate}
            className="btn btn-success w-100 mt-4 mt-3"
          >
            Update
          </button>
        )}
      </form>

      <table class="table">
        <thead class="table-light">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Pass</th>
            <th>Nationality</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <th>{user.name}</th>
                  <th>{user.sge}</th>
                  <th>{user.email}</th>
                  <th>{user.pass}</th>
                  <th>{user.nat}</th>
                  <th>
                    <div className="d-flex gap-4">
                      <FaTrashCan
                        
                        style={{ cursor: "pointer" }}
                      />{" "}
                      <FaEdit
                        onClick={() => {
                          handleUpdateItem(user);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </th>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default App;
