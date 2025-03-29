import { useNavigate, useParams } from "react-router-dom"
import { useGetTodoByIdQuery, useGetTodosQuery, useUpdateTodoMutation } from "../slices/todoSlice";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const EditTask = () => {
    const {userInfo} = useSelector((state)=> state.auth)
    const [task, setTask] = useState({
        title: "",
        description: '',
        status: false
    })
    const { refetch } = useGetTodosQuery({ userId : userInfo._id})
    const [updateTodo] = useUpdateTodoMutation();
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)
    const { data: item, isLoading } = useGetTodoByIdQuery(id);
    console.log(item)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTodo({ title: task.title, description: task.description, status: task.status, id })
            refetch()
            navigate('/')
        } catch (error) {
            toast.error(error.message, { position: 'bottom-center' })
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevData) => ({
            ...prevData, [name]: value
        }))
    }
    useEffect(() => {
        if (item) {
            setTask({
                title: item.title,
                description: item.description,
                status: item.status ? 'pending' : 'completed'
            })
        }
    }, [item])

    return (
        <div>
            {isLoading ? (<Loader />) : (<>
                <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">TO DO LIST</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="task" className="block text-gray-600 font-medium mb-2">
                                    Task Name
                                </label>
                                <input
                                    type="text"
                                    id="task"
                                    name="title"
                                    value={task?.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="description" className="block text-gray-600 font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={task?.description}
                                    name="description"
                                    onChange={handleChange} rows="4"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-gray-600 font-medium mb-2">
                                    Status
                                </label>
                                <select value={task?.status} name="status" onChange={handleChange} f className="border w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value='completed'>Completed</option>
                                    <option value='pending'>Pending</option>
                                </select>
                            </div><br />

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>)}

        </div>
    )
}

export default EditTask
