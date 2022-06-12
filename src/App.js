import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarMain from "./components/sidebar/SidebarMain"
import LoginMain from './components/login/LoginMain'
import SelectProject from './components/projects/SelectProjects'
import CalendarPage from './page/CalendarPage'

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

const SRightWrap = styled.div`
width : 100%;
`

const SrightHead = styled.div`
  height : 20px;
  font-size : 20px;
`
const SRightMain = styled.div`
  display : flex;
  margin-top : 30px;
  width : 100%;
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

          
          

          <SRightWrap>
            <Routes>
              <Route path="/main/*" element={<SrightHead>내용</SrightHead>} />
            </Routes>

            <SRightMain>
              <Routes>
                <Route path="/main/calendar" element={<CalendarPage />} />
              </Routes>
            </SRightMain>

          </SRightWrap>
        </Inproject>
      </BrowserRouter>
      }
    </div>
  );
}

export default App;
