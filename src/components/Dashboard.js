import React from 'react'
import Header from './Header'
import { useCrud } from './context/CrudProvider';
import { useNavigate } from 'react-router';
import "./dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import { faStar  as faStarRegular } from '@fortawesome/free-regular-svg-icons'


export default function Dashboard() {
  const {contacts, handleFavorite, handleUpdateBtn, onDelete} = useCrud();
  const navigate = useNavigate();

  
  return (
    <div>
      <Header />
      <h1>All contacts</h1>
      {contacts.length !== 0 ?  
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Surname</td>
            <td>Mobile</td>
            <td>Manage contact</td>
            <td>Favorites</td>
          </tr>
        </thead>
        <tbody>
      {contacts.map((contact) => {
        return (
          <tr key={contact.uuid}>
            <td>{contact.name}</td>
            <td>{contact.surname}</td>
            <td>{contact.mobile}</td>
            <td style={{textAlign: "center"}}>
              <button className='btn btn-delete' onClick={() => onDelete(contact.uuid, contact.name)}>Delete</button>
              <button className='btn btn-edit' onClick={() => handleUpdateBtn(contact.uuid, navigate)}>Edit</button>
            </td>
            <td style={{textAlign:"center"}}>
              <FontAwesomeIcon onClick={() => {handleFavorite(contact)}}  style={{fontSize:"25px", cursor:"pointer", color:"gold"}} 
              icon={contact.favorite ? faStar : faStarRegular} />
            </td>
          </tr>
        );
      })}
      </tbody>
      </table>
      : ""}
    </div>
  )
}


