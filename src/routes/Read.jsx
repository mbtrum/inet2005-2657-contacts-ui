import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Read() {
  const { id } = useParams();
  // Store the result from API
  const [contact, setContact] = useState(null);

  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      const url = 'http://localhost:3000/api/contacts/get/' + id;
      const response = await fetch(url);
      
      if(response.ok){ 
        const data = await response.json();
        if (!ignore) {
          setContact(data);
        }
      } else {
        setContact(null);
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
    <h1>Read Page for { id }</h1>
    {
      contact ?
      <div>{ contact.firstName + ' ' + contact.lastName } </div> :
      <div>Contact not found.</div>
    }
    </>
  )
}