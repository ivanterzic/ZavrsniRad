import React, { useState } from 'react';
import {useEffect, createContext, useContext} from "react";
import './App.css';
import Header from './Components/header/header'
import SelectOption from './Components/SelectOption/SelectOption'
import RadioContext from './Context/RadioContext';
import { RadioProvider } from './Context/RadioContext';
import API from "./api";




function App() {
  const { radio, setRadio } = useContext(RadioContext);
  const [data, setData] = React.useState();

  async function fillPersona(){
    try {
      const response = await API.get("/");
      setData(response.data);
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
        <SelectOption></SelectOption>
        <header className="App-header">
          <p>
            {!data ? "Loading persona..." : data.map( (d) => {
              return(
                d + " "
              )
            })}
          </p>

          <div>
            {radio === "Text" ? 
              <div>Text placeholder</div>
            :
              <div>Visual placeholder</div>
            }
          </div>
        </header>
      </div>
  );
}

export default App;
