import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'


//이미지
const Simg = styled.img`
    width : 80vw;
    height : 100vh;
    -webkit-user-drag: none;
`

//좌하단 슬라이드바
const Sslidebar = styled.div`
    position : absolute;
    bottom : 10px;
    left : 15px;
    display : flex;
`

//슬라이드바에 동그라미들
const Sslidebarcircle = styled.div`
    border : 1px solid yellow;
    margin : 5px;
    padding : 4px;
    background : ${prop => prop.nowpic === 1 ? 'yellow': null}; // nowpic이 1이면(현재 위치한 그림 순서) 해당 동그라미 노란색 배경 적용
    border-radius : 50%;
    :hover{
        cursor : pointer;
    }
`

    

const Loginpic = () => {
    //슬라이드 인덱스 번호
    const [slideNum, setSlideNum] = useState(0);

    //그림 리스트
    const picList = [
        "https://images.unsplash.com/photo-1602629978879-e7ed887988d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG5vdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1527656855834-0235e41779fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG5vdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", 
        "https://images.unsplash.com/photo-1597338770339-9860acd8406e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5vdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", 
        "https://images.unsplash.com/photo-1532153354457-5fbe1a3bb0b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fG5vdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    ]

    //일정 시간마다 그림을 슬라이드 하기위한 함수
    const useInterval = (callback, delay) => {
        const savedCallback = useRef();
      
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }


    //일정시간마다 슬라이드 실행
    useInterval(() => {
        setSlideNum(prev => prev + 1); // 슬라이드 인데스 번호를 하나씩 증가시킴
        if (slideNum === 3) setSlideNum(0); // 슬라이드 인덱스 번호가 3이 될 경우 다시 0으로 초기화
        }, 3000); //3초마다 슬라이드

   
    

  return (
    <>
        <Simg src={picList[slideNum]} alt="배경그림" />
        <Sslidebar>
            {picList.map((data, i)=>{
                /*각 동그라미를 렌더링 할 때 '현재 슬라이드 인덱스 번호'와 '해당 사진의 인덱스 번호'가 동일하면 nowpic = 1 (동그라미에 노란배경)*/
                if (slideNum === i) return <Sslidebarcircle key={i} nowpic = {1}></Sslidebarcircle>; 
                /*아닐경우 null*/
                else return <Sslidebarcircle key={i} nowpic = {0}></Sslidebarcircle>;
            })}
        </Sslidebar>
    </>
  )
}

export default Loginpic