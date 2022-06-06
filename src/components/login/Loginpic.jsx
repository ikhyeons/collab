import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'

const Simg = styled.img`
    width : 80vw;
    height : 100vh;
    -webkit-user-drag: none;
`

const Sslidebar = styled.div`
    position : absolute;
    bottom : 10px;
    left : 15px;
    display : flex;
`

const Sslidebarcircle = styled.div`
    border : 1px solid yellow;
    margin : 5px;
    padding : 4px;
    background : ${prop => prop.nowpic === 1 ? 'yellow': null};
    border-radius : 50%;
    :hover{
        cursor : pointer;
    }
`

    

const Loginpic = () => {

    const [slideNum, setSlideNum] = useState(0);

    const picList = [
        "https://images.unsplash.com/photo-1602629978879-e7ed887988d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG5vdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1527656855834-0235e41779fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG5vdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", 
        "https://images.unsplash.com/photo-1597338770339-9860acd8406e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5vdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", 
        "https://images.unsplash.com/photo-1532153354457-5fbe1a3bb0b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fG5vdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    ]

    const useInterval = (callback, delay) => {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
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

    useInterval(() => {
        setSlideNum(prev => prev + 1);
        if (slideNum === 3) setSlideNum(0);
        }, 3400);

   
    

  return (
    <>
        <Simg src={picList[slideNum]} alt="배경그림" />
        <Sslidebar>
            {picList.map((data, i)=>{
                console.log(slideNum, i);
                if (slideNum === i) return <Sslidebarcircle nowpic = {1}></Sslidebarcircle>
                else return <Sslidebarcircle nowpic = {0}></Sslidebarcircle>
            })}
        </Sslidebar>
    </>
  )
}

export default Loginpic