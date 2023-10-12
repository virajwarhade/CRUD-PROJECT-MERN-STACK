import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Users() {
const [users,setUsers] =  useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    },[])

    const deleteUser = (id) => {
        axios.delete('http://localhost:3001/deleteUser/' + id)
          .then(result => {
            console.log(result);
            window.location.reload();
          })
          .catch(err => console.log(err));
      }
      



  return (

    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded-4 p-3 shadow">
        <Link to="/create" className="btn btn-success">Add +</Link>
        <table className="table">

        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>

        {
            users.map((user) => {
                return <tr>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.Age}</td>
                <td>

                <Link to={`/update/${user._id}`} className="btn btn-primary m-1">Update</Link>
                <button onClick={ (e) => deleteUser(user._id) } className="btn btn-primary m-1">Delete</button>
                
                </td>
                </tr>
            })
        }

        </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
