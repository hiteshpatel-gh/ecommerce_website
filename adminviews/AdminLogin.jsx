import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import AdminHome from "./AdminHome";
import styles from "./AdminLogin.module.css"; // Import CSS module

function AdminLogin() {
  const [uid, setUId] = useState();
  const [upass, setUPass] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const handleUIdText = (evt) => {
    setUId(evt.target.value);
  };

  const handleUPassText = (evt) => {
    setUPass(evt.target.value);
  };

  const handleIsRemember = () => {
    setIsChecked(!isChecked);
  };

  const handleLoginButton = () => {
    if (uid === "admin" && upass === "abc@123") {
      alert("Login Success");
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<AdminHome />);
    } else {
      alert("Invalid ID or Password");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h4 className={styles.loginTitle}>ADMIN LOGIN</h4>
        <div>
          <label className={styles.loginLabel}>USER ID</label>
          <input
            type="text"
            onChange={handleUIdText}
            className={styles.loginInput}
          />
        </div>
        <div>
          <label className={styles.loginLabel}>PASSWORD</label>
          <input
            type="password"
            onChange={handleUPassText}
            className={styles.loginInput}
          />
        </div>
        <div className={styles.loginOptions}>
          <label className={styles.rememberLabel}>
            <input type="checkbox" onChange={handleIsRemember} checked={isChecked} />
            Remember Me
          </label>
        </div>
        <button
          type="submit"
          className={styles.loginButton}
          onClick={handleLoginButton}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
