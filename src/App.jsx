// import { useState } from "react";
// import "./App.css";
// import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";

// const MOCK_USERS = [
//   { name: "carlos", age: 10, id: 0, isSelected: false },
//   { name: "jason", age: 20, id: 1, isSelected: false },
// ];

// export default function App() {
//   const [usersList, setUsersList] = useState(MOCK_USERS);

//   const [openModal, setOpenModal] = useState(false);

//   const handleDeleteUsers = () => {
//     const updateUsersList = usersList.filter((user) => !user.isSelected);
//     setUsersList(updateUsersList);
//   };

//   // Props for UsersTable Component
//   const handleUsersOnChange = (users) => {
//     setUsersList(users);
//   };

//   // Props for UsersInputModal Component

//   const handleOpenModal = () => {
//     setOpenModal(false);
//   };

//   const handleAddUser = (user) => {
//     setUsersList((prev) => [
//       ...prev,
//       { name: user.name, age: user.age, id: prev.length, isSelected: false },
//     ]);
//   };

//   return (
//     <main className="wrapper">
//       <h1 className="bg-danger">Nigga React 2.0</h1>
//       <head className="button-wrapper">
//         <Button onClick={() => setOpenModal(true)}> Add User </Button>
//         <Button onClick={handleDeleteUsers}> Delete Selected </Button>
//         <Button> Jumbotron users </Button>
//       </head>
//       <div>
//         <UsersTable usersList={usersList} onChange={handleUsersOnChange} />
//         <UsersInputModal
//           openModal={openModal}
//           onClose={handleOpenModal}
//           addUser={handleAddUser}
//         />
//       </div>
//     </main>
//   );
// }

// function UsersTable({ usersList, onChange }) {
//   const handleCheckboxClick = (id) => {
//     onChange(
//       usersList.map((user) =>
//         user.id === id ? { ...user, isSelected: !user.isSelected } : user
//       )
//     );
//   };

//   return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Select</th>
//           <th>Name</th>
//           <th>Age</th>
//           <th>Above 18</th>
//         </tr>
//       </thead>
//       <tbody>
//         {usersList.map((user) => (
//           <UserRow
//             user={user}
//             handleChange={handleCheckboxClick}
//             key={user.id}
//           />
//         ))}
//       </tbody>
//     </Table>
//   );
// }

// function UserRow({ user, handleChange }) {
//   return (
//     <tr>
//       <td>
//         <input
//           type="checkbox"
//           checked={user.isSelected}
//           onClick={() => handleChange(user.id)}
//         />
//       </td>
//       <td>{user.name}</td>
//       <td>{user.age}</td>
//       <td>{user.age >= 18 ? "True" : "False"}</td>
//     </tr>
//   );
// }

import React, { useState } from "react";
import "./App.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MOCK_USERS = [
  { name: "carlos", age: 10, id: 0, isSelected: false },
  { name: "jason", age: 20, id: 1, isSelected: false },
  // Add more users...
];

export default function App() {
  const [usersList, setUsersList] = useState(MOCK_USERS);
  const [openModal, setOpenModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Number of users to display per page

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
      <Modal.Dialog keyboard>
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
