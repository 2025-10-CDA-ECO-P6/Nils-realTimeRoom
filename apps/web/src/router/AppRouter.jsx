import {Routes, Route}  from 'react-router-dom'
import LoginPage from "../components/LoginPage";
import ChatPage from "../components/ChatPage";


export default function AppRouter() {
    return(
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/chat/:room" element={<ChatPage/>} />
        </Routes>
    )
}