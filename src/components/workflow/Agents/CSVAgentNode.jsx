import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';


const CSVAgentNode = memo(({ data }) => {
    const [llm, setLLM] = useState('');
    const [path, setPath] = useState('');
    const [file, setFile] = useState(null);

    const handleLLMChange = (e) => {
        setLLM(e.target.value);
    };

    const handlePathChange = (e) => {
        setPath(e.target.value);
    };

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile && uploadedFile.type === 'text/csv') {
            setFile(uploadedFile);
        } else {
            setFile(null);
            alert('Please upload a CSV file.');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-80">
            <div className="flex items-center mb-4">
                <Handle type="target" position={Position.Left} />
                <div className='flex gap-3'>
                    <FontAwesomeIcon icon={faFileCsv} />
                    <p className='text-[#151924] text-sm'>CSVAgent</p>
                </div>
                <Handle type="source" position={Position.Right} />

            </div>
            <p className="text-sm text-[#666666] mb-2">Construct a CSV agent from a CSV and tools.</p>
            <div className="mb-2">
                <label htmlFor="llm" className="block text-gray-700 font-bold mb-1">
                    LLM
                </label>
                <input
                    id="llm"
                    type="text"
                    value={llm}
                    onChange={handleLLMChange}
                    className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div>
                <label htmlFor="file" className="block text-gray-700 font-bold mb-1">
                    Path
                </label>
                <input
                    id="file"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
        </div>
    );
});

export default CSVAgentNode;