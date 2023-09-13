import React, { useState } from "react";
import "./App.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MOCK_USERS = [
  { name: "carlos", age: 10, id: 0, isSelected: false },
  { name: "jason", age: 20, id: 1, isSelected: false },
  { name: "zilean", age: 14, id: 2, isSelected: false },
  { name: "bozo", age: 15, id: 3, isSelected: false },
  { name: "prapra", age: 19, id: 4, isSelected: false },
  { name: "yoyo", age: 20, id: 5, isSelected: false },
  // Add more users...
];

export default function App() {
  const [usersList, setUsersList] = useState(MOCK_USERS);
  const [openModal, setOpenModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(2); // Number of users to display per page

  const handleDeleteUsers = () => {
    const updateUsersList = usersList.filter((user) => !user.isSelected);
    setUsersList(updateUsersList);
  };

  // Props for UsersTable Component
  const handleUsersOnChange = (users) => {
    setUsersList(users);
  };

  // Props for UsersInputModal Component
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleAddUser = (user) => {
    setUsersList((prev) => [
      ...prev,
      { name: user.name, age: user.age, id: prev.length, isSelected: false },
    ]);
    setOpenModal(false); // Close the modal after adding a user
  };

  // JUMBOTRON FUNCIONALITIES BELOW

  const handleJumbotron = () => {
    // Filter Selected Users
    const selectedUsers = usersList.filter((user) => user.isSelected);

    // Shuffle the selected users randomly with the random algorhitm function
    const shuffledUsers = shuffleArray(selectedUsers);
  };

  const shuffleArray = (users)=>{
    const newArray = [...array];

    for
  }

  // USER PER PAGE LOGIC BELOW

  const handleUsersPerPage = (e) => {
    const usersPerPage = e.target.value;

    // Calculate the new number of pages based on the new number of users per page
    const newNumberOfPages = Math.ceil(usersList.length / usersPerPage);

    // If the current page exceeds the new number of pages, set it to the last page
    if (currentPage > newNumberOfPages) {
      setCurrentPage(newNumberOfPages);
    }

    // Update the number of users per page
    setUsersPerPage(usersPerPage);
  };

  // Calculate the users to display based on pagination
  const indexOfLastUser = currentPage * usersPerPage; // 2 * 5 = 10
  const indexOfFirstUser = indexOfLastUser - usersPerPage; // 10 - 5 = 5
  const displayedUsers = usersList.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <main className="wrapper">
      <h1 className="bg-danger">Nigga React 2.0</h1>
      <div className="button-wrapper">
        <Button onClick={handleOpenModal}>Add User</Button>
        <Button onClick={handleDeleteUsers}>Delete Selected</Button>
        <Button onClick={handleJumbotron}>Jumbotron Selected</Button>
        {/* Pagination controls */}
        <div className="pagination">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastUser >= usersList.length}
          >
            Next
          </Button>
        </div>
      </div>
      <div>
        <UsersTable usersList={displayedUsers} onChange={handleUsersOnChange} />
        <label htmlFor="users">Users Per Page:</label>
        <select id="users" name="users" onChange={handleUsersPerPage}>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <UsersInputModal
          openModal={openModal}
          onClose={() => setOpenModal(false)}
          addUser={handleAddUser}
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
          <UserRow
            user={user}
            handleChange={handleCheckboxClick}
            key={user.id}
          />
        ))}
      </tbody>
    </Table>
  );
}

function UserRow({ user, handleChange }) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={user.isSelected}
          onChange={() => handleChange(user.id)}
        />
      </td>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>{user.age >= 18 ? "True" : "False"}</td>
    </tr>
  );
}

//onClose en vez de setOpenModal    //addUser en vez de setUsersList
function UsersInputModal({ openModal, onClose, addUser }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const handleAddUser = () => {
    addUser({ name, age });
    setName("");
    setAge(0);
    onClose();
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
          <Button variant="primary" type="submit" onClick={handleAddUser}>
            Save changes
          </Button>
          {/* onClose en vez de setOpenModal */}
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
