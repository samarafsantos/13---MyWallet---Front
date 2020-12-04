import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import UserContext from '../contexts/UserContext';

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const {user, setUser} = useContext(UserContext);
    const [error, setError] = useState("");
    const history = useHistory();   

    useEffect(() => {
        if (!user) history.push(`/log`);
    }, [user]);
  
    function onSubmit(e){
        e.preventDefault();
        axios.post("https://sammy-my-wallet.herokuapp.com/api/sign-in", {email, password}).
        then((response)=>{
            if (!response.data) return setError('User not found');
            setUser({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            token: response.data.token,
            });
            history.push(`/log`);
        }).catch((error)=>{
            const { response } = error;
            if (response.data.error) return setError(response.data.error);
        });
    }

    return (
        <SignContainer>
        <h1>My Wallet</h1>
        <SignInForm onSubmit={onSubmit} >
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email"
            required
            />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Password"
            required
            />
            <Button>Entrar</Button>
            {error && <ErrorBox>{error}</ErrorBox>}
        </SignInForm>
            <Link to="/register">Primeira vez? Cadastre-se!</Link>
        </SignContainer>
    );
}

const SignContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    background: #8C11BE;
    color: #FFF;
    width: 100vw;
    height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1{
        font-family: 'Saira Stencil One', cursive;
        font-size:32px;
    }
    a{
        color: inherit;
        text-decoration: none;
        cursor: pointer;
        font-weight: bold;
    }
`;

const Button = styled.button`
    font-family: 'Raleway', sans-serif;
    display: block;
    border: none;
    border-radius: 4px;
    margin-bottom: 15px;
    padding: 0 16px;
    width:250px;
    height: 37px;
    line-height: 37px;
    font-size: 16px;
    background: #A328D6;
    color: inherit;
    cursor: pointer;
    font-weight: bold;
`;

const SignInForm = styled.form`
    font-family: 'Raleway', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    max-width: 220px;
    padding-top: 30px;
    color: inherit;

    input[type='text'],
    input[type='email'],
    input[type='password'] {
        
        display: block;
        border: none;
        border-radius: 4px;
        margin-bottom: 15px;
        padding: 0 16px;
        width: 100%;
        height: 37px;
        line-height: 37px;
        font-size: 16px;
    }
    input::placeholder{
        font-family: 'Raleway', sans-serif;
        color: black;
    }
`;

const ErrorBox = styled.div`
  padding-bottom: 15px;
  font-size: 16px;
  line-height: 20px;
  color: #ea0358;
`;