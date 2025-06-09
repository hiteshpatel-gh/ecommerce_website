import React from "react";
// import adminpic from "../adminpic.jpg";
// import "./Style.css"
import AdminLogin from "./AdminLogin";
import { Link, Outlet } from "react-router-dom";
function AdminMain(){
    return(
        <div>
            <center>
                {/* <img src={adminpic} height={200} width={800}/> */}
                <nav>
                    <ul>
                        <li>
                            <Link to ="/adminmain/adminlogin">Login</Link>
                        </li>
                        <li>
                            <Link to ="/adminmain/adminreg"> Registration</Link>
                        </li>
                    </ul>
                    <Outlet/>
                </nav>
            </center>
        </div>
    )
} export default AdminMain;
