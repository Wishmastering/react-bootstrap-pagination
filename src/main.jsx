import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import React, { useState } from "react";
// import "./styles.scss";

// import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";

// export default function App() {
//   // const obj = [1, 2, 3];

//   let [openModal, setOpenModal] = useState(false);

//   return (
//     <main className="wrapper">
//       <h1 className="bg-danger">Nigga React 2.0</h1>
//       <div className="button-wrapper">
//         <Button> Add User </Button>
//         <Button> Delete Selected </Button>
//         <Button> Jumbotron users </Button>
//       </div>
//       <div>
//         <MyTable></MyTable>
//         <MyModal openModal={openModal} setOpenModal={setOpenModal} />
//       </div>
//     </main>
//   );
// }

// function MyTable() {
//   return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Select</th>
//           <th>Name</th>
//           <th>Age</th>
//           <th>Legal Age</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>
//             <input type="checkbox" />
//           </td>
//           <td>NAME HERE</td>
//           <td>AGE HERE</td>
//           {/* TERNARY BELOW */}
//           <td>Legal Age or NOT Legal Age</td>
//         </tr>
//         <tr>
//           <td>2</td>
//           <td>Jacob</td>
//           <td>Thornton</td>
//           <td>@fat</td>
//         </tr>
//         <tr>
//           <td>3</td>
//           <td colSpan={2}>Larry the Bird</td>
//           <td>@twitter</td>
//         </tr>
//       </tbody>
//     </Table>
//   );
// }

// function MyModal({ openModal, setOpenModal }) {
//   return (
//     <div
//       className="modal show"
//       style={{ display: openModal ? "block" : "none", position: "absolute" }}
//     >
//       <Modal.Dialog>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New User To Table</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <div className="d-flex gap-2 mb-3">
//             <p>Insert Name</p>
//             <input type="text" />
//           </div>
//           <div className="d-flex gap-4">
//             <p>Insert Age</p>
//             <input type="text" />
//           </div>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="primary">Save changes</Button>
//           <Button variant="secondary" onClick={setOpenModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal.Dialog>
//     </div>
//   );
// }
