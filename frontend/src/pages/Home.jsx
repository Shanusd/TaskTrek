import 'boxicons';
import AddTask from '../components/AddTask';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useDeleteTodoMutation, useGetTodosQuery } from '../slices/todoSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Home = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { data: todos, refetch, isLoading } = useGetTodosQuery({ userId: userInfo?._id });
    const [deleteTodo] = useDeleteTodoMutation();
    const navigate = useNavigate();

    const deleteTodoHandler = async (id) => {
        try {
            await deleteTodo(id);
            toast.success("Task deleted successfully", { position: 'top-right' });
            refetch();
        } catch (error) {
            toast.error(error.message, { position: 'bottom-center' });
        }
    };

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, []);

    return (
        <div className="relative md:flex-row  flex flex-col justify-between items-center min-h-screen bg-gray-900 text-white px-10 overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-90"></div>

            {/* Floating Light Effects */}
            <div className="absolute w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl top-10 left-20 animate-float"></div>
            <div className="absolute w-64 h-64 bg-purple-500 opacity-30 rounded-full blur-3xl bottom-10 right-20 animate-float-reverse"></div>

            <AddTask getTodos={refetch} />

            <div className="mt-10 z-10 w-full max-w-3xl">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {todos?.length > 0 ? (
                            <ul className="space-y-5">
                                {todos.map((item) => (
                                    <li
                                        key={item._id}
                                        className="bg-white/10 backdrop-blur-lg p-6 h-35 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                                            <p className="text-sm text-gray-300">{item.description}</p>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <p className="text-sm font-medium text-gray-400">
                                                Status: <span className="text-green-400 font-semibold">{item.status}</span>
                                            </p>
                                            <div className="flex gap-3">
                                                <button
                                                    className="p-2 rounded-lg bg-blue-500 text-white shadow hover:bg-blue-600 transition-all hover:scale-110"
                                                    onClick={() => navigate(`/edit/${item._id}`)}
                                                >
                                                    <box-icon type="solid" name="edit" color="white" />
                                                </button>
                                                <button
                                                    className="p-2 rounded-lg bg-red-500 text-white shadow hover:bg-red-600 transition-all hover:scale-110"
                                                    onClick={() => deleteTodoHandler(item._id)}
                                                >
                                                    <box-icon type="solid" name="trash" color="white" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-col items-center bg-white/10 p-6 rounded-xl shadow-lg animate-fade-in backdrop-blur-lg">
                                <p className="text-2xl font-bold text-gray-300">No Tasks Available</p>
                                <p className="text-gray-400 mt-2">Start adding tasks to track your work.</p>
                            </div>
                        )}
                    </>
                )}
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

                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
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

                .animate-gradient {
                    background-size: 300% 300%;
                    animation: gradient 6s ease infinite;
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

export default Home;
