import React from 'react'
import Header from './Header'
import { useCrud } from './context/CrudProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import { faStar  as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router'

export default function Favorites() {
  const navigate = useNavigate();
  const {contacts, handleFavorite, handleUpdateBtn, onDelete} = useCrud();
  
 
  return (
    <div>
      <Header />
      <h1>Favorites</h1>
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
        if(contact.favorite){ 
          return (<tr key={contact.uuid}>
            <td>{contact.name}</td>
            <td>{contact.surname}</td>
            <td>{contact.mobile}</td>
            <td>
              <button className='btn btn-delete' onClick={() => onDelete(contact.uuid, contact.name)}>Delete</button>
              <button className='btn btn-edit' onClick={() => handleUpdateBtn(contact.uuid, navigate)}>Edit</button>
            </td>
            <td style={{textAlign:"center"}}>
              <FontAwesomeIcon onClick={() => {handleFavorite(contact)}}  style={{fontSize:"25px", cursor:"pointer", color:"gold"}} 
              icon={contact.favorite ? faStar : faStarRegular} />
            </td>
          </tr>);
        }
      })}
      </tbody>
      </table>
    </div>
  )
}
