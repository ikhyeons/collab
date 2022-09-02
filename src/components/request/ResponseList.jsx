import React, {useState} from "preact/compat";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userNamePool } from "../../Atoms/atom";

const Receive = styled.div`
    background-color:${ (props) => props.alres === 1 ? 'lightgreen': 'red'};
    color:${ (props) => props.alres === 1 ? 'black': 'white'};
    width: 100%;
    border-radius: 10px;
    margin-bottom:10px;
`;


const ResponseList = (props)=>{
    const { data, setResponse } = props;
    const [userName] = useRecoilState(userNamePool);
    const [alres, setAlres] = useState(0);
    let sendUser = data.makeUserNum;

    return(
        <>
        {<Receive alres ={alres} onClick={(e)=>{
                        e.preventDefault();
                        setResponse(1);
                        setAlres(1);
                    }}>
                        <div>
                            {data.month}월 {data.week}째주{data.reqContent}
                            <br/>
                            {userName[sendUser].display}
                        </div>
                    </Receive>}
        </>
    )
}

export default ResponseList;