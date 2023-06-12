import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu() {
	return (
		<div className="main_menu">
			<ul>
				<li>
					<NavLink to={'/dashboard'}>Dashboard</NavLink>
				</li>
				<li>
					<NavLink to={'/etudiants'}>Etudiants</NavLink>
				</li>
				<li>
					<NavLink to={'/enseignants'}>Enseignants</NavLink>
				</li>
				<li>
					<NavLink end to={'/lycee'}>Lycee</NavLink>
          <ul className='ps-3'>
              <li>
                <NavLink to={'/lycee/class'}>Class</NavLink>
              </li>
              <li>
                <NavLink to={'/lycee/matiere'}>Matiere</NavLink>
              </li>
              <li>
                <NavLink to={'/lycee/group'}>Group</NavLink>
              </li>
             
          </ul>
				</li>
				<li>
					<NavLink to={'/users'}>Gestion Utilisateur</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default Menu;
