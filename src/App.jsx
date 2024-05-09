import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EditStack from './components/EditStack';
import Home from './components/Home';
import { Toaster } from 'sonner';
import OpenAi from './components/workflow/llms/OpenAi';
import ChatWindow from './components/ChatWindow';


function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/editstack/:stackid' element={<EditStack />} />
        <Route path='/demo' element={<ChatWindow />} />

      </Routes>
    </Router>
  );
}

export default App;
