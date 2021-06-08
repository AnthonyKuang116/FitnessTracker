import React, { useState } from 'react';
import { getUser } from '../api';
import './Header.css';

import {
    storeCurrentToken,
    storeCurrentUser,
    clearCurrentToken,
    clearCurrentUser
} from '../auth';

const BASE = 'https://fitnesstrac-kr.herokuapp.com/api';

const Header = ({ token, setToken, setCurrentUser, currentUser }) => {
    const [message, setMessage] = useState('');
    const LoginRegisterHeader = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        //Login button submit handler
        const loginSubmit = async (event) => {
            event.preventDefault();
            try {
                const response = await fetch(`${BASE}/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: `${username}`, password: `${password}`
                    })
                })

                const data = await response.json()
                setMessage('')
                if (data.error) {
                    setMessage(data.error)
                    console.log(message)
                }
                console.log(data)
                console.log(data.token)
                //sets data to localstorage
                if (data.token) {
                    setToken(data.token);
                    setCurrentUser(data.user.username);
                    storeCurrentToken(data.token)
                    storeCurrentUser(data.user.username);
                    getUser(data.token);
                }
            } catch (error) {
                console.error(error);
            }
        }

        //Register submit button
        const registerSubmit = async (event) => {
            event.preventDefault();
            try {
                const response = await fetch(`${BASE}/users/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: `${username}`,
                        password: `${password}`
                    })
                })

                const data = await response.json();
                const newUser = await getUser(data.token);
                setMessage('')
                if (data.error) {
                    setMessage(data.message + " or your fields are blank!")
                }
                storeCurrentUser(data.user.username);
                storeCurrentToken(data.token);

                if (data.token && newUser) {
                    setToken(data.token)
                    setCurrentUser(newUser.username)
                    storeCurrentToken(data.token)
                    storeCurrentUser(data.user.username);
                }
            } catch (error) {
                console.error(error);
            }
        }

        return (
            <div className="headerForms">
                <form>
                    <input type="text" placeholder="username" value={username} name="username" style={{ marginRight: "5px" }}
                        onChange={(event) => {
                            setUsername(event.target.value)
                        }} />
                    <input type="text" placeholder="password" value={password} name="password"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }} />
                    <button onClick={loginSubmit} type="submit" className="loginSubmit" style={{ padding: "5px", paddingRight: "10px", paddingLeft: "10px", margin: "3px" }}>Login</button>
                    <button onClick={registerSubmit} type="submit" className="registerSubmit" style={{ padding: "5px", margin: "3px" }}>Register</button>
                </form>
            </div>
        )
    }

    return (
        <header>
            <h1 className="mainHeader" style={{ color: "white" }}>Fitness Tracker</h1>
            <section className="headerSection">
                {
                    token ?
                        <button className="signOut" style={{ padding: "10px" }}
                            onClick={() => {
                                setCurrentUser(null)
                                setToken(null)
                                clearCurrentUser();
                                clearCurrentToken();
                            }
                            }><b>Hello, {currentUser}!</b> Sign Out?</button>
                        :
                        <div className="loginForms" style={{ display: "block" }}>
                            <LoginRegisterHeader />
                            {message ? <p style={{ color: "#800000", fontWeight: "bold" }}>{message}</p> : ''}
                        </div>

                }

            </section>
        </header>
    )
}

export default Header;


