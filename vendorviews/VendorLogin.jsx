import React, { useState, useEffect } from "react";
import axios from "axios";
import VendorHome from "./VendorHome";
import ReactDOM from "react-dom/client";
import Cookies from "js-cookie";
import VendorReg from "./VendorReg";
import styles from "./VendorLogin.module.css"; // <- import CSS module

const VendorLogin = () => {
  const [uid, setUId] = useState("");
  const [upass, setUPass] = useState("");
  const [ischecked, setIsChecked] = useState(false);

  useEffect(() => {
    const mycookies = Cookies.get("vauth");
    if (mycookies !== undefined) {
      const obj = JSON.parse(mycookies);
      setUId(obj.username);
      setUPass(obj.password);
    }
  }, []);

  const handleLoginButton = () => {
    const obj = {
      vuid: uid,
      vupass: upass,
    };

    axios.post("http://localhost:9669/vendor/login", obj).then((res) => {
      if (res.data.VUserId !== undefined) {
        if (res.data.Status === "Inactive") {
          alert("User Not Active. Please Wait For Admin Activation.");
          return;
        }

        if (ischecked === true) {
          const userData = {
            username: uid,
            password: upass,
          };
          const expirationTime = new Date(new Date().getTime() + 6000000);
          Cookies.set("vauth", JSON.stringify(userData), {
            expires: expirationTime,
          });
        }

        const userSessionData = {
          vuserfullname: res.data.VendorName,
        };
        sessionStorage.setItem("vsessionauth", JSON.stringify(userSessionData));

        const root = ReactDOM.createRoot(document.getElementById("root"));
        const vendorObj = {
          vfname: res.data.VendorName,
          vpicname: res.data.VPicName,
          vid: res.data.Vid,
        };
        alert("Vendor Id: " + vendorObj.vid);
        root.render(<VendorHome data={vendorObj} />);
      } else {
        alert("Invalid ID/Password");
      }
    });
  };

  const handleIsRemember = () => {
    setIsChecked(!ischecked);
  };

  const handleRegister = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<VendorReg />);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h4 className={styles.loginTitle}>Vendor Login</h4>
        <label className={styles.loginLabel}>User ID</label>
        <input
          type="text"
          onChange={(e) => setUId(e.target.value)}
          value={uid}
          className={styles.loginInput}
        />

        <label className={styles.loginLabel}>Password</label>
        <input
          type="password"
          onChange={(e) => setUPass(e.target.value)}
          value={upass}
          className={styles.loginInput}
        />

        <div className={styles.loginOptions}>
          <label className={styles.rememberLabel}>
            <input type="checkbox" checked={ischecked} onChange={handleIsRemember} />
            Remember Me
          </label>
        </div>

        <button type="button" className={styles.loginButton} onClick={handleLoginButton}>
          Login
        </button>

        <button type="button" className={styles.loginButton} onClick={handleRegister} style={{ marginTop: '10px'}}>
          Register
        </button>
      </div>
    </div>
  );
};

export default VendorLogin;
