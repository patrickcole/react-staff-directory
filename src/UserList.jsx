import React, {useContext} from 'react';
import IndexContext from './IndexContext';

export default function UserList( {items} ) {

  const { category } = useContext(IndexContext);

  let buildItems = () => {

    if ( items.length === 0 ) {
      return <li>There was an issue resolving the data for this directory.</li>
    } else {
      let activeItems = items.filter( item => item.category === category );
      if ( activeItems.length === 0 ) {
        return <li>No users available in this index.</li>
      } else {
        return activeItems.map( (item, index) => {
          return <li key={index}>{item.name}</li>
        });
      }
    }
  }
  
  return (
    <ul>
      { buildItems() }
    </ul>
  )
}
