import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    //Just to redirect user to login page
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/login");
    }, [])

    return (
        <div>
        </div>
    )
}

export default Home
