import { createGlobalStyle } from "styled-components";
import LoginMain from "./components/login/LoginMain";

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

    </div>
  );
}

export default App;
