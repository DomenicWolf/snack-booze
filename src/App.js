import React, { useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route,Routes } from "react-router-dom";
import Menu from "./FoodMenu";
import Item from "./FoodItem";
import NewItemForm from "./NewItemForm";
const { v4: uuidv4 } = require('uuid');


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [reset, setReset] = useState(false);

  const addItem = (type,item) => {
    console.log('add')
    type === 'snack' ? setSnacks(s => [...s,{id:uuidv4(),item}]) : setDrinks(d => [...d,{id:uuidv4(),item}]);
  }
  useEffect(() => {
    async function getSnacks() {
      
      let snacks = await SnackOrBoozeApi.getSnacks();
      setSnacks(snacks);
      setIsLoading(false);
    }
    async function getDrinks() {
      let drinks = await SnackOrBoozeApi.getDrinks();
      setDrinks(drinks);
      setIsLoading(false);
    }
    getSnacks();
    getDrinks();
  }, [reset]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route exact path="/" element={<Home snacks={snacks} drinks={drinks} />}>
            </Route>
            <Route exact path="/snacks" element={<Menu items={snacks} title="Snacks" type="snacks" />}>
            </Route>
            <Route path="/snacks/:id" element={<Item items={snacks} cantFind="/snacks" />}>
            </Route>
            <Route path="/drinks" element={<Menu items={drinks} cantFind="/drinks" title="Drinks" type="drinks"/>}>
            </Route>
            <Route path="/drinks/:id" element={<Item items={drinks} cantFind="/snacks" />}>
            </Route>
            <Route path='/new' element={<NewItemForm addItem={addItem} isLoading={isLoading} setReset={setReset}></NewItemForm>}/>
            
            <Route path="*"element={<h1>404 NOT FOUND!</h1>}>
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
