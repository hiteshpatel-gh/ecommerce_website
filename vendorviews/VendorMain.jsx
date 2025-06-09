import React from "react";
import {Link,Outlet} from "react-router-dom";
// import vendorpic from "./vendorpic.png";
// import "../index.css";
function VendorMain(){
    return(
        <div>
            <center>
                {/* <img src={vendorpic}height={200} width={800}/> */}
                <nav>
                    <ul>
                        <li>
                            <Link to="/vendormain/vendorlogin">Login</Link>
                        </li>
                        <li>
                            <Link to="/vendormain/vendorreg" >Registration</Link>
                        </li>
                    </ul>
                    <Outlet/>
                </nav>
            </center>
        </div>
    )
}export default VendorMain;