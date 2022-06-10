import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import SidebarMain from "./components/sidebar/SidebarMain"
import LoginMain from './components/login/LoginMain'
import SelectProject from './components/projects/SelectProjects'
import RequestMain from "./components/request/RequestMain";

const GlobalStyle = createGlobalStyle`
  *{
    margin : 0px;
    padding : 0px;
    box-sizing : border-box;
    input:focus {
      outline: none
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
          <SidebarMain />
          <RequestMain />
        </Inproject>
      </BrowserRouter>
      }
    </div>
  );
}

export default App;
