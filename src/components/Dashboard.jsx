import React, { useEffect, useState } from 'react';
import StackCard from './StackCard';
import Modal from './Modal';
import axios from 'axios';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stacks, setStacks] = useState([]);

    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        if (!user_id) {
            navigate("/login");
        }
        const getStack = async () => {
            try {
                const user_id = localStorage.getItem("user_id");
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/get_stacks`, {
                    params: {
                        user_id: user_id
                    }
                });
                if (res.data.status === 'success') {
                    setStacks(res.data.stacks);
                }
            } catch (error) {
                console.error("Error fetching stacks:", error);
            }
        }
        getStack();
    }, [isModalOpen]);

    const handleNewStackClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-[#F9FAFC] h-screen p-4">
            <NavBar />
            <div className=" p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold text-gray-700">My Stacks</h1>
                    <button onClick={handleNewStackClick} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none">
                        + New Stack
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-6">
                    {stacks.map((stack) =>
                        <StackCard key={stack.id} title={stack.name} description={stack.description} stackid={stack.id} />
                    )}
                </div>
            </div>
            {stacks.length === 0 && (
                <div className="flex justify-center items-center">
                    <div className="bg-white rounded-2xl border shadow border-gray-300 p-6">
                        <div className="mb-4">
                            <div className="text-gray-900 font-bold text-xl mb-2">Create New Stack</div>
                            <p className="text-gray-700 text-base">Start building your generative AI apps with our essential tools and frameworks</p>
                        </div>
                        <div className="text-center">
                            <button onClick={handleNewStackClick} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                                + New Stack
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpen && <Modal showModal={isModalOpen} closeModal={handleCloseModal} />}
        </div>
    );
};

export default Dashboard;
