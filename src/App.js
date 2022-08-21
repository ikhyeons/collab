import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import axios from "axios";


import SidebarMain from "./components/sidebar/SidebarMain"
import LoginMain from './components/login/LoginMain'
import SelectProject from './components/projects/SelectProjects'
import CalendarPage from './page/CalendarPage'
import DocListMain from "./components/doclist/DocListMain";
import WorkList from "./components/worklist/WorkList";
import DocTemplateMain from "./components/doctemplate/DocTemplateMain";
import Setting from "./components/setting/Setting";
import NewSpace from "./components/newspace/NewSpace";
import Chatting from "./components/chatting/Chatting";


import {RecoilRoot} from 'recoil';

const GlobalStyle = createGlobalStyle`
  *{
    scroll-behavior:smooth;
    margin : 0px;
    padding : 0px;
    box-sizing : border-box;
    input:focus {
      outline: none
    };
    textarea:focus {
      outline: none;
    };
  }
  `
  
const Inproject = styled.div`
  display : flex;
  overflow : hidden;
  &::-webkit-scrollbar{
    height : 5px;
    background : rgba(240,240,150,1);
  }

  &::-webkit-scrollbar-thumb{
      height: 17%;
      background-color: rgba(255,255,170,1);
      border : 1px solid yellow;
      border-radius: 5px;    
  }
  @media screen and (max-width : 1250px){
    overflow-x : scroll;
  }
`

function App() {

  const loginf = ()=>{
    axios({
      method: 'post',
      url: 'http://localhost:1004/changeCalendarEvent',
      withCredentials : true,
      data : {
        eventNum:1,
        projectNum: 1,
        startDate: '2022-08-19',
        endDate: '2022-08-20',
        eventTitle: "바뀐 제목",
        eventContent: "바뀐 내용",
        secret: 0,
      },
    }).then((res)=>{console.log(res)});
  }

  return (
    <RecoilRoot>
      <div className="App">
        <button onClick={()=>{loginf()}}>
          text1
        </button>
        <GlobalStyle />
        <DndProvider backend={HTML5Backend}>
        {
        //<SelectProject />
        //<LoginMain />
        <BrowserRouter>
          <Inproject>

            <Routes>
              <Route path="/main/*" element={<SidebarMain />} />
            </Routes>

            <Routes>
              <Route path="/" element={<LoginMain />} />
              <Route path="/project" element={<SelectProject />} />
              <Route path="/main/calendar" element={<CalendarPage />} />
            </Routes>

            <Routes>
              <Route path="/main/workspace/li/*" element={<DocListMain />} />
              
            </Routes>

            <Routes>
              <Route path="/main/workspace/board/*" element={<WorkList />} />
              <Route path="/main/workspace/li/*" element={<DocTemplateMain />} />
              <Route path="/main/workspace/new/*" element={<NewSpace />} />
            </Routes>

            <Routes>
              <Route path="/main/setting" element={<Setting />} />
              <Route path="/main/chat/*" element={<Chatting />} />
            </Routes>

            
          </Inproject>

          <Routes>

          </Routes>
        </BrowserRouter>
        }
        </DndProvider>
      </div>
    </RecoilRoot>
  );
}

export default App;
