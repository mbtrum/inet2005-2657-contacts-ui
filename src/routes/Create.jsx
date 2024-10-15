import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Create() {
  // Api URL
  const apiUrl = import.meta.env.VITE_API_HOST + '/api/contacts/create';

  // Form state variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState(null);

  function addContact(event){
    event.preventDefault();

    // create a FormData
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('image', imageFile);

    // use fetch to post form to Api
    async function postData() {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if(response.ok){
        window.location.href = '/';
      }
      else {
        // handle error
      }
    }

    postData();
  }

  return (
    <>
      <h1>Add new contact</h1>

      <form onSubmit={addContact} method="post" encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input required type="text" name="firstName" className="form-control bg-light" value={firstName} onChange={e => setFirstName(e.target.value)}  />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input required type="text" name="lastName" className="form-control bg-light" value={lastName} onChange={e => setLastName(e.target.value)}  />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" name="phone" className="form-control bg-light" value={phone} onChange={e => setPhone(e.target.value)}  />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input required type="text" name="email" className="form-control bg-light" value={email} onChange={e => setEmail(e.target.value)}  />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input type="file" name="image" className="form-control bg-light" onChange={e => setImageFile(e.target.files[0])} />
          </div>   

          <button type="submit" className="btn btn-primary">Add</button>
          <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
      </form>
    </>
  )
}