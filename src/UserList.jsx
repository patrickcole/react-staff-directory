import React, {useContext} from 'react';
import IndexContext from './IndexContext';

export default function UserList( {items} ) {

  const { category } = useContext(IndexContext);

  let buildItems = () => {

    if ( items.length === 0 ) {
      return <li className="message">There was an issue resolving the data for this directory</li>
    } else {
      let activeItems = items.filter( item => item.category === category );
      if ( activeItems.length === 0 ) {
        return <li className="message">No users available in this index</li>
      } else {
        return activeItems.map( (item, index) => {
          return (
            <li className="user" key={index}>
              <a className="user__link" href={`#${index}`}>
                <span className="user__name">{item.name}</span>
                <span className="user__email">{item.email}</span>
              </a>
            </li>
          )
        });
      }
    }
  }
  
  return (
    <ul className="users">
      { buildItems() }
    </ul>
  )
}
