import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LeftNavBar from './LeftNavBar';
import ReactFlow from './ReactFlow';
import axios from 'axios';
import EditStackNavBar from './EditStackNavBar';

const EditStack = () => {
    const { stackid } = useParams();
    const [stack, setStack] = useState(null);
    const [workflowID, setWorkflowID] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const getStack = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/stack/${stackid}`);
                if (res.data.status === 'success') {
                    setStack(res.data.stack);
                    setWorkflowID(res.data.stack.workflow_id);
                }
            } catch (error) {
                console.error('Error fetching stack:', error);
            } finally {
                setLoading(false); // Set loading state to false after fetching data
            }
        };
        getStack();
    }, [stackid]);

    if (loading) {
        return <div>Loading...</div>; // Render a loading indicator while fetching data
    }

    return (
        <div className="bg-gray-100 h-screen">
            <div className="flex flex-col h-full">
                <EditStackNavBar />
                <div className="flex flex-1">
                    <LeftNavBar stack={stack} />
                    <ReactFlow workflowID={workflowID} />
                </div>
            </div>
        </div>
    );
};

export default EditStack;
