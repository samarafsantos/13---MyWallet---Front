import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import UserContext from '../contexts/UserContext';

export default function SignIn() {
    const {user, setUser} = useContext(UserContext);
    const {logSub, setLogSub} = useContext(UserContext);
    const [num, setNum] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();   
    const [error, setError] = useState("");
  
    function onSubmit(e){
        e.preventDefault();
        console.log("foi");
        axios.post("http://localhost:3000/api/pullout", {num, description}, {headers: {Authorization: `Bearer ${user.token}`}}).
        then((response)=>{
            if (!response.data) return setError('User not found');
            console.log(response);
            setLogSub(!logSub);
            history.push(`/log`);
        }).catch((error)=>{
            const { response } = error;
            if (response.data.error) return setError(response.data.error);
        });
    }

    return (
        <NewEntryContainer>
            <h1>Nova saída</h1>
            <EntryForm onSubmit={onSubmit} >
                <input
                type="number"
                value={num}
                min="0.01"
                step="0.01"
                onChange={(e) => setNum(e.target.value)}
                name="Value"
                placeholder="Valor"
                required
                />
                <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                placeholder="Descrição"
                required
                />
                <Button>Salvar Saída</Button>
                {error && <ErrorBox>{error}</ErrorBox>}
            </EntryForm>
        </NewEntryContainer>
    );
}

const NewEntryContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    background: #8C11BE;
    color: #FFF;
    width: 100vw;
    height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    h1{
        font-family: inherit;
        margin: 30px;
        font-weight: bold;
        font-size: 30px;
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
    width: 90%;
    height: 45px;
    line-height: 37px;
    font-size: 16px;
    background: #A328D6;
    color: inherit;
    cursor: pointer;
    font-weight: bold;
`;

const EntryForm = styled.form`
    font-family: 'Raleway', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
    padding-top: 30px;
    color: inherit;

    input[type='text'],
    input[type='number']{ 
        display: block;
        border: none;
        border-radius: 4px;
        margin-bottom: 15px;
        padding: 0 16px;
        width: 90%;
        height: 58px;
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