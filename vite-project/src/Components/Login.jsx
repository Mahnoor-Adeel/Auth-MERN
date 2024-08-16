import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
function Login(){
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const {email, password} = loginInfo;
        if(!email || !password){
            return handleError('All fields are required.');
        }
        
        try{
            console.log("ebhc34");
            const url ='https://auth-mern-backend-pi.vercel.app/auth/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const {success, message, jwtToken, name, error} = result;
            if(success){
                console.log(message);
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(()=>{
                    navigate('/home')
                }, 1000)
            }
            else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }
            else if(!success){
                handleError(message);
            }
            console.log(result, "db3if");
        }
        catch(err){
            handleError(err);
        }
    };
    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>    
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={handleChange} 
                    type="text" 
                    name="email" 
                    autoFocus 
                    placeholder="Enter your Email Address"
                    value={loginInfo.email}
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
                    value={loginInfo.password}
                />                    
                </div>
                <button type='submit'>Log In</button>
                <span>Doesn't have an Account?
                    <Link to="/signup">Sign Up</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}
export default Login;
