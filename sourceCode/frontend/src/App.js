import React from 'react';
import {useEffect} from "react";
import './App.css';
import Header from './Components/header/header'
import API from "./api";

function App() {
  const [data, setData] = React.useState();

  async function fillPersona(){
    try {
      const response = await API.get("/");
      setData(response.data);
      console.log(data)
    } catch (e) {
      console.log(e);
    } 
  }

  useEffect(() => {
    fillPersona()
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <header className="App-header">
        <p>
          {!data ? "Loading persona..." : data.map( (d) => {
            return(
                <div>
                  {d}
                </div>
            )
          })}
        </p>
      </header>
    </div>
  );
}

export default App;
