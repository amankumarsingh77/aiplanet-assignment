import React from 'react';
import { useNavigate } from 'react-router-dom';

const StackCard = ({ title, description, stackid }) => {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/editstack/${stackid}`)
    }
    return (
        <div className="bg-white p-6 rounded-lg border border-[#E4E8EE] flex flex-col">
            <div>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>
            <div className="text-[#0F172A] text-xs mt-2 hover:text-blue-700 focus:outline-none flex items-center justify-end">
                <button onClick={handleEdit} className='flex gap-2 p-1.5 border border-gray-200 rounded-md '>
                    <p>
                        Edit Stack
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default StackCard;
