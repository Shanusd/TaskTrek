import React, { useState } from 'react'
import banner from '../assets/banner1.png'
import 'boxicons'
import { Link, useNavigate } from "react-router-dom"
import { useAuthUserMutation } from '../slices/userSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setCredentials } from '../slices/authSlice'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser] = useAuthUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } =useSelector((state)=> state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await loginUser({ email, password }).unwrap()
            console.log(response);

            await dispatch(setCredentials({...response}))
            toast('Logged successfully', {position:'top-center'})
            navigate('/'); 
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error("Login failed:", error);
        }
    }
     
    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[])

    return (
        <main className='bg-gray-200 min-h-screen pt-17'>
            <div className='flex justify-evenly bg-white shadow-xl w-200 h-110 m-auto rounded-xl'>
                <div className='rounded-e-4xl w-100 flex justify-center items-center rounded-l-lg'>
                    <img src={banner} alt="banner image" className='h-90' />
                </div>
                <form onSubmit={handleSubmit} className='flex justify-evenly flex-col p-10'>
                    <h1 className='text-2xl font-bold'>Login</h1>
                    <span>
                        <box-icon className="w-8 h-5" type='solid' name='envelope'></box-icon>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="text"
                            required
                            className='outline-none border-b w-70 border-gray-300'
                            placeholder='Your email'
                        />
                    </span>
                    <span>
                        <box-icon className="w-8 h-5" name='lock-open-alt' type='solid'></box-icon>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            required
                            className='outline-none border-b w-70 border-gray-300'
                            placeholder='Your password'
                        />
                    </span>
                    <p className='text-sm'>
                        <label><input type="checkbox" className='accent-white border' /></label> I agree all statements in Terms of Service
                    </p>
                    <button className='border p-2 bg-sky-600 text-white rounded-md'>Login</button>
                    <p>Don't have an account? <Link to='/register' className='text-cyan-700'>Sign up</Link></p>
                </form>
            </div>
        </main>
    )
}

export default Login;
