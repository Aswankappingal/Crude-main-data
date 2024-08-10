import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Studentlogin.scss"


const Studentlogin = () => {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate()

    const handleLogin_student = async (e) => {
        e.preventDefault();
        try {
            // console.log(admission_id, date);
            const response = await axios.post("http://localhost:3002/api/login", {
                username: username,
                password: password,
            });

            const data = response.data;
            console.log(data.token);

            if (response.status !== 404) {
                const stud_token = data.token;
                localStorage.setItem("stud_token", JSON.stringify(stud_token));

                // Navigate immediately after setting the token
                navigate("/Studentview");
            } else {
                alert(data.msg);
            }
        } catch (error) {
            alert("Student ID Or Date Of Birth Incorrect");
        }
    };




    return (
        <div>

            <div className="whole-data-student-reg">
                <div className="fullerr-staff-login">
                    <div className="main-staff-login">
                        <div className="signup-staff-login">

                            <form>
                                

                                <label htmlFor="chk" id='labelll' aria-hidden="true" className='head-student2'>Student Login</label>
                                <div className='inputs-whole'><input type="email" className='inputs-whole' name="username" onChange={(e) => setusername(e.target.value)} placeholder="username" required="" />

                                </div>

                                <div className='inputs-whole'><input type="password" className='inputs-whole' name="date" placeholder="password" onChange={(e) => setpassword(e.target.value)} required="" /></div>
                                {/* <div className='Links-login-only'><Link className='Fort' to='/Forgotusername'>Forgot Username</Link>
                                <Link className='Fort' to='/Forgotpassword'>Forgot Password</Link></div> */}
                                <button className='btn' onClick={handleLogin_student} >Login</button>
                                <div className='Back'><Link to={'/'} ><button>Don'have an account?Register Now</button></Link></div>




                            </form>


                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Studentlogin
