import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserId } from "../actions/userActions";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

export default function UserList() {
  // state
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [dataEdit, setDataEdit] = useState("");
  const [dataDelete, setDataDelete] = useState("");
  const [show, setShow] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const dispatch = useDispatch();

  // to add user
  const handleAddUser = () => {
    console.log("sssss");
    setAddUser(true);
    setShow(!show);
    console.log("show ----> ", show);
  };

  // to edit
  const handleEditUser = (data) => {
    console.log("data----------->>", data);
    setEditUser(true);
    setShow(!show);
    setDataEdit(data);
    console.log("show in edit", show);
  };

  // to delete
  const handleDeleteUser = (data) => {
    setDataDelete(data);
    setDeleteUser(true);
    setShow(!show);
  };

  const handleDelete = (userId) => {
    // delete
    console.log("userId------->", userId);
    dispatch(deleteUserId(userId));
    setShow(false);
    window.location.reload(false);
  };

  const handleUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
  };

  // get user data
  const userDetails = useSelector((state) => state.userDetails);
  const { userDetailsV3 } = userDetails;
  console.log("userDetailsV3-----------------------------", userDetailsV3);

  return (
    <>
      <div className="row">
        <div className="add-user-btn">
          <Button
            size="lg"
            variant="primary"
            type="submit"
            onClick={() => handleAddUser()}
          >
            Add User
          </Button>
        </div>
        {userDetailsV3 && userDetailsV3.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Birth Date</th>
                <th>Gender</th>
                <th>College</th>
                <th>Hobbies</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userDetailsV3 &&
                userDetailsV3.map((data) => (
                  <tr key={data.userId}>
                    <td>{data.name}</td>
                    <td>{data.address}</td>
                    <td>{data.birthDate}</td>
                    <td>{data.gender}</td>
                    <td>{data.college}</td>
                    <td>{data.hobbies.toString().replace("Others", " ")}</td>
                    <td>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={() => handleEditUser(data)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={() => handleDeleteUser(data)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </div>
      {/* // )} */}
      {addUser && (
        <AddUser addUser={addUser} disableBackdropToggle={true} show={show} />
      )}
      {editUser && (
        <EditUser
          editUser={editUser}
          dataEdit={dataEdit}
          disableBackdropToggle={true}
          show={show}
        />
      )}

      {deleteUser && (
        <Modal show={show}>
          <Modal.Header closeButton={true}></Modal.Header>
          <Modal.Body>
            <p>Are you sure, you want to delete this user?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleUpdate}>
              Cancel
            </Button>{" "}
            <Button
              variant="secondary"
              onClick={() => handleDelete(dataDelete)}
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
