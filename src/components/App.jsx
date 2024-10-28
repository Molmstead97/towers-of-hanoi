import "./App.css";
import { ToastContainer } from "react-toastify";

import Game from "./Game";

function App() {

  return (
    <>
      <header>
        <h1>Towers of Hanoi</h1>
      </header>
      <Game />
      <ToastContainer />
    </>
  );
}

export default App;
