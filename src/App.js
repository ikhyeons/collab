import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarMain from "./components/sidebar/SidebarMain"
import LoginMain from './components/login/LoginMain'
import SelectProject from './components/projects/SelectProjects'
import CalendarMain from "./components/calendar/CalendarMain";

const GlobalStyle = createGlobalStyle`
  *{
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
            <Route path="/main/calendar" element={<CalendarMain />} />
          </Routes>
          
        </Inproject>
      </BrowserRouter>
      }
    </div>
  );
}

export default App;
