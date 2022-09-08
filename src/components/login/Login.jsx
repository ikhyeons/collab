import React, {useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { webPort } from "../../port";

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
    //로그인, 로그아웃 함수
    const loginf = ()=>{
        if(email !== '' && password !== ''){
            console.log('gd');
            axios({
            method: 'post',
            url: `http://${webPort.express}/login`,
            withCredentials : true,
            data: {
                email : email,
                password : password,
            },
            }).then((res)=>{
                console.log(res);
                if (res.data.return === 0){window.location.replace("/project")}
                else if(res.data.return === 1){alert("비밀번호를 확인하세요!")}
                else if(res.data.return === 2){alert("존재하지 않는 계정입니다!")}
            });
        }
      }

      const joinf = ()=>{
        if(email !== '' && password !== '' && nickname !== ''){
            console.log('try join');
            axios({
                method: 'post',
                url: `http://${webPort.express}/join`,
                withCredentials : true,
                data: {
                    email : email,
                    password: password,
                    nickname: nickname,
                }
            }).then((res)=>{
                console.log(res);
                if(res.data.success === 0){
                    alert("가입에 성공했습니다!")
                    setJoin(0);
                    setEmail('');
                    setPassword('');
                    setNickname('');
                }
                else if(res.data.success === 1){alert("이미 존재하는 이메일입니다!")}
            })
        }
    }

  return (
    <Sdiv>
        {
            join===0 && 
            <Sform action="javascript://">
                <h2>로그인</h2>
                <p>이메일</p>
                <Sinput type="email" placeholder="email"
                value={email}
                onChange={(e)=>{
                    inputEmail(e);
                }} 
                required
                />
                <p>비밀번호</p>
                <Sinput type="password" placeholder="password"
                value={password}
                onChange={(e)=>{
                    inputPassword(e);
                }}
                required
                />
                <Sbutton type='submit' onClick={(e)=>{
                    loginf();
                }}>로그인</Sbutton>
                
                <Sbutton type='button' onClick={(e)=>{
                    setJoin(1);
                }}>회원가입</Sbutton>
            </Sform>
        }
        {
            join===1 && 
            <Sform action="javascript://">
                <h2>회원가입</h2>
                <p>이메일</p>
                <Sinput type="email" placeholder="email"
                value={email}
                onChange={(e)=>{
                    inputEmail(e);
                }}
                required
                />
                <p>비밀번호</p>
                <Sinput type="password" placeholder="password"
                value={password}
                onChange={(e)=>{
                    inputPassword(e);
                }}
                required
                />
                <p>사용할 닉네임</p>
                <Sinput type="text" placeholder="nickname"
                value={nickname}
                onChange={(e)=>{
                    inputNickname(e);
                }}
                required
                />
                <Sbutton type='submit' onClick={(e)=>{
                    joinf();
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