import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import {toast} from 'react-toastify'
import axios from "axios";
const Users = () => {
  const [users,setUsers] = useState([]);

  //get all category
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_LINK}/api/v1/user/user-list`);
      if (data.success) {
        setUsers(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching the user list");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

   //delete user
   const handleDelete = async (pId) => {
    try {
      let answer = window.prompt("Please enter \"Yes\"(case insensitive) in the text box below if you want to delete the user");
      if (!answer || answer.toLocaleUpperCase() !=="YES") return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_LINK}/api/v1/user/delete-user/${pId}`
      );
      if (data.success) {
        toast.success(`User has been deleted successfully`);

        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Dashboard - All Users">
      <div className="row dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage User List</h1>
            <div className="w-75">
            {(users.length===0)?<p style={{fontSize:"20px"}}>User list is empty. If new users are registered then their names and email ids will be displayed here.</p>:
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">E-Mail ID</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>              
                <tbody  style={{maxHeight:"50vh",overflow: "auto"}}>
                  {users?.map((u) => (
                    <>
                      <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(u._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
