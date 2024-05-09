import React from 'react'
import { useNavigate } from 'react-router-dom'

const EditStackNavBar = ({ nodes, edges }) => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/dashboard")
    }
    return (
        <div>
            <div className="flex items-center justify-between bg-white p-4 shadow-md">
                <div className="flex items-center space-x-4">
                    <button onClick={onClick} className="font-bold text-xl">GenAI Stack</button>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm">
                        Save
                    </button>
                    <button className="bg-green-500 text-white p-2 rounded-full shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditStackNavBar
