import React from 'react'
import {initiateSocket, joinRoom} from "../services/socketClient.js";
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
function LoginPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        pseudo : '',
        age : '',
        roomChoice : ''
    });

    useEffect(() => {
        initiateSocket();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name] : value,
        });
    };



    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/register-user', {
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(user)
            })
            if (response.ok) {
                joinRoom(user.pseudo, user.age, user.roomChoice);
                setUser({
                    pseudo: '',
                    age: '',
                    roomChoice: ''
                })
                navigate(`/chat/${user.roomChoice}`);
            } else {
                setUser({
                    pseudo: '',
                    age: '',
                    roomChoice: ''
                })
                navigate('/')
            }
        } catch (e) {
            console.error("rereur api", e.message);
        }
    }
    return (
        <>
            <div>

                <form  onSubmit={handleSubmit}>
                    <label htmlFor="pseudo">
                        <input type="text" value={user.pseudo} name="pseudo" onChange={handleChange}/>
                    </label>
                    <label htmlFor="age">
                        <input type="number" value={user.age} name="age" onChange={handleChange}/>
                    </label>
                    <label htmlFor="roomChoice">Choissisez votre room
                        <select name="roomChoice" id="" value={user.roomChoice} onChange={handleChange}>
                            <option  value="">Selectionnez une room</option>
                            <option  value="hub">Hub</option>
                            <option  value="dev">Dev</option>
                            <option  value="gaming">Gaming</option>
                        </select>
                    </label>
                    <button type="submit">S'inscrire</button>
                </form>
            </div>

        </>
    )
}

export default LoginPage
