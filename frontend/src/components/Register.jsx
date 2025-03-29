import React, { useState } from 'react'
import banner from '../assets/banner1.png'
import 'boxicons'
import { Link, useNavigate } from "react-router-dom"
import { useCreateUserMutation } from '../slices/userSlice'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUser] = useCreateUserMutation();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state)=> state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUser({ name, email, password })
        toast('Resistered successfully', { position: 'top-center' })
        navigate('/login');
        setName('');
        setEmail('');
        setPassword('');
    }
    useEffect(()=>{
                if(userInfo){
                    navigate('/');
                }
            },[])
    return (
        <main className='bg-gray-200    min-h-screen pt-17'>
            <div className='flex justify-evenly bg-white shadow-xl w-200 h-110 m-auto  rounded-xl'>
                <form onSubmit={handleSubmit} className='flex justify-evenly flex-col p-10'>
                    <h1 className='text-2xl font-bold'>Sign up</h1>
                    <span><box-icon class="w-8 h-5" name='user'></box-icon><input onChange={(e) => setName(e.target.value)} value={name} type="text" required className='border-b outline-none border-gray-300 w-70' placeholder='Your name' /></span>
                    <span><box-icon class="w-8 h-5" type='solid' name='envelope'></box-icon><input onChange={(e) => setEmail(e.target.value)} value={email} type="text" required className='outline-none border-b w-70  border-gray-300' placeholder='Your email' /></span>
                    <span><box-icon class="w-8 h-5" name='lock-open-alt' type='solid' ></box-icon><input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required className='outline-none border-b w-70  border-gray-300' placeholder='Your password' /></span>
                    <p className='text-sm'><label><input type="checkbox" className='accent-white border' /></label>  I agree all statements in Terms of Service</p>
                    <button className='border p-2 bg-sky-600 text-white rounded-md'>Register</button>
                    <p>Already have an account?  <Link to='/login' className='text-cyan-700'>Login</Link></p>
                </form>
                <div className=' rounded-s-4xl w-100 flex justify-center items-center rounded-r-sm '><img src={banner} alt="banner image" className='h-90   ' /></div>

            </div>
        </main>
    )
}

export default Register
