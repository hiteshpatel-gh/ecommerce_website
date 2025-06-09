import React,{useState,useEffect} from "react";
import axios from "axios";
import styles from "./StateMgt.module.css"

function StateMgt()
{
    const[stid,setStId]=useState();
    const[stname,setStName]=useState();
    const[status,setStatus]=useState();
    const[stlist,setStList]=useState([]);
    
    const handleStIdText=(evt)=>{
        setStId(evt.target.value);
    }
    const handleStNameText=(evt)=>{
        setStName(evt.target.value);
    }
    const handleStatusText=(evt)=>{
        setStatus(evt.target.value);
    }

    const handleSaveButton=()=>{
        var obj={
            StId:stid,
            StName:stname,
            Status:status
        };
        axios.post("http://localhost:9669/state/save",obj).then((res)=>{
          alert(res.data);
        }).catch((err)=>{
            alert(err);
        });
    }
    //search state
    const handleSearchButton=()=>{

        axios.get("http://localhost:9669/state/search/"+stid).then((res)=>{
            if(res.data.StId!=undefined)
            {
            setStId(res.data.StId);
            setStName(res.data.StName);
            setStatus(res.data.Status);
            }else{
                alert("Data Not Found");
            }
        }).catch((err)=>{
            alert(err);
        })
    }
    //update state
    const handleUpdateButton=()=>{
        var obj={
            StId:stid,
            StName:stname,
            Status:status
        };
        axios.put("http://localhost:9669/state/update",obj).then((res)=>{
          alert(res.data);
        }).catch((err)=>{
            alert(err);
        });
    }
    const handleDeleteButton=()=>{
        axios.delete("http://localhost:9669/state/delete/"+stid).then((res)=>{
            alert(res.data);

        }).catch((err)=>{
            alert(err);
        })
    }
    const handleShowAllButton=()=>{
        axios.get("http://localhost:9669/state/show").then((res)=>{
           setStList(res.data);

        }).catch((err)=>{
            alert(err);
        })
    }
    //code to set State Id Automatically
    useEffect(()=>{
        axios.get("http://localhost:9669/state/show").then((res)=>{
            setStId(res.data.length+1)
 
         }).catch((err)=>{
             alert(err);
         })
    },[])
    return(
    

      <div className={styles.container}>
      <div>
        <h4 className={styles.heading}>Manage State</h4>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>State Id</td>
              <td>
                <input type="text" value={stid} onChange={handleStIdText} className={styles.inputField} />
              </td>
            </tr>
            <tr>
              <td>State Name</td>
              <td>
                <input type="text" value={stname} onChange={handleStNameText} className={styles.inputField} />
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                <select onClick={handleStatusText} className={styles.selectField}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
    
        <table className={styles.buttonTable}>
          <tbody>
            <tr>
              <td><button onClick={handleSaveButton} className={styles.button}>Save</button></td>
              <td><button onClick={handleSearchButton} className={styles.button}>Search</button></td>
              <td><button onClick={handleUpdateButton} className={styles.button}>Update</button></td>
              <td><button onClick={handleDeleteButton} className={styles.button}>Delete</button></td>
              <td><button onClick={handleShowAllButton} className={styles.button}>Show</button></td>
            </tr>
          </tbody>
        </table>
    
        {/* List of State Heading */}
        <p className={styles.listHeading}>List of State</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>State Id</th>
              <th>State Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stlist.map((item, index) => (
              <tr key={index}>
                <td>{item.StId}</td>
                <td>{item.StName}</td>
                <td>{item.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    );
}export default StateMgt;