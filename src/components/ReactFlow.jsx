import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    Background,
    BackgroundVariant,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import OpenAi from './workflow/llms/OpenAi';
import CSVAgentNode from './workflow/Agents/CSVAgentNode';
import OpenAIConversationalAgentNode from './workflow/Agents/OpenAIConversational';
import ChatWindow from './ChatWindow';
import axios from 'axios';

const nodeTypes = {
    openaiConfig: OpenAi,
    csvagent: CSVAgentNode,
    openaiagent: OpenAIConversationalAgentNode
};


let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = ({ workflowID }) => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const updateWorkflow = useCallback(async () => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update_workflow/${workflowID}`, {
                nodes,
                edges
            });
            if (res.data.status === 'success') {
                console.log('Workflow updated successfully');
            }
        } catch (error) {
            console.error('Error updating workflow:', error);
        }
    }, [workflowID, nodes, edges]);
    useEffect(() => {
        const interval = setInterval(() => {
            updateWorkflow();
        }, 5000);
        return () => clearInterval(interval);
    }, [updateWorkflow]);
    useEffect(() => {
        const getWorkflow = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/workflow/${workflowID}`)
            // if (res.data.status == 'success') {
            // const nodesList = res.data.workflow.nodes.map(node => ({ id: node.id, name: node.name }))
            // const edgesList = res.data.workflow.edges.map(edge => ({ source: edge.source, target: edge.target }))
            console.log(res.data);
            setNodes(res.data.nodes)
            setEdges(res.data.edges)
            // }
        }
        getWorkflow()
    }, [reactFlowInstance])
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) {
                return;
            }
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );

    return (
        <div className="w-full h-full relative">
            <ReactFlowProvider>
                <div className="reactflow-wrapper w-full h-full" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                    >
                        <Background color="#ccc" variant={BackgroundVariant.Dots} />
                        <Controls />
                    </ReactFlow>
                </div>
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <button className="rounded-full bg-green-500 w-10 h-10 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path fill="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                    </button>
                    <button
                        className="rounded-full bg-blue-600 w-10 h-10 flex justify-center items-center"
                        onClick={handleOpenModal}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                            />
                        </svg>
                    </button>
                    {showModal && (
                        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white rounded-lg shadow-lg p-4 w-[1000px] h-[600px]">
                                <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-600">
                                    Close
                                </button>
                                <ChatWindow onClose={handleCloseModal} />
                            </div>
                        </div>
                    )}
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
