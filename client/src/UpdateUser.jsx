import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';



function UpdateUser() {
    const {id} = useParams()
    const loadingBar = useRef(null); // Create a ref
    const [Name,setName] = useState()
    const [Email,setEmail] = useState()
    const [Age,setAge] = useState()
    const navigate = useNavigate()
    
    useEffect(()=>{
        loadingBar.current.continuousStart();

        axios.get(`http://localhost:3001/getUser/${id}`)
        .then((result) => {
            setName(result.data.Name)
            setEmail(result.data.Email)
            setAge(result.data.Age)
            loadingBar.current.complete();
        })
        .catch(err => {console.log(err);  loadingBar.current.complete();})
    },[])


    const Update = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3001/updateUser/'+id,{Name,Email,Age})
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
      <div className="w-50 bg-white rounded-4 p-3 shadow">
        <form onSubmit={Update}>

        <h2>Update User</h2>
        <div className="mb-2">
            <label htmlFor="">Name:</label>
            <input type="text" value={Name} onChange={(e)=> setName(e.target.value)} placeholder="Enter name" className="form-control"/>
        </div>

        <div className="mb-2">
            <label htmlFor="">Email:</label>
            <input type="email" value={Email} onChange={(e)=> setEmail(e.target.value)}  placeholder="Enter email" className="form-control"/>
        </div>


        <div className="mb-2">
            <label htmlFor="">Age:</label>
            <input type="text" value={Age} onChange={(e)=> setAge(e.target.value)} placeholder="Enter Age" className="form-control"/>
        </div>

        <button className="btn btn-primary">Update</button>
        <Link className='btn mx-2 btn-success' to="/" >Back</Link>

        </form>
      </div>
    </div>
    </>
  )
}

export default UpdateUser