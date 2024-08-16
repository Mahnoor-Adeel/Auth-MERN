import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import axios from 'axios'
function Signup(){
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    };

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const {name, email, password} = signupInfo;
        if(!name || !email || !password){
            return handleError('All fields are required.');
        }
        
        try{
            console.log("ebhc34");
            const url ='https://auth-mern-backend-pi.vercel.app/auth/signup';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const {success, message} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
                }, 1000)
            }
            else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }
            else if(!success){
                handleError(message);
            }
            console.log(result);
        }
        catch(err){
            handleError(err);
        }
    };
    return (
        <div className="container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                    onChange={handleChange} 
                    type="text" 
                    name="name" 
                    autoFocus 
                    placeholder="Enter your name"
                    value={signupInfo.name}
                    />                    
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={handleChange} 
                    type="text" 
                    name="email" 
                    autoFocus 
                    placeholder="Enter your Email Address"
                    value={signupInfo.email}
                />                    
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={handleChange} 
                    type="password" 
                    name="password" 
                    autoFocus 
                    placeholder="Enter your password"
                    value={signupInfo.password}
                />                    
                </div>
                <button type='submit'>SignUp</button>
                <span>Already have an Account?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}
export default Signup;
