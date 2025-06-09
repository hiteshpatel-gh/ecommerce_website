import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerHome from "./CustomerHome";
import ReactDOM from "react-dom/client";
import Cookies from "js-cookie";
import styles from "./CustomerLogin.module.css";

function CustomerLogin() {
  const [uid, setUId] = useState();
  const [upass, setUPass] = useState();
  const [ischecked, setIsChecked] = useState(false);

  const handleUIdText = (evt) => {
    setUId(evt.target.value);
  };
  const handleUPassText = (evt) => {
    setUPass(evt.target.value);
  };
  useEffect(() => {
    var myccokies = Cookies.get("auth");
    if (myccokies != undefined) {
      var obj = JSON.parse(myccokies);
      //alert(obj.username);
      setUId(obj.username);
      setUPass(obj.password);
    }
  }, []);
  const handleLoginButton = () => {
    var obj = {
      CUserId: uid,
      CUserPass: upass,
    };
    axios.post("http://localhost:9669/customer/login", obj).then((res) => {
      if (res.data.CUserId != undefined) {
        if (res.data.Status == "Inactive") {
          alert("User Not Active Please Wait for Activation process");
          return;
        }
        //cookies handling code
        if (ischecked == true) {
          const userData = {
            username: uid,
            password: upass,
          };
          const expirationTime = new Date(new Date().getTime() + 6000000);
          //store data in cookies
          Cookies.set("auth", JSON.stringify(userData), {
            expires: expirationTime,
          });
        }
        //session handling code
        const userSessionData = {
          userfullname: res.data.CustomerName,
        };
        const sessionexpirationTime = new Date(new Date().getTime() + 60000);

        //store data in session
        sessionStorage.setItem(
          "sessionauth",
          JSON.stringify(userSessionData),
          sessionexpirationTime
        );

        const root = ReactDOM.createRoot(document.getElementById("root"));
        var obj = {
          cfname: res.data.CustomerName,
          cpicname: res.data.CPicName,
          cid: res.data.Cid,
        };
        root.render(<CustomerHome data={obj}></CustomerHome>);
      } else {
        alert("Invalid ID/Password");
      }
    });
  };
  const handleIsRemember = () => {
    setIsChecked(true);
  };
  return (
    <div className={styles.loginContainer}>
    <div className={styles.loginForm}>
      <h4 className={styles.loginTitle}>Customer Login Form</h4>
  
      <label className={styles.loginLabel}>User Id</label>
      <input
        type="text"
        onChange={handleUIdText}
        value={uid}
        className={styles.loginInput}
      />
  
      <label className={styles.loginLabel}>Password</label>
      <input
        type="password"
        onChange={handleUPassText}
        value={upass}
        className={styles.loginInput}
      />
  
      <div className={styles.loginOptions}>
        <label className={styles.rememberLabel}>
          <input type="checkbox" onClick={handleIsRemember} />
          Remember Me
        </label>
      </div>
  
      <button
        type="submit"
        onClick={handleLoginButton}
        className={styles.loginButton}
      >
        Login
      </button>
    </div>
  </div>
  
  
  );
}
export default CustomerLogin;