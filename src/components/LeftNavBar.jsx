import React, { useState } from 'react'
import navItems from '../constants/leftnavbar';

const LeftNavBar = ({ stack }) => {
    const [activeItem, setActiveItem] = useState(null);
    const handleItemClick = (index) => {
        setActiveItem(activeItem === index ? null : index);
    };

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="w-64 bg-white p-4 shadow-md">
            <div className="mb-4">
                <div className=" flex items-center border rounded-lg p-3 justify-between cursor-pointer">
                    <h2 className="font-bold ">{stack.name}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
            {navItems.map((item, index) => (
                <div key={index} className="mb-4">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => handleItemClick(index)}
                    >
                        <h2 className=" p-1">{item.name}</h2>
                        {activeItem === index ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9l6 6 6-6" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                        )}
                    </div>
                    {activeItem === index && (
                        <ul className="mt-1">
                            {item.items.map((subItem, subIndex) => (
                                <li key={subIndex} className="p-1">
                                    <button
                                        onDragStart={(event) => onDragStart(event, subItem.type)}
                                        className='border-gray-200 border rounded-lg max-w-44 w-full cursor-grab flex items-center justify-between p-2 overflow-hidden'

                                        draggable
                                    >
                                        <p className='text-xs overflow-hidden whitespace-nowrap overflow-ellipsis'>{subItem.name}</p> {/* Added overflow-hidden and whitespace-nowrap */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#94a3b8]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </aside>
    )
}

export default LeftNavBar
