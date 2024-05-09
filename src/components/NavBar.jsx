import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/user/${localStorage.getItem("user_id")}`
            );
            if (res.data.status === 'success') {
                setUser(res.data.user)
            }
        }
        getUser();
    }, [])

    const onClick = () => {
        navigate("/dashboard")
    }
    return (
        <div>
            <div className="flex items-center justify-between bg-[#F9FAFC] p-4">
                <div className="flex items-center space-x-4">
                    <button onClick={onClick} className="font-bold text-xl">GenAI Stack</button>
                </div>
                <div className="flex items-center space-x-4">
                    <img className='w-8 h-8 rounded-2xl' src={user.picture}></img>
                </div>
            </div>
            <div className="border-b border-gray-300"></div>

        </div>
    )
}

export default NavBar
