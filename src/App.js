import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import LoginMain from './components/login/LoginMain'
import SelectProject from './components/projects/SelectProjects'
import CalendarPage from './page/CalendarPage'
import DocPage from "./page/DocPage";
import WorkListPage from "./page/WorkListPage"
import SettingPage from "./page/SettingPage";
import NewSpacePage from './page/NewSpacePage'
import ChattingPage from "./page/ChattingPage";

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

  return (
    <RecoilRoot>
      <div className="App">
        <GlobalStyle />
        <DndProvider backend={HTML5Backend}>
        {
        //<SelectProject />
        //<LoginMain />
        <BrowserRouter>
          <Inproject>

            <Routes>
              <Route path="/" element={<LoginMain />} />
              <Route path="/project" element={<SelectProject />} />
              <Route path="/main/:projectNum/calendar" element={<CalendarPage />} />
              <Route path="/main/:projectNum/workspace/li/:workSpaceNum" element={<DocPage />} />
              <Route path="/main/:projectNum/workspace/board/:workSpaceNum" element={<WorkListPage />} />
              <Route path="/main/:projectNum/workspace/new/:workSpaceNum" element={<NewSpacePage />} />
              <Route path="/main/:projectNum/setting" element={<SettingPage />} />
              <Route path="/main/:projectNum/chat/:chatSpaceNum" element={<ChattingPage />} />
            </Routes>            
          </Inproject>
        </BrowserRouter>
        }
        </DndProvider>
      </div>
    </RecoilRoot>
  );
}

export default App;
