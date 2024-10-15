import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
    // Store the result from API
    const [contacts, setContacts] = useState([]);

    const apiUrl = import.meta.env.VITE_API_HOST;

    useEffect(() => {
      // Fetch data from API
      async function fetchData() {
        const url = apiUrl + '/api/contacts/all';      
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
      <h1>My Contacts</h1>
      <p>
        <Link to="/create" className="btn btn-outline-secondary">Add a Contact</Link>
      </p>
      {
        contacts.length > 0 ?         
        contacts.map((contact, index) => (
          <div key={index}>
            { contact.filename ? <img src={`${apiUrl}/images/${contact.filename}`} className="thumbnail"/> : <span>no image</span> }
            { contact.firstName + ' ' + contact.lastName } <Link to={`/update/${contact.id}`}>Update</Link> <Link to={`/delete/${contact.id}`}>Delete</Link>
          </div>
        )) :
        <div>No contacts.</div>
      }
    </>
  )
}