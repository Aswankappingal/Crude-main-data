import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GiArchiveRegister } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import './Studentview.scss'

const Studentview = () => {



  const navigate = useNavigate()
  const [val, setVal] = useState({
    data: ""


  })
  const GetData = (e) => {
    setVal((pre) => ({ ...pre, [e.target.name]: e.target.value }))
  }





  const [msg, setMsg] = useState("")

  const value = JSON.parse(localStorage.getItem('stud_token'));
  const getName = async () => {
    const res = await axios.get("http://localhost:3002/api/home", {
      headers: { Authorization: `Bearer ${value}` },
    })
    setMsg(res.data.msg)
  }

  useEffect(() => {
    getName()
  }, [])


  // const Logout = (e) => {
  //     e.preventDefault();
  //     const confirmed = window.confirm("Are you sure you want to logout?");
  //     if (confirmed) {
  //         localStorage.clear();
  //         navigate("/Adminlogin")
  //     }
  // }




  const { id } = useParams();
  const [person, setPerson] = useState([]);
  const [val1, setVal2] = useState({
    name: '',
    number: ''
  });

  const GetData2 = (e) => {
    setVal2((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const register = async () => {
    try {
      const res = await axios.post("http://localhost:3002/api/addtask", { ...val1 });
      console.log(res.data);
      if (res.status !== 404) {
        alert("Data Added");
      }
      GetPerson();
    } catch (error) {
      console.error("Error registering:", error);
    }
  };


  const GetPerson = async () => {
    try {
      const res = await axios.get("http://localhost:3002/api/gettask");
      setPerson(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    GetPerson();
  }, []);



  const delTask = async (id) => {
    try {
      const confirmed = window.confirm("iam gonne a delete bye?");

      if (confirmed) {
        const res = await axios.delete(`http://localhost:3002/api/deltask/${id}`);
        console.log("deleted", res.data);
        GetPerson();
      }
    } catch (error) {
      console.error(error);
    }
  };






  return (
    <div>
      <div className="color-only">
      <div className="main-head">
       
          <h2>Telephone directory</h2>
        </div>
       <Link to={"/"}> <button id='logout'>Logout</button></Link>

      </div>
      <div className="serachbox" >
        <div className='sar'><img src="../../../../public/images-removebg-preview.png" alt="" /> </div>
        <div className='pp1' ><h1><i className="fa fa-user" aria-hidden="true"> <MdOutlinePerson /><span className='pp'>{msg}</span></i></h1>
        </div>
      </div>


      {/* <form action=" " onSubmit={AddCat}>



                <div className="data-one">
                    <input type="text" id=' ' name='' placeholder='Add' onChange={GetData} />
                    <button >Add</button>
                </div>
            </form> */}



      <div className="full">
     
        <div className="both-data">


          <div className="main-card">

            <div className='inp1'><input type="text" placeholder='Name' name='name' id='iinp' onChange={GetData2} /></div>
            <div className='inp1'><input type="text" placeholder='Number' name='number' id='iinp' onChange={GetData2} /></div>
            <div className='btn' ><button onClick={register}>Add The Data</button></div>
          </div>



        </div>

        <div className="full-data">
          {
            person.map((dt, index) => (
              <div className="card" key={index}>
                <div className="card-details">
                 <input type="checkbox" name="" id=""  /> <p className="text-title"> Name : {dt.name}</p>
                  <p className="text-body"> Number : {dt.number}</p>
                  <div className="btns">
                  <div>  <button className='bttnn' onClick={() => delTask(dt._id)}><MdDelete />
                    </button></div>
                  <div className='hi'>
                  <Link to={`/edit/${dt._id}`} className='bttnn'><button><FaEdit /></button></Link>
                  </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>





















    </div>
  )
}

export default Studentview
