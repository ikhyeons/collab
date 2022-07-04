import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  const SAllWrap = styled.div`
  overflow-X : scroll;
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
  `

const Inproject = styled.div`
  display : flex;
  overflow : hidden;
  overflow-X : scroll;
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
`

function App() {
  return (
    <div className="App">
      <GlobalStyle />
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
    </div>
  );
}

export default App;
