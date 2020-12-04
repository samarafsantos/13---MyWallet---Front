import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import axios from 'axios';

import UserContext from '../contexts/UserContext';

export default function Log(){
    const {user, setUser} = useContext(UserContext);
    const [log, setLog] = useState([]);
    const {logAdd} = useContext(UserContext);
    const {logSub} = useContext(UserContext);
    const [error, setError] = useState("");


    console.log(user);
    const history = useHistory();
    
    useEffect(()=>{
        getLog();
    }, []);
    
    // useEffect(()=>{
    //     getLog();
    // }, [logAdd, logSub]);

    function getLog(){
        console.log(JSON.stringify(user, null, 4))
        axios.get("http://localhost:3000/api/log", {headers: {Authorization: `Bearer ${user.token}`}}).
        then((response)=>{
            if (!response.data) return setError('User not found');
            console.log(response.data);
            setLog(response.data);
        }).catch((error)=>{
            console.log(error);
            const { response } = error;
            if (response.data.error) return setError(response.data.error);
        });
    }

    function logout(){
        axios.post("http://localhost:3000/api/logout", {}, {headers: {Authorization: `Bearer ${user.token}`}}).
        then((response)=>{
            if (!response.data) return setError('User not found');
            history.push('/');
        }).catch((error)=>{
            const { response } = error;
            if (response.data.error) return setError(response.data.error);
        });
    }

    return (
        <LogContainer>
            <Top>
                <h1>Olá, {user.name}</h1>
                <RiLogoutBoxRLine onClick={()=>logout()}/>
            </Top>
            <LogsList>
                {log.length!==0 ? 
                <ul>{log.map(l=><li>{l}</li>)}</ul>
                : <p>Não há registros de entrada ou saída</p>}
            </LogsList>
            <ButtonContainer>
                <Button>
                    <BiPlusCircle />
                    <p>Nova <br/>entrada</p>
                </Button>
                <Button>
                    <BiMinusCircle />
                    <p>Nova <br/>saída</p>
                </Button>
            </ButtonContainer>
        </LogContainer>
    );
}

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin-top: 30px;
    svg{
        font-size:30px;
        cursor: pointer;
    }
`;

const LogsList = styled.div`
    width: 80%;
    background: #FFF;
    color: gray;
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

`;
const LogContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    background: #8C11BE;
    color: #FFF;
    width: 100vw;
    height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
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

const ButtonContainer = styled.div`
    display: flex;
    height: 100px;
    width: 80%;
    justify-content: space-between;
    margin-bottom: 20px;
    svg{
        font-size:25px;
    }
`;

const Button = styled.div`
    background: #A328D6;
    width: 45%;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;