import React, {useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'


//로그인 창 div
const Sdiv = styled.div`
    min-width : 130px;
    width : 20%;
    background : #f0f0ff;
    height : 100vh;
    display : flex;
`
//로그인 창 form
const Sform = styled.form`
    width : 93%;
`

//로그인 창 input
const Sinput = styled.input`
    width : 93%;
    height : 10px;
    margin : 7px;
    border-radius : 10px;
    padding : 20px;
    font-size : 25px;
`

//로그인 창 button
const Sbutton = styled.button`
    min-width : 105px;
    width : 41%;
    height : 50px;
    margin : 5px 10px;;
    font-size : 20px;
    border-radius : 10px;
    background : white;
    :hover {
        background : gray;
    }
`

const Login = () => {

    //로그인창 ←→ 회원가입 창 왔다갔다 할때 사용되는 변수
    const [join, setJoin] = useState(0);

    //input데이터
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    //input데이터 value 설정
    const inputEmail = (e)=>{
        setEmail(e.target.value);
    }
    const inputPassword = (e)=>{
        setPassword(e.target.value);
    }
    const inputNickname = (e)=>{
        setNickname(e.target.value);
    }

  return (
    <Sdiv>
        {
            join===0 && 
            <Sform action="">
                <h2>로그인</h2>
                <p>이메일</p>
                <Sinput type="email" placeholder="email"
                value={email}
                onChange={(e)=>{
                    inputEmail(e);
                }}/>
                <p>비밀번호</p>
                <Sinput type="password" placeholder="password"
                value={password}
                onChange={(e)=>{
                    inputPassword(e);
                }}
                />
                <Sbutton type='submit' onClick={(e)=>{
                    e.preventDefault();
                    window.location.replace("/project")
                }}>로그인</Sbutton>
                
                <Sbutton onClick={(e)=>{
                    e.preventDefault()
                    setJoin(1);
                }}>회원가입</Sbutton>
            </Sform>
        }
        {
            join===1 && 
            <Sform action="">
                <h2>회원가입</h2>
                <p>이메일</p>
                <Sinput type="email" placeholder="email"
                value={email}
                onChange={(e)=>{
                    inputEmail(e);
                }}/>
                <p>비밀번호</p>
                <Sinput type="password" placeholder="password"
                value={password}
                onChange={(e)=>{
                    inputPassword(e);
                }}
                />
                <p>사용할 닉네임</p>
                <Sinput type="text" placeholder="nickname"
                value={nickname}
                onChange={(e)=>{
                    inputNickname(e);
                }}
                />
                <Sbutton type='submit' onClick={(e)=>{
                    e.preventDefault()
                }}>가입하기</Sbutton>
                
                <Sbutton onClick={(e)=>{
                    setJoin(0);
                }}>이전</Sbutton>
            </Sform>
        }
    </Sdiv>
  )
}

export default Login