import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import './App.css';
import IndexContext from './IndexContext';

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
  const [users, setUsers] = useState([]);
  const focusRef = React.createRef();

  const onIndexUpdate = (index) => {
    setIndex(index);
    focusRef.current.focus();
  }

  let capitalize = ( string ) => string.charAt(0).toUpperCase() + string.slice(1);
  let categorize = ( string ) => string.slice(0,1).toUpperCase().charCodeAt(0);

  // helper to format data to the directory format:
  // as the random generator api uses a slightly different syntax;
  let formatData = ( data ) => {

    let formatted_data = [];
    data.results.forEach( (obj) => {
  
      formatted_data.push({
        name: `${capitalize(obj.name.first)} ${capitalize(obj.name.last)}`,
        category: categorize(obj.name.last),
        email: obj.email
      });
    });

    setUsers(formatted_data);
  }

  // helper function to async/await fetch request:
  async function getDataAsync(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  // on mount, go grab some data from random-user generator API:
  useEffect(
    () => {
      getDataAsync('https://randomuser.me/api/?results=100&exec=gender&inc=name,email')
        .then( rawData => formatData(rawData) )
    }, [] );

  return (
    <main>
      <h1>Staff Directory</h1>
      <IndexContext.Provider value={{ category:index, updateIndex: onIndexUpdate }}>
        <IndexList />
        <Suspense fallback={ <p className="message">Loading Users</p> }>
          <UserList items={users} ref={focusRef} />
        </Suspense>
      </IndexContext.Provider>
    </main>
  )
}

export default App;
