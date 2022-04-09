import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './auth/auth-context/AuthProvider';
import { useNavigate } from 'react-router';

export default function Header() {
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout =async () => {
      try{ await 
        logout();
        navigate("/login");
      }
      catch(err){
        console.log(err);
      }
    }



  return (
    <header>
      <nav>
          <ul className='navigation'>
              <div className='flex-left'>
                  <li className='nav-link'><Link className='nav-a' to="/dashboard">All Contacts</Link></li>
                  <li className='nav-link'><Link className='nav-a' to="/addcontact">New Contact</Link></li>
                  <li className='nav-link'><Link className='nav-a' to="/favorites">Favorites</Link></li>
              </div>
              <div className='flex-right'>
                  <li className='nav-link2'>Logged in as: {currentUser?.email}</li>
                  <li className='nav-link2'><button onClick={handleLogout}>Logout</button></li>
              </div>
          </ul>
      </nav>
    </header>
  )
}
