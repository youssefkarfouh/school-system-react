import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu() {
	return (
		<div className="main_menu">
			<ul>
				<li>
					<NavLink to={'/dashboard'}>Tableau de bord</NavLink>
				</li>
				<li>
					<NavLink to={'/etudiants'}>Etudiants</NavLink>
				</li>
				<li>
					<NavLink to={'/enseignants'}>Enseignants</NavLink>
				</li>
				<li>
					<NavLink to={'/class'}>Classes</NavLink>
				</li>
				<li>
					<NavLink to={'/group'}>Groupes</NavLink>
				</li>
				<li>
					<NavLink to={'/subject'}>Matières</NavLink>
				</li>
				<li>
					<NavLink to={'/salle'}>Salles</NavLink>
				</li>
				<li>
					<NavLink to={'/temps'}>Emploi du temps</NavLink>
				</li>
				<li>
					<NavLink to={'/temps'}>Notes</NavLink>
				</li>
				<li>
					<NavLink to={'/users'}>Gestion Utilisateur</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default Menu;
