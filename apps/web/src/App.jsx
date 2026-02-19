import {useEffect, useState} from 'react'
import './App.css'
import {initiateSocket, joinRoom} from "./socketClient.js";

function App() {
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

export default App
