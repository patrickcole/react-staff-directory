import React, { createContext, useContext, useState } from 'react';
import './App.css';

// establish the context we will use throughout the app:
const IndexContext = createContext({});

function Index( {id} ) {

  const { category, updateIndex } = useContext(IndexContext);
  let handleIndexClick = (e) => updateIndex(id);
  return (
    <li onClick={handleIndexClick} className={ category === id ? "item item--active" : "item"}>
      {String.fromCharCode(id)}
    </li>
  );
}

function IndexList() {

  let buildIndices = () => {
    let items = [];
    for ( let n = 65; n <= 90; n++ ) { 
      items.push( <Index key={n} id={n} /> );
    }
    return items;
  };

  return (
    <ul className="items">
      { buildIndices() }
    </ul>
  )
}

function App() {

  const [index, setIndex] = useState(65);
  const onIndexUpdate = (index) => setIndex(index);

  return (
    <main>
      <h1>Staff Directory</h1>
      <IndexContext.Provider value={{ category:index, updateIndex: onIndexUpdate }}>
        <IndexList />
      </IndexContext.Provider>
    </main>
    
  )
}

export default App;
