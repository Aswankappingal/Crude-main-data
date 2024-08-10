import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './StudentEdit.scss'

const StudentEdit = () => {


    const navigate = useNavigate()
    const { id } = useParams()


    const [val,setVal2] = useState({
        name: '',
        number: ''

    })



    const getDatas = async () => {
        const res = await axios.post(`http://localhost:3002/api/fulldetails/${id}`)

        setVal2(res.data)
        console.log(val);


    }
    console.log("name", val);

    useEffect(() => {
        getDatas()
    }, [])


    const GetData2 = (e) => {
        setVal2((pre) => ({ ...pre, [e.target.name]: e.target.value }))

    }

    const editTask = async (e) => {
        e.preventDefault()
        console.log(val);
        const res = await axios.patch(`http://localhost:3002/api/edittask/${id}`, { ...val })
        if (res.status != 200) {
            console.log(res.status);
            alert("Data not Edited")
        }
        else {
            alert("its edited")
            navigate("/Studentview")

        }
    }








    return (
        <div>


            <form action="" onSubmit={editTask}>

               <div className='Edit'><h3>  Editing Panel</h3></div>
                <div className="main-card2">
                  
                   
                    <div><input type="text" placeholder='Name' id='iinp' value={val.name} onChange={GetData2} name='name' /></div>
                    <div><input type="text" placeholder='Number' id='iinp' value={val.number} onChange={GetData2} name='number' /></div>
                    <div className='bttnntnn'><button>Edit!</button></div>


                </div>






            </form>






        </div>
    )
}

export default StudentEdit
