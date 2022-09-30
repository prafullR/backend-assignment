import React,{useState} from "react";
import ReactDOM from "react-dom";
import { Heading } from "./component"; 
import MadeWithLove from 'react-made-with-love';
import "./index.css";
import Info from "./user";
import LoginMOBEmail from "./login";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
var axios = require('axios');



 function App() {
  const [userData,setUserdata]=useState(null)
  const [other,setOther]=useState(false);
  const path = window.location.href;
  let GoogleLoginbutton,FBLoginbutton;
  let isLoggedIn=false;
  let button,GetButton,user ;
if(path.length>25)
{
isLoggedIn=true;
}
 
  if (!isLoggedIn) {
    FBLoginbutton = <FacebookLoginButton onClick={() => handleClick('http://localhost:3000/facebook')} />;
    GoogleLoginbutton = <GoogleLoginButton onClick={()=>handleClick('http://localhost:3000/google')} />
  }
 if(isLoggedIn){
  button =<button className="logoutButton" onClick={()=>logOut()}>
  Logout
</button>
GetButton =<button className="getButton" onClick={()=>getUser()}>
GetUser
</button>

 }

 const logOut=()=>{
  if(path.split('=').length<2) console.log("Not login");
  var config = {
  method: 'post',
  url: 'http://localhost:3000/user/logout',
  headers: { 
    'Authorization': 'Bearer '+ path.split('=')[1]
  },

};
axios(config)
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});
window.open('http://localhost:4000',"_self")
}
  
const getUser=()=>{
  console.log(path.split('=')[1]);
  var config = {
  method: 'get',
  url: 'http://localhost:3000/user/me',
  headers: { 
    'Authorization': 'Bearer '+path.split('=')[1]
  },

};


axios(config)
.then(function (response) {
  console.log(response.data);
  setUserdata(response.data);
})
.catch(function (error) {
  console.log(error);
});

}    
  
const handleClick = url => {
window.open(url,"_self");
  };

  return (
   
     <div className="app">
      <Heading />

      <div className="parent">
         {button}
         <div className="buttonp">
         {GetButton}
         </div>
         </div>
        {GoogleLoginbutton}
         {FBLoginbutton}    
       { !other && !isLoggedIn&& <button className="other" onClick={()=>setOther(true)}>
  Other Options
</button>}
{other && <LoginMOBEmail/>}
       <div>
        { userData && <Info user={userData}/>}
       </div>
   <div className="love">
  <MadeWithLove 
  by="Prafull"
  emoji/></div>
</div>
      
        
      
  );
  }

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);