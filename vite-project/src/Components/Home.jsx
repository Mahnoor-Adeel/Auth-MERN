import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import { ToastContainer } from "react-toastify";
import './Home.css';

function Home(){
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    },[])
    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInuser');
        handleSuccess('User Logged Out')
        setTimeout(()=>{
            navigate('/login');
        }, 1000);
    }

    return (
        <div  className="Hero py-4">
            <div>
                <nav className="mx-10 flex flex-row justify-between">
                    <a className="text-2xl font-semibold text-white font-times">MNTN</a>
                    <ul className="basis-4/12 flex flex-row justify-between font-semibold font-calibri text-white">
                        <li><a href="">Equipment</a></li>
                        <li><a href="">About us</a></li>
                        <li><a href="">Blog</a></li>
                    </ul>
                    <a className="font-semibold text-white"><FontAwesomeIcon className='mr-3' icon={faUser} onClick={handleLogout}/>{loggedInUser}</a>
                </nav>
                <div className="flex flex-row justify-between mt-32">
                    <div>
                        <div className="flex flex-col ml-10 mt-6">
                            <p className="text-white text-xl font-calibri rotate-90 font-medium ml-2 mb-6">Follow us</p>
                            <FontAwesomeIcon className="mt-8 ml-2 text-white rotate-90"icon={faInstagram} />
                            <FontAwesomeIcon className="mt-8 ml-2 text-white rotate-90"icon={faTwitter} />
                        </div>
                    </div>
                    <div className="basis-6/12">
                        <div className="flex flex-row">
                            <hr className="border-t-2 border-yellow-200 w-10 mt-3 mr-2"/>
                            <h4 className="font-mono text-yellow-200"> A HIKING GUIDE</h4>
                        </div>
                        <h1 className="text-7xl text-white font-times">Be prepared for the mountains and beyond</h1> 
                        <div className="flex flex-row">   
                        <p className="text-white text-lg font-calibri mt-6">scroll down</p><FontAwesomeIcon className="mt-8 ml-2 text-white"icon={faArrowDown} />      
                        </div>                
                    </div>
                    <div>
                    <div className="flex flex-col mr-10 mt-6 scroller">
                            <ul className="text-white font-medium h-40 flex flex-col ">
                                <li className="border-yellow-100 border-r-2">Start</li>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                <h1 className="">Welcome {loggedInUser}!</h1>
                <button onClick={handleLogout}>Logout</button>
                <ToastContainer />
            </div> */}
        </div>
        
    )
}
export default Home;