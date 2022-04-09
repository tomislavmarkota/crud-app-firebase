import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import {uid} from "uid";
import {onValue, ref, set, update} from "firebase/database";
import { db } from './firebase';
import Header from './Header';
import { useParams } from 'react-router';

const initialState = {
  name: "",
  surname: "",
  birthDate: "",
  uuid: ""
}

export default function Contact() {
  const nameRef = useRef();
  const navigate = useNavigate();
  const {id} = useParams();
  const [data, setData] = useState({});
  const [state, setState] = useState(initialState);
  const {name, surname, mobile} = state;

 

  useEffect(() => {
    onValue(ref(db), snapshot => {
      setData({});
      const data = snapshot.val();
      if(data !== null){
        setData({...data})
      }else{
          setData({})
      }
    });

    return () => {
        setData({});
    }
  }, [id]) 

  useEffect(() => {
    if(id){
        setState({ ...data[id]});
    }else{
        setState({...initialState});
    }

    return () => {
        setState({...initialState});
    };

  }, [id, data]);



  const handleInputChange = (e) => {
      const {name, value} = e.target;
      setState({...state, [name]: value})
  }

  

  

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if(!id){
        const uuid = uid();
        set(ref(db, `/${uuid}`), {
            name,
            surname,
            mobile,
            uuid,
            favorite: false
          });
        setState({...initialState})
        navigate("/dashboard")
    }else{
        update(ref(db, `/${id}`), {
            name,
            surname,
            mobile,
            uuid: id,
            favorite: false
        })
        navigate("/dashboard");
    }
    
  }


  return (
    <>
        <Header />
        <div className='align-centerDiv'>
          <div className='auth-card'>

            {   id
                ?
                <h1>Edit your contact</h1>
                :
                <h1>Create your contact</h1>
            }

            <form onSubmit={onFormSubmit}>
              <label htmlFor='name'>Name:</label>
              <input type="text" name="name" id='name' onChange={handleInputChange} ref={nameRef} value={name || ""} placeholder="Enter contact name" required/>
              <label htmlFor='surname'>Surname:</label>
              <input type="text" name="surname" id='surname' onChange={handleInputChange} value={surname || ""} placeholder="Enter contact surname" required />
              <label htmlFor='mobile' >Mobile:</label>
              <input type="tel" id="mobile" name="mobile" onChange={handleInputChange} value={mobile || ""} placeholder="Enter contact phone number" required/>
              <input type="submit" value={id ? "Update" :  "Submit"}/>
            </form> 
          </div>
        </div> 
    </>
  )
}
