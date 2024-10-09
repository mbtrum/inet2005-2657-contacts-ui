import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
    // Store the result from API
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
      // Fetch data from API
      async function fetchData() {
        const url = 'http://localhost:3000/api/contacts/all';      
        const response = await fetch(url);
        if(response.ok){ 
          const data = await response.json();
          if (!ignore) {
            setContacts(data);
          }
        } else {
          setContacts(null);
        }
      }
  
      let ignore = false;
      fetchData();
      return () => {
         ignore = true;
      }
    }, []);

  return (
    <>
      <h1>Home Page</h1>
      <p>
        <Link to="/create">Add a Contact</Link>
      </p>
      {
        contacts.length > 0 ?         
        contacts.map((contact, index) => {
          return <div key={index}>{ contact.firstName + ' ' + contact.lastName }</div>
        }) :
        <div>No contacts.</div>
      }
    </>
  )
}