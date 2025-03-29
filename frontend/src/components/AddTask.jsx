import 'boxicons';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateTodoMutation } from '../slices/todoSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutUserMutation } from '../slices/userSlice';

const AddTask = ({ getTodos }) => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [createTodo] = useCreateTodoMutation();
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const addTodo = async (e) => {
        e.preventDefault();
        try {
            await createTodo({ title: task, description, userId: userInfo._id });
            toast.success("Task added successfully", { position: 'top-left' });
            getTodos();
            setTask("");
            setDescription("");
        } catch (error) {
            console.log(error);
        }
    };

    const Logout = async () => {
        try {
            await logoutUser().unwrap();
            await dispatch(logout());
            navigate('/login');
        } catch (error) {
            toast.error(error.message, { position: 'bottom-center' });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="relative w-96 p-8 rounded-2xl shadow-xl border border-gray-700 text-white 
                bg-white/10 backdrop-blur-md animate-slide-in overflow-hidden">
                
                {/* Floating Light Effects INSIDE the main div */}
                <div className="absolute w-52 h-52 bg-blue-500 opacity-30 rounded-full blur-3xl top-[-30px] left-[-30px] animate-float"></div>
                <div className="absolute w-44 h-44 bg-purple-500 opacity-30 rounded-full blur-3xl bottom-[-30px] right-[-30px] animate-float-reverse"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold tracking-wide">TaskTrek</h1>
                        <button 
                            onClick={Logout} 
                            className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 hover:scale-105"
                        >
                            Logout
                        </button>
                    </div>

                    <form onSubmit={addTodo} className="animate-fade-in">
                        <div className="mb-5">
                            <label htmlFor="task" className="block font-medium mb-2">
                                Task Name
                            </label>
                            <input
                                type="text"
                                id="task"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-lg hover:scale-105"
                                placeholder="Enter task name..."
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="description" className="block font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-lg hover:scale-105"
                                placeholder="Enter task details..."
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-blue-600 opacity-0 transition-all duration-300 hover:opacity-20"></span>
                                + Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Custom Animation Styles */}
            <style>
                {`
                @keyframes slide-in {
                    0% { opacity: 0; transform: translateY(-50px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(20px); }
                    100% { transform: translateY(0px); }
                }

                @keyframes float-reverse {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }

                .animate-slide-in {
                    animation: slide-in 0.6s ease-out;
                }

                .animate-fade-in {
                    animation: fade-in 1s ease-in-out;
                }

                .animate-float {
                    animation: float 4s infinite ease-in-out;
                }

                .animate-float-reverse {
                    animation: float-reverse 4s infinite ease-in-out;
                }
                `}
            </style>
        </div>
    );
};

export default AddTask;
