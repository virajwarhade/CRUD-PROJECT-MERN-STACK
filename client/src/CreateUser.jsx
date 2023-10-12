import React, { useState ,useRef, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

function CreateUser() {
    const [users, setUsers] = useState([]);

    const loadingBar = useRef(null);

    useEffect(()=>{
        loadingBar.current.continuousStart();
        loadingBar.current.complete();
    })

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
    <>
    
    <LoadingBar color='#000000' ref={loadingBar} />

    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="w-50 bg-white rounded-4 p-3 shadow" >
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

        <button className="btn btn-primary mx-0 my-2">submit</button>
        <Link to='/' className="btn btn-success mx-2 my-2">Back</Link>

        </form>
      </div>
    </div>
    </>
  );
}

export default CreateUser;
