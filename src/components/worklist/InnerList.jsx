import React from "react";
import { useRecoilState } from "recoil";
import { listState } from "../../Atoms/atom";

const InnerList = (props) =>{
    const [listStatef, setListStatef] = useRecoilState(listState(props.data));

    return(
        <div>{listStatef.contents}</div>
    )
}

export default InnerList;