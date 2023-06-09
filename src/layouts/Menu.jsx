import React from 'react'
import { NavLink } from 'react-router-dom'

function Menu() {
  return (
    <div className='main_menu'>
      <ul>
        <li>
          <NavLink to={"/dashboard"} >Dashboard</NavLink>
        </li>
        <li>
          <NavLink to={"/students"} >Etudiant</NavLink>
        </li>
        <li>
          <NavLink to={"/teachers"} >Enseignat</NavLink>
        </li>
        <li>
          Lycée
        </li>
        <li>
          <NavLink to={"/users-managment"} >Gestion Utilisateur</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Menu