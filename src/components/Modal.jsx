
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ReactTextareaAutosize from 'react-textarea-autosize';
import { toast } from 'sonner';

const Modal = ({ showModal, closeModal }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(name.trim().length === 0 || description.trim().length === 0);
    }, [name, description]);

    const addStack = async () => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/add_stack`,
            {
                name,
                description,
                user_id: localStorage.getItem("user_id")
            }
        )
        closeModal();
        if (res.data.status == "success") {
            toast.success("Stack added successfully");
        } else {
            toast.error("Could not add stack");
        }
    }

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="my-modal ${showModal ? 'block' : 'hidden'}`}>
            <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Stack</h3>
                    <div className="mt-2 px-7 py-3">
                        <input className="mb-3 px-3 py-2 border rounded w-full" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        <ReactTextareaAutosize className="px-3 py-2 border rounded w-full" placeholder="Description" onChange={(e) => setDescription(e.target.value)} ></ReactTextareaAutosize>
                    </div>
                    <div className="items-center px-4 py-3 flex justify-between">
                        <button className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 focus:outline-none" onClick={closeModal}>Cancel</button>
                        <button className={`px-4 py-2 ${isButtonDisabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'} rounded focus:outline-none`} onClick={addStack} disabled={isButtonDisabled}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
