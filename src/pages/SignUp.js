import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// import { UserContext } from '../../contexts/UserContext';

export default function SignIn() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
    return (
        <SignContainer>
        <h1>My Wallet</h1>
        <SignInForm >
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                name="nome"
                placeholder="Nome"
                required
            />
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
                placeholder="Senha"
                required
            />
            <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                name="passwordConfirmation"
                placeholder="Confirme a senha"
                required
            />
            <Button>Entrar</Button>
        </SignInForm>
            <Link to="/">Já tem uma conta? Entre agora!</Link>
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
