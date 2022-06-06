import React, {useState} from 'react'
import styled from 'styled-components'

const Sdiv = styled.div`
    min-width : 130px;
    width : 20%;
    background : #f0f0ff;
    height : 100vh;
    display : flex;
`

const Sform1 = styled.form`
    width : 93%;
`

const Sform2 = styled.form`
    width : 93%;
`

const Sinput = styled.input`
    width : 93%;
    height : 10px;
    margin : 7px;
    border-radius : 10px;
    padding : 20px;
    font-size : 25px;
`

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
    const [join, setJoin] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

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
            <Sform1 action="">
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
                    e.preventDefault()
                }}>로그인</Sbutton>
                
                <Sbutton onClick={(e)=>{
                    e.preventDefault()
                    setJoin(1);
                }}>회원가입</Sbutton>
            </Sform1>
        }
        {
            join===1 && 
            <Sform2 action="">
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
            </Sform2>
        }
        

        
    </Sdiv>
  )
}

export default Login