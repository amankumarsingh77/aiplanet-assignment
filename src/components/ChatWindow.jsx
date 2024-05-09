import React, { useState } from 'react';
import aiplanet from '../assets/aiplanet.png'
import human from '../assets/human.png'
import robot from '../assets/robot.png'
const ChatWindow = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (userInput.trim() !== '') {
            setMessages([...messages, { type: 'user', text: userInput.trim() }]);
            setUserInput('');
            // Simulate assistant response
            setTimeout(() => {
                setMessages([
                    ...messages,
                    { type: 'user', text: userInput.trim() },
                    {
                        type: 'assistant',
                        text: 'This is a simulated assistant response.',
                    },
                ]);
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <header className="bg-white text-black py-4 px-6 flex items-center justify-between">
                <img className='w-5 h-5' src={aiplanet}></img>
                <h1 className="text-xl font-semibold">GenAI Stack Chat</h1>
                <button onClick={onClose} className="text-white hover:text-gray-200 focus:outline-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </header>
            <div className="w-full h-0.5 bg-gray-300"></div>

            <main className="flex-grow p-6">
                <div className="bg-white rounded-lg p-4 h-full flex flex-col">
                    <div className="flex-grow overflow-y-auto">
                        {messages.length === 0 && (
                            <div className="flex items-center justify-center h-full">
                                <div>
                                    <div className='flex gap-2 justify-center items-center'>
                                        <img src={aiplanet} className='w-5 h-5 '></img>
                                        <p className='font-bold'>GenAI Stack Chat</p>
                                    </div>
                                    <p className="text-[#666666] text-center">Start a conversation to inspect the chaining process</p>
                                </div>
                            </div>
                        )}
                        {messages.map((message, index) => (
                            <div key={index} className="flex items-start mb-4">
                                {message.type === 'user' ? (
                                    <img className='w-8 h-8 mr-2' src={human}></img>
                                ) : (
                                    <img className='w-8 h-8 mr-2' src={robot}></img>
                                )}
                                <div
                                    className={`p-2 rounded-lg ${message.type === 'user'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-green-100 text-green-800'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 relative">
                        <input
                            type="text"
                            value={userInput}
                            onChange={handleUserInput}
                            className=" m-0 w-full resize-none border rounded-md border-gray-300 bg-transparent  pr-10 md:py-3.5 md:pr-12  max-h-52 placeholder-black/50  pl-4 md:pl-6"
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={handleSendMessage}
                            className="absolute bottom-1.5 right-2 rounded-lg   p-0.5 text-black transition-colors  md:bottom-3 md:right-3"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>

                        </button>
                    </div>
                </div>
            </main>
        </div >
    );
};

export default ChatWindow;
