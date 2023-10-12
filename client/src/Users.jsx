import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

function Users() {
  const [users, setUsers] = useState([]);

  const loadingBar = useRef(null); // Create a ref

  useEffect(() => {
    loadingBar.current.continuousStart(); // Start the progress bar


    axios.get('http://localhost:3001')
      .then(result => {
        setUsers(result.data);
        loadingBar.current.complete(); // Complete the progress bar when data is loaded
      })
      .catch(err => {
        console.log(err);
        loadingBar.current.complete(); // Complete the progress bar on error
      });
  }, []);

  const deleteUser = (id) => {
    axios.delete('http://localhost:3001/deleteUser/' + id)
      .then(result => {
        console.log(result);
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <LoadingBar color='#000000' ref={loadingBar} />

      <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
        <div className="w-50 bg-white rounded-4 p-3 shadow">
          <Link to="/create" className="btn btn-success mb-2">Add +</Link>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Age}</td>
                    <td>
                      <Link to={`/update/${user._id}`} className="btn btn-primary m-1">Update</Link>
                      <button onClick={() => deleteUser(user._id)} className="btn btn-primary m-1">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
