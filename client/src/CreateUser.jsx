import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {

    const [Name,setName] = useState()
    const [Email,setEmail] = useState()
    const [Age,setAge] = useState()
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/CreateUser',{Name,Email,Age})
        .then(result =>{ 
            console.log(result)
            navigate('/')
        })

        .catch(err => console.log(err))

    }


  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded-4 p-3">
        <form onSubmit={Submit}>

        <h2>Add User</h2>
        <div className="mb-2">
            <label htmlFor="">Name:</label>
            <input type="text" placeholder="Enter name" className="form-control"
            onChange={(e)=>{
                setName(e.target.value)
            }}
            />
        </div>

        <div className="mb-2">
            <label htmlFor="">Email:</label>
            <input type="email" placeholder="Enter email" className="form-control"
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            />
        </div>


        <div className="mb-2">
            <label htmlFor="">Age:</label>
            <input type="text" placeholder="Enter Age" className="form-control"
            onChange={(e)=>{
                setAge(e.target.value)
            }}
            />
        </div>

        <button className="btn btn-primary">submit</button>

        </form>
      </div>
    </div>
  );
}

export default CreateUser;
