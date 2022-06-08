import SelectProjects from './projects/SelectProjects'
import {createGlobalStyle} from 'styled-components';

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
       <SelectProjects />
    </div>
  );
}

export default App;
