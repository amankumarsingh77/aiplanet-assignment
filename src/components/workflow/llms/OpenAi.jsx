import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const OpenAi = () => {
    const [maxTokens, setMaxTokens] = useState(256);
    const [apiBase, setApiBase] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [temperature, setTemperature] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Max Tokens:', maxTokens);
        console.log('API Base:', apiBase);
        console.log('API Key:', apiKey);
        console.log('Temperature:', temperature);
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <Handle type="target" position={Position.Left} />
            <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-bold mb-2">OpenAI 3.5</h2>
                <p className="mb-4">OpenAI large language models.</p>

                <div className="mb-2">
                    <label htmlFor="maxTokens" className="block font-medium mb-1">
                        Max Tokens
                    </label>
                    <input
                        type="number"
                        id="maxTokens"
                        value={maxTokens}
                        onChange={(e) => setMaxTokens(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="apiBase" className="block font-medium mb-1">
                        OpenAI API Base
                    </label>
                    <input
                        type="text"
                        id="apiBase"
                        placeholder="Type something"
                        value={apiBase}
                        onChange={(e) => setApiBase(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="apiKey" className="block font-medium mb-1">
                        OpenAI API Key
                    </label>
                    <input
                        type="password"
                        id="apiKey"
                        placeholder="Type something"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="temperature" className="block font-medium mb-1">
                        Temperature
                    </label>
                    <input
                        type="text"
                        id="temperature"
                        placeholder="Type something"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    OpenAI
                </button>
            </form>
            <Handle type="source" position={Position.Right} />
        </div>
    );
};

export default OpenAi;