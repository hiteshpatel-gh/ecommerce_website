import React,{useState,useEffect} from "react";
import axios from "axios";
import styles from "./CityMgt.module.css"
function CityMgt()
{
    const[stid,setStId]=useState();
    const[ctid,setCtId]=useState();
    const[ctname,setCtName]=useState();
    const[status,setStatus]=useState();
    const[ctlist,setCtList]=useState([]);
    const[stlist,setStList]=useState([]);
    var statename=""

    const handleCtIdText=(evt)=>{
        setCtId(evt.target.value);
    }
    const handleCtNameText=(evt)=>{
        setCtName(evt.target.value);
    }
    const handleStIdSelect=(evt)=>{
        // alert(evt.target.value)
        setStId(evt.target.value)
    }
    const handleStatusText=(evt)=>{
        setStatus(evt.target.value);
    }
    
    //handle page load event or this function will be called automatically at the time of page load
    useEffect(()=>{
            axios.get("http://localhost:9669/state/show").then((res)=>{
                setStList(res.data)
     
             }).catch((err)=>{
                 alert(err);
             })
        },[])


    const handleAddNewButton=()=>{
        axios.get("http://localhost:9669/city/getall").then((res)=>{
            setCtId(res.data.length+1);
            setStatus(1)
        }).catch((err)=>{
            alert(err);
        })
    }    

    const handleSaveButton = () => {
        if (
          ctid == "" ||
          ctid == undefined ||
          ctname == "" ||
          ctname == undefined ||
          stid == "" ||
          stid == undefined ||
          status == "" ||
          status == undefined
        ) {
          alert("Please Fill All Fields");
          return;
        } else {
          axios
            .get("http://localhost:9669/city/searchbyname/" + ctname)
            .then((res) => {
              if (res.data.ctname != undefined) {
                alert("City name alrady exist");
              } else {
                const obj = {
                  ctid: ctid,
                  ctname: ctname,
                  stid: stid,
                  status: status,
                };
                axios
                  .post("http://localhost:9669/city/save/", obj)
                  .then((res) => {
                    alert(res.data);
                    setCtId(" ");
                    setCtName("");
                    setStId(" ");
                    setStatus(" ");
                  })
                  .catch((err) => {
                    alert(err);
                  });
              }
            })
            .catch((err) => {
              alert(err);
            });
        };
      };
    
     
      const handleShowButton = () => {
        axios
          .get("http://localhost:9669/city/getall")
          .then((res) => {
            setCtList(res.data);
          })
          .catch((err) => {
            alert(err);
          });
      };

    //search city
    const handleSearchButton=()=>{
        if(ctid!=undefined && ctid!=""){	

            axios.get("http://localhost:9669/city/search/"+ctid).then((res)=>{
                if(res.data.stid!=undefined)
                    {
                        setCtId(res.data.stid);
                        setCtName(res.data.ctname);
                        setStId(res.data.stid);
                        setStatus(res.data.status);
                    }else{
                        alert("Data Not Found");
                    }
                    }).catch((err)=>{
                        alert(err);
                    })
                }
                else{
                    alert("Please Fill City Id to Search");
                }
            }

    if(ctname!=undefined && ctname!=""){
        axios.get("http://localhost:9669/city/searchbyname/"+ctname).then((res)=>{
            if(res.data.stid!=undefined)
            {
            setCtId(res.data.stid);
            setCtName(res.data.ctname);
            setStId(res.data.stid);
            setStatus(res.data.status);
            }
        }).catch((err)=>{
            alert(err);
        })
    }

    //update city
    const handleUpdateButton=()=>{
        if(ctid==""||ctid==undefined||ctname==""||ctname==undefined||status==""||status==undefined){
            alert("Please Fill All the Details");
            return;
        }
        else{

            var obj={
                ctid:ctid,
                ctname:ctname,
                status:status
            };
            axios.put("http://localhost:9669/city/update",obj).then((res)=>{
                alert(res.data);
                setCtId("");
                setCtName("");
                setStId("");
                setStatus("");
            }).catch((err)=>{
                alert(err);
            });
        }
    }
    const handleDeleteButton=()=>{
        if(ctid!==""&& ctid!==undefined){
          
            axios.delete("http://localhost:9669/city/delete/"+ctid).then((res)=>{
                alert(res.data);
                
            }).catch((err)=>{
                alert(err);
            })
        }
        else{
            alert("Please Fill State Id to Delete");
        }
    }
    const handleShowAllButton=()=>{
        axios.get("http://localhost:9669/city/show").then((res)=>{
           setCtList(res.data);

        }).catch((err)=>{
            alert(err);
        })
    }
    //code to set City Id Automatically
    // useEffect(()=>{
    //     axios.get("http://localhost:9669/city/show").then((res)=>{
    //         setCtId(res.data.length+1)
 
    //      }).catch((err)=>{
    //          alert(err);
    //      })
    // },[])
    return(
  <div className={styles.container}>
  <center>
    <h4 className={styles.heading}>City Management</h4>
    
    <div className={styles.myDiv1}>
      <table className={styles.table}>
        <tr>
          <td>City Id</td>
          <td>
            <input type="number" value={ctid} onChange={handleCtIdText} className={styles.formControl} />
          </td>
        </tr>
        <tr>
          <td>City Name</td>
          <td>
            <input type="text" value={ctname} onChange={handleCtNameText} className={styles.formControl} />
          </td>
        </tr>
        
        <tr>
          <td>State Name</td>
          <td>
            <select onClick={handleStIdSelect} id="stdropdown" name="stateddl" className={styles.formControl}>
              {
                stlist.map((item) => (
                  <option value={item.StId} key={item.StId}>{item.StName}</option>
                ))
              }
            </select>
          </td>
        </tr>
        <tr>
          <td>Status</td>
          <td>
            <input type="text" value={status} onChange={handleStatusText} className={styles.formControl} />
          </td>
        </tr>
      </table>
      
      <table className={styles.buttonTable}>
        <tr>
          <td><button type="submit" onClick={handleAddNewButton} className={styles.button}>New</button></td>
          <td><button type="submit" onClick={handleSaveButton} className={styles.button}>Save</button></td>
          <td><button type="submit" onClick={handleShowAllButton} className={styles.button}>Show</button></td>
          <td><button type="submit" onClick={handleSearchButton} className={styles.button}>Search</button></td>
          <td><button type="submit" onClick={handleUpdateButton} className={styles.button}>Update</button></td>
          <td><button type="submit" onClick={handleDeleteButton} className={styles.button}>Delete</button></td>
        </tr>
      </table>
    </div>

    <div className={styles.myDiv2}>
      <center>
        <table className={styles.table}>
          <tr>
            <th>City Id</th>
            <th>City Name</th>
            <th>State Name</th>
            <th>Status</th>
          </tr>
          {
  ctlist.map((item) => {
    const statename = stlist.find(stitem => String(stitem.StId) === String(item.stid))?.StName || 'N/A';

    return (
      <tr key={item.ctid}> 
        <td>{item.ctid}</td>
        <td>{item.ctname}</td>
        <td>{statename}</td>
        <td>
          {item.status === 1 ? (
            <h5 className={styles.statusEnabled}>enabled</h5>
          ) : (
            <h5 className={styles.statusDisabled}>disable</h5>
          )}
        </td>
      </tr>
    );
  })
}


        </table>
      </center>
    </div>
  </center>
</div>

      
    );
}export default CityMgt;