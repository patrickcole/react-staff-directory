import React, { lazy, Suspense, useContext, useState } from 'react';
import './App.css';
import IndexContext from './IndexContext';
import { UserData } from './data/Users';

const UserList = lazy( () => import('./UserList') );

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
        <Suspense fallback={ <p>Loading Users</p> }>
          <UserList items={UserData} />
        </Suspense>
      </IndexContext.Provider>
    </main>
  )
}

export default App;
