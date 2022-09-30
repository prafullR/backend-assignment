import React,{useState} from 'react';
 import './login.css'
 var axios = require('axios');
function LoginMOBEmail (props){
    const [mobileData,setMobileData]=useState({mobile:null,otp:null});
    const [emailData,setEmailData]=useState({email:"example@gmail.com",password:"####"});
    const [signupdto,setSignupDto]=useState({name:"",email:"",password:"",mobile:""});
    const path = window.location.href;
    const handleOnChangeMob = event => {
        const { name, value } = event.target;
        setMobileData({...mobileData, [name]: value });
      };
      const handleOnChangeEmail = event => {
        const { name, value } = event.target;
        setEmailData({...emailData, [name]: value });
      };
      const handleOnChange = event => {
        const { name, value } = event.target;
        setSignupDto({...signupdto, [name]: value });
      };
    let active=true;
      const getOtp=()=>{active=false;
        var config = { 
        method: 'post',
        url: 'http://localhost:3000/user/mobile',
        data:{mobile:mobileData.mobile}
      };      
      axios(config)
      .then(function (response) {
        
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error); window.open('http://localhost:4000',"_self");
      });
     
      }  

     
   
      const submitotp =()=>{
        var config = {
        method: 'post',
        url: 'http://localhost:3000/user/moblogin',
        data:{mobile:mobileData.mobile,otp:mobileData.otp}
      };      
      axios(config)
      .then(function (response) {
        console.log(response.data);
        window.open('http://localhost:4000/?jwt='+response.data,"_self");
      })
      .catch(function (error) {
        console.log(error); window.open('http://localhost:4000',"_self");
      });
     
      }  
      const Siginup =()=>{
        
        var config = {
        method: 'post',
        url: 'http://localhost:3000/user/signup',
        data:{name:signupdto.name,email:signupdto.email,password:signupdto.password
        ,mobile:signupdto.mobile}
      };      
      axios(config)
      .then(function (response) {
        console.log(response.data);
        
      })
      .catch(function (error) {
        console.log(error);
      });
     
      } 
      const login=()=>{
        var config = {
            method: 'post',
            url: 'http://localhost:3000/user/signin',
            data:{email:emailData.email,password:emailData.password}
          };      
          axios(config)
          .then(function (response) {
            window.open('http://localhost:4000/?jwt='+response.data,"_self");
          })
          .catch(function (error) {
            console.log(error);
          });

      }
      
  return (
    <div>
      
      
<label className='mob'> Mobile:
<input
        type="text"
        id="mobile"
        name="mobile"
        onChange={handleOnChangeMob}
        value={mobileData.mobile}
      />
 </label>
 <label className='otp2'> Otp:
<input
        type="text"
        id="otp"
        name="otp"
        onChange={handleOnChangeMob}
        value={mobileData.otp}
      />
 </label>
 <button className="otp" onClick={getOtp} >
  GetOTP
</button>
<button className="otp1" onClick={submitotp} >
  submit
</button>
 
<label className='email'> Email:
<input
        type="text"
        id="email"
        name="email"
        onChange={handleOnChangeEmail}
        value={emailData.email}

      />
 </label>
 <label className='pass'> Password:
<input
        type="text"
        id="password"
        name="password"
        onChange={handleOnChangeEmail}
        value={emailData.password}
      />
 </label>
 <button className="logn" onClick={login}>
  Login
</button>


<label className='id1'> Name:
<input
        type="text"
        id="name"
        name="name"
        onChange={handleOnChange}
        value={signupdto.name}

      />
 </label>
<label className='id2'> Email:
<input
        type="text"
        id="email"
        name="email"
        onChange={handleOnChange}
        value={signupdto.email}

      />
 </label>
 <label className='id3'> Mobile:
<input
        type="text"
        id="mobile"
        name="mobile"
        onChange={handleOnChange}
        value={signupdto.mobile}

      />
 </label>
 <label className='id4'> Password:
<input
        type="text"
        id="password"
        name="password"
        onChange={handleOnChange}
        value={signupdto.password}
      />
 </label>
 <button className="signup"onClick={Siginup}>
  SIgnup
</button>

</div>
 
  )
}
export default LoginMOBEmail;