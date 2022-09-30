import React,{useState} from 'react';
 import './user.css'
 var axios = require('axios');
function Info (props){
    const [userData,setUserdata]=useState(props.user);
    const path = window.location.href;
    const handleOnChange = event => {
        const { name, value } = event.target;
        setUserdata({...userData, [name]: value });
      };

      const UpdateUser=()=>{
        console.log(path.split('=')[1]);
        var config = {
        method: 'put',
        url: 'http://localhost:3000/user/update',
        headers: { 
          'Authorization': 'Bearer '+path.split('=')[1]
        },
        data:userData
      };      
      axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error); window.open('http://localhost:4000',"_self");
      });
     
      }  

     const  DeleteUser=()=>{
        var config = {
            method: 'delete',
            url: 'http://localhost:3000/user/delete',
            headers: { 
              'Authorization': 'Bearer '+path.split('=')[1]
            },
          };
        
          axios(config)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
           window.open('http://localhost:4000',"_self");
          });
          window.open("http://localhost:4000","_self");

     }
  return (
    <div>
      
      
      <label className='userid'> userId:
<input
        type="number"
        id="userid"
        name="id"
        
        value={userData.id}
      />
 </label>
 
 <label className='username'> Name:
<input
        type="text"
        id="name"
        name="name"
        value={userData.name}
        onChange={handleOnChange}
      />
 </label>
 <label className='usernumber'> Mobile:
<input
        type="text"
        id="mobile"
        name="mobile"
        value={userData.mobile}
        onChange={handleOnChange}
      />
 </label>
 <label className='useremail'> Email:
<input
        type="text"
        id="email"
        name="email"
        value={userData.email}
        onChange={handleOnChange}
      />
 </label>
    
  
  <button className="update" onClick={() => UpdateUser()}>
  Update
</button> 
<button className="delete" onClick={() => DeleteUser()}>
  Delete
</button> 
</div>
 
  )
}
export default Info;