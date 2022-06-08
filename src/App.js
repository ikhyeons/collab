import { createGlobalStyle } from "styled-components";
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
      <GlobalStyle />
       <SidebarMain />
    </div>
  );
}

export default App;
