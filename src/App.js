import React, { useContext, useState } from 'react';
import './App.css';
import { IndexContext } from './IndexContext';

function Index( {id} ) {

  const { category } = useContext(IndexContext);

  return (
      category === id ? 
        <li><strong>{String.fromCharCode(id)}</strong></li>
      : 
        <li>{String.fromCharCode(id)}</li>
  )
}

function IndexList() {

  let generateIndices = () => {
    let items = [];
    for ( let n = 65; n <= 90; n++ ) { 
      items.push( <Index key={n} id={n} /> );
    }
    return items;
  };
  return generateIndices();
}

function App() {

  const [index, setIndex] = useState(65);

  const onTestUpdate = (e) => setIndex(80);

  return (
    <main>
      <h1>Staff Directory</h1>
      <IndexContext.Provider value={{ category:index }}>
        <IndexList />
      </IndexContext.Provider>
      <hr />
      <button onClick={onTestUpdate}>Set to 80</button>
    </main>
    
  )
}

export default App;
