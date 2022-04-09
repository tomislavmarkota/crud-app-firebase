import React, {useContext, useState, useEffect} from 'react'
import { db } from '../firebase';
import {onValue, ref, update, remove} from "firebase/database";




const CrudContext = React.createContext();

export const useCrud = () => {return useContext(CrudContext)}


export default function CrudProvider({children}) {
      
  const [contacts, setContacts] = useState([]);
  const [mobile, setMobile] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [permUuid, setPermUuid] = useState("");
  const [prevValue, setPrevValue] = useState({});
  
  const handleMobile = (e) => {
    setMobile(e.target.value);
  }
  const handleName = (e) => {
      setName(e.target.value);
  }
  const handleSurname = (e) => {
      setSurname(e.target.value);
  }

  // read
  useEffect(() => {
    onValue(ref(db), snapshot => {
      setContacts([]);
      const data = snapshot.val();
      if(data !== null){
        Object.values(data).map(data => {
          return setContacts(prevContacts => [...prevContacts, data]);
        })
      }
    });
  }, []) 

  const handleFavorite = (contact) => {
    update(ref(db, `/${contact.uuid}`), {
    favorite: !contact.favorite
  })
  }

  const handleUpdateBtn = (uuid, navigate, name, surname, birthDate) => {
    navigate(`/updatecontact/${uuid}`);
    setPermUuid(uuid);
    setPrevValue({
      name,
      surname,
      birthDate,
      uuid,
    })
  }

  // delete

  const onDelete = (uuid, name) => {
    if(window.confirm(`Delete ${name} from contacts?`)){
    remove(ref(db, `/${uuid}`));
    }else{
      return;
    }
  }


  const value = {
    contacts,
    name,
    surname,
    mobile,
    permUuid,
    prevValue, 
    setPrevValue,
    setPermUuid,
    handleMobile,
    handleName,
    handleSurname,
    setName,
    setSurname,
    setMobile,
    handleFavorite,
    handleUpdateBtn,
    onDelete
    
  }  


  
    return (
    <CrudContext.Provider value={value}>
        {children}
    </CrudContext.Provider>
  )
}
