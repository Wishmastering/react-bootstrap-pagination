import { useState } from "react";
import "./App.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MOCK_USERS = [
  { name: "carlos", age: 10, id: 0, isSelected: false },
  { name: "jason", age: 20, id: 1, isSelected: false },
];

export default function App() {
  const [usersList, setUsersList] = useState(MOCK_USERS);

  const [openModal, setOpenModal] = useState(false);

  const handleDeleteUsers = () => {
    const updateUsersList = usersList.filter((user) => !user.isSelected);
    setUsersList(updateUsersList);
  };

  const handleUsersOnChange = (users) => {
    setUsersList(users);
  };

  return (
    <main className="wrapper">
      <h1 className="bg-danger">Nigga React 2.0</h1>
      <head className="button-wrapper">
        <Button onClick={() => setOpenModal(true)}> Add User </Button>
        <Button onClick={handleDeleteUsers}> Delete Selected </Button>
        <Button> Jumbotron users </Button>
      </head>
      <div>
        <UsersTable usersList={usersList} onChange={handleUsersOnChange} />
        <UsersInputModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setUsersList={setUsersList}
        />
      </div>
    </main>
  );
}

function UsersTable({ usersList, onChange }) {
  const handleCheckboxClick = (id) => {
    onChange(
      usersList.map((user) =>
        user.id === id ? { ...user, isSelected: !user.isSelected } : user
      )
    );
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Select</th>
          <th>Name</th>
          <th>Age</th>
          <th>Above 18</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user) => (
          <tr key={user.id}>
            <td>
              <input
                type="checkbox"
                checked={user.isSelected}
                onClick={() => handleCheckboxClick(user.id)}
              />
            </td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.age >= 18 ? "True" : "False"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

// CREAR USERROW COMPONENT

// <USERROW key={blabla}/>

{
  /* <tr>
            <td>
              <input
                type="checkbox"
                checked={user.isSelected}
                onClick={() => handleCheckboxClick(user.id)}
              />
            </td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.age >= 18 ? "True" : "False"}</td>
          </tr>
        ))} */
}

//onClose en vez de setOpenModal    //addUser en vez de setUsersList
function UsersInputModal({ openModal, setOpenModal, setUsersList }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const handleSubmit = () => {
    setUsersList((prev) => [
      ...prev,
      { name, age, id: prev.length, isSelected: false },
    ]);
    setName("");
    setAge(0);
    setOpenModal(false); // llamamos onClose en vez de esto
  };

  return (
    <div
      className="modal show"
      style={{ display: openModal ? "block" : "none", position: "absolute" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add New User To Table</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form action="submit">
            <div className="d-flex gap-2 mb-3">
              <p>Insert Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="d-flex gap-4">
              <p>Insert Age</p>
              <input
                type="number"
                value={age}
                min={0}
                step={1}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
          {/* onClose en vez de setOpenModal */}
          <Button variant="secondary" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
