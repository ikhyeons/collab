import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import SidebarMain from "./components/sidebar/SidebarMain"

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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <SidebarMain />
      </BrowserRouter>
    </div>
  );
}

export default App;
