import React, {useContext} from 'react';
import IndexContext from './IndexContext';

const UserList = React.forwardRef((props, ref) => {

  const { useAll, category, query } = useContext(IndexContext);
  const { items } = props;

  let buildItems = () => {

    if ( items.length === 0 ) {
      return <li className="message">There was an issue resolving the data for this directory</li>
    } else {

      let activeItems = items.filter( (item) => {

        if ( useAll ) {
          return item.name.indexOf(query) > -1;
        } else {
          return item.category === category;
        }
      });

      //let activeItems = items.filter( item => item.category === category );
      
      if ( activeItems.length === 0 ) {
        return <li className="message">No users available in this index</li>
      } else {
        return activeItems.map( (item, index) => {
          return (
            <li className="user" key={index}>
              <a className="user__link"href={`#${index}`}>
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
    <ul ref={ref} className="users" tabIndex="0">
      { buildItems() }
    </ul>
  )
});

export default UserList;
