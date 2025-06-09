import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CustomerReg.module.css" 

function CustomerReg(){

    const[cuserid , setCUserId]=useState()
    const[cuserpass , setCUserPass]=useState()
    const[customername , setCustomerName]=useState()
    const[stid , setStId]=useState()
    const[ctid , setCtId]=useState()
    const[caddress , setCAddress]=useState()
    const[ccontact , setCContact]=useState()
    const[cemail , setCEmail]=useState()
    const[cpicname , setCPicName]=useState()
    const[cid , setCId]=useState()
    const[image , setImage]=useState({preview:"" , data:""})
    const[status , setStatus]=useState("")
    const[stlist , setStList]=useState([])
    const[ctlist , setCtList]=useState([])

    const handleCUserIdText = (evt) => {
        setCUserId(evt.target.value)
    }
    const handleCUserPassText = (evt) => {
        setCUserPass(evt.target.value)
    }
    const handleCustomerNameText = (evt) => {
        setCustomerName(evt.target.value)
    }
    const handleStIdSelect = (evt) => {
        setStId(evt.target.value)
        axios.get("http://localhost:9669/city/showcitybystate/" + evt.target.value)
        .then((res)=>{
            setCtList(res.data)
        }).catch((err)=>{
            alert(err)
        })
    }
    const handleCtIdSelect = (evt) => {
        setCtId(evt.target.value)
    }

    const handleCAddressText = (evt) => {
        setCAddress(evt.target.value)
    }
    const handleCContactText = (evt) => {
        setCContact(evt.target.value)
    }
    const handleCEmailText = (evt) => {
        setCEmail(evt.target.value)
    }
    const handleCidText = (evt) => {
        setCId(evt.target.value)
    }
    useEffect(()=>{
        axios.get("http://localhost:9669/customer/getcustomercount/")
        .then((res)=>{
            setCId(res.data.length+1)
        }).catch((err)=>{
            alert(err)
        })

        axios.get("http://localhost:9669/state/show/")
        .then((res)=>{
            setStList(res.data)
        }).catch((err)=>{
            alert(err)
        })

    } , [])

    const handleRegisterButton = async() => {
        var obj = {
            CUserId:cuserid,
            CUserPass:cuserpass,
            CustomerName:customername,
            StId:stid,
            CtId:ctid,
            CAddress:caddress,
            CContact:ccontact,
            CEmail:cemail,
            CPicName:cpicname,
            Cid:cid,
            Status:"Inactive"
        }

        let formData = new FormData()
        formData.append('file' , image.data)
        const response = await fetch("http://localhost:9669/customer/savecustomerimage" , {
            method: "POST",
            body: formData,
        })

        if(response){
            if(response.statusText == "ok"){
                setStatus("File Uploaded Successfully")
            }
            else{
                setStatus("Failed to Upload File")
            }
        }
        axios.post("http://localhost:9669/customer/register/" , obj)
        .then((res)=>{
            alert(res.data)
            if(res.data == "Registration Successfull"){
                axios.post("http://localhost:9669/email/sendemails/" + cemail)
                .then((res)=>{
                    alert(res.data)
                }).catch((err)=>{
                    alert(err)
                })
            }
        }).catch((err)=>{
            alert(err);
        })
    }

    //browser and save image code
    const handleSubmit = async (evt) =>{
        evt.preventDefault()
        let formData = new FormData()
        formData.append("file" , image.data)
        const response  = await fetch("http://localhost:9669/customer/savecustomerimage" , {
            method:"POST",
            body: formData,
        })
        if(response){
            if(response.statusText == "ok"){
                setStatus("File Uploaded Successfully")
            }
            else{
                setStatus("Failed to Upload File")
            }
        }
    }

    const handleFileChange = (evt) => {
        const img = {
            preview : URL.createObjectURL(evt.target.files[0]) , 
            data:evt.target.files[0]
        }
        setImage(img)
        setCPicName(evt.target.files[0].name)
    }
return(
  <div className={styles.formContainer}>
  <div className={styles.formBox}>
    <p className={styles.formTitle}>Customer Registration Form</p>
    <table className={styles.formTable}>
      <tbody>
        <tr>
          <td className={styles.formLabel}>Customer Id</td>
          <td>{cid}</td>
        </tr>
        <tr>
          <td className={styles.formLabel}>User Id</td>
          <td><input type="text" onChange={handleCUserIdText} className={styles.formControl} /></td>
        </tr>
        <tr>
          <td className={styles.formLabel}>Password</td>
          <td><input type="password" onChange={handleCUserPassText} className={styles.formControl} /></td>
        </tr>
        <tr>
          <td className={styles.formLabel}>Customer Name</td>
          <td><input type="text" onChange={handleCustomerNameText} className={styles.formControl} /></td>
        </tr>
        <tr>
          <td className={styles.formLabel}>State</td>
          <td>
            <select onClick={handleStIdSelect} className={styles.formControl}>
              {stlist.map((items) => (
                <option key={items.StId} value={items.StId}>{items.StName}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td className={styles.formLabel}>City</td>
          <td>
            <select onClick={handleCtIdSelect} className={styles.formControl}>
              {ctlist.map((items) => (
                <option key={items.ctid} value={items.ctid}>{items.ctname}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td className={styles.formLabel}>Address</td>
          <td><input type="text" onChange={handleCAddressText} className={styles.formControl} /></td>
        </tr>
        <tr>
          <td className={styles.formLabel}>Contact</td>
          <td><input type="number" onChange={handleCContactText} className={styles.formControl} /></td>
        </tr>
        <tr>
          <td className={styles.formLabel}>Email</td>
          <td><input type="email" onChange={handleCEmailText} className={styles.formControl} /></td>
        </tr>
        <tr>
          <td className={styles.formLabel}>Select Photo</td>
          <td>
            <input type="file" onChange={handleFileChange} name="file" />
            <img src={image.preview} height="100" alt="Preview" className={styles.formImage} />
          </td>
        </tr>
        <tr>
          <td className={styles.formLabel}>Upload Photo</td>
          <td>
            <button type="submit" onClick={handleSubmit} className={styles.formButton}>Upload</button>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button type="submit" onClick={handleRegisterButton} className={styles.formButton}>Register</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

    )
}export default CustomerReg
