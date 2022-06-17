import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarMain from "./components/sidebar/SidebarMain"
import LoginMain from './components/login/LoginMain'
import SelectProject from './components/projects/SelectProjects'
import CalendarPage from './page/CalendarPage'
import DocListMain from "./components/doclist/DocListMain";

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
            <Route path="/" element={<LoginMain />} />
          </Routes>

          <Routes>
            <Route path="/main/*" element={<SidebarMain />} />
          </Routes>
          
          <Routes>
            <Route path="/main/calendar" element={<CalendarPage />} />
          </Routes>

          <Routes>
            <Route path="/main/workspace/li/*" element={<DocListMain />} />
          </Routes>

          <Routes>
            <Route path="/main/workspace/board/*" element={<DocListMain />} />
          </Routes>

        </Inproject>

        <Routes>
            <Route path="/project" element={<SelectProject />} />
        </Routes>
      </BrowserRouter>
      }
    </div>
  );
}

export default App;
