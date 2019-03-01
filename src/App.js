import React, { createContext, useContext, useState } from 'react';
import './App.css';

// establish the context we will use throughout the app:
const IndexContext = createContext({});

// sample data:
const usersData = [
  { name: "Aa", category: 65 },
  { name: "ga", category: 71 },
  { name: "zd", category: 90 },
  { name: "de", category: 68 },
  { name: "kj", category: 75 },
  { name: "zm", category: 90 },
  { name: "ab", category: 65 },
  { name: "pa", category: 80 },
  { name: "ae", category: 65 },
  { name: "ei", category: 69 },
  { name: "us", category: 85 },
  { name: "ad", category: 65 },
  { name: "gh", category: 71 }
];

function UserList( {items} ) {

  const { category } = useContext(IndexContext);

  let activeItems = items.filter( item => item.category === category );
  return (
    <ul>
      {
        activeItems.length === 0 ?
          <li>No users available in this index</li>
        :
        activeItems.map( (item, index) => {
          return (
            <li key={index}>{item.name}</li>
          )
        })
      }
    </ul>
  )
}

function Index( {id} ) {

  const { category, updateIndex } = useContext(IndexContext);
  let handleIndexClick = (e) => updateIndex(id);
  return (
    <button onClick={handleIndexClick} className={ category === id ? "item item--active" : "item"}>
      {String.fromCharCode(id)}
    </button>
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
        <hr />
        <UserList items={usersData} />
      </IndexContext.Provider>
    </main>
    
  )
}

export default App;
