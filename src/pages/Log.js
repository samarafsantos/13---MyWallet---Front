import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    const [total, setTotal] = useState("");

    const history = useHistory();
    
    useEffect(()=>{
        getLog();
        getTotal();
    }, [logAdd, logSub]);

    function getLog(){
        axios.get("https://sammy-my-wallet.herokuapp.com/api/log", {headers: {Authorization: `Bearer ${user.token}`}}).
        then((response)=>{
            if (!response.data) return setError('User not found');
            setLog(response.data);
            getTotal(response.data);
        }).catch((error)=>{
            const { response } = error;
            if (response.data.error) return setError(response.data.error);
        });
    }

    function getTotal(info){
        let sum = 0;
        let sub = 0;
        if(info!==undefined){
            for(let i=0; i<info.length; i++){
            
            if(info[i].type=="add"){
                sum+=parseInt(info[i].value);
            }else{
                sub+=parseInt(info[i].value);
            }
        }
        setTotal(sum-sub);
        }
    }
    function logout(){
        axios.post("https://sammy-my-wallet.herokuapp.com/api/logout", {}, {headers: {Authorization: `Bearer ${user.token}`}}).
        then((response)=>{
            if (!response.data) return setError('User not found');
            history.push('/');
        }).catch((error)=>{
            const { response } = error;
            if (response.data.error) return setError(response.data.error);
        });
    }
    
    function logFormat(l) { 
        let d1 = l.split("T");
        let d2 = d1[0].split("-");
        var d3 = d2.reverse();
        var d4 = d3[0]+"-"+d3[1];
        return d4;
    }


    return (
        <LogContainer>
            <Top>
                <h1>Olá, {user.name}</h1>
                <RiLogoutBoxRLine onClick={()=>logout()}/>
            </Top>
            <LogsList>
                {log.length!==0 ? 
                <ul style={{width: '90%', margin: '10px auto'}}>{log.map(l =>
                    <Line>
                        <p className="date">{logFormat(l.date)}</p>
                        <p className="description">{l.description}</p>
                        {l.type === "add" ? 
                            <p className="positive">{l.value}</p>
                            : <p className="negative">{l.value}</p>
                        }
                        
                    </Line>)}</ul>
                : <p>Não há registros de entrada ou saída</p>}
                <Total>
                    <p>SALDO</p>
                    {total > 0 ? 
                    <p className="positive">R$ {total}</p>:
                    <p className="negative">R$ {total}</p>
                    }
                </Total>
            </LogsList>
            <ButtonContainer>
                <Link to="/addLog">
                    <Button>
                        <BiPlusCircle />
                        <p>Nova <br/>entrada</p>
                    </Button>
                </Link>
                <Link to="/subLog">
                    <Button>
                        <BiMinusCircle />
                        <p>Nova <br/>saída</p>
                    </Button>
                </Link>
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

const Line = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5px;
    .description{
        color: black;
    }
    .positive{
        color: green;
    }
    .negative{
        color: red;
    }
    .date, .value{
        width:20%;
    }
`;

const LogsList = styled.div`
    width: 80%;
    background: #FFF;
    color: gray;
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    ul{
        align-items: flex-start;
    }
    
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

const Total = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 17px;
    font-weight: bold;
    color: black;
    width: 90%;
    height: 30px;
    margin: 15px;
    .positive{
        color: green;
    }
    .negative{
        color: red;
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
    a{
        width: 45%;
    }
`;

const Button = styled.div`
    background: #A328D6;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;