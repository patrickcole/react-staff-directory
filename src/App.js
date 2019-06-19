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

  const { useAll, updateAll } = useContext(IndexContext);

  let buildIndices = () => {
    let items = [];
    for ( let n = 65; n <= 90; n++ ) { 
      items.push( <Index key={n} id={n} /> );
    }
    return items;
  };

  let onAllButtonClick = (e) => updateAll();

  return (
    <ul className="items">
      <button onClick={onAllButtonClick} className={ useAll ? "item item--active" : "item"}>All</button>
      { buildIndices() }
    </ul>
  )
}

const UserSearch = React.forwardRef((props, ref) => {

  const {updateParentQuery} = props;

  let onQueryKeyUp = (e) => updateParentQuery(e.currentTarget.value);

  return (
    <label>
      Search
      <input ref={ref} type="text" onKeyUp={onQueryKeyUp} />
    </label>
  )
});

function App() {

  const [index, setIndex] = useState(65);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [allVisible, setAllVisible] = useState(false);

  const focusRef = React.createRef();
  const searchRef = React.createRef();

  const onIndexUpdate = (index) => {
    setIndex(index);
    setAllVisible(false);
    setQuery('');
    searchRef.current.value = '';
    focusRef.current.focus();
  }

  const onAllUpdate = (e) => {
    setIndex(-1);
    setAllVisible(true);
    focusRef.current.focus();
  }

  let onQueryUpdate = ( term ) => {
    setIndex(-1);
    setAllVisible(true);
    setQuery(term);
  }

  let capitalize = ( string ) => string.charAt(0).toUpperCase() + string.slice(1);
  let categorize = ( string ) => string.slice(0,1).toUpperCase().charCodeAt(0);

  // TODO: Refactor the display to a query term as opposed to just a category
  // meaning just the last name:


  // helper to format data to the directory format:
  // as the random generator api uses a slightly different syntax;
  let formatData = ( data ) => {

    let formatted_data = [];
    data.results.forEach( (obj) => {
  
      formatted_data.push({
        first: obj.name.first,
        last: obj.name.last,
        name: `${capitalize(obj.name.first)} ${capitalize(obj.name.last)}`,
        category: categorize(obj.name.last),
        email: obj.email
      });
    });
    
    formatted_data = formatted_data.sort( (a,b) => {
      if ( a.last < b.last ) return -1;
      if ( a.las > b.last ) return 1;
      return 0;
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
      <header>
        <h1>Staff Directory</h1>
        <UserSearch updateParentQuery={ onQueryUpdate } ref={searchRef} />
      </header>
      <IndexContext.Provider value={{ useAll: allVisible, updateAll: onAllUpdate, query: query, category:index, updateIndex: onIndexUpdate }}>
        <IndexList />
        <Suspense fallback={ <p className="message">Loading Users</p> }>
          <UserList items={users} ref={focusRef} />
        </Suspense>
      </IndexContext.Provider>
    </main>
  )
}

export default App;
