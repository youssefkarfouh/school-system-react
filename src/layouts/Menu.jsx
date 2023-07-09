import React from 'react';
import { NavLink } from 'react-router-dom';
import IcoDashboard from '../../public/assets/imgs/icons/icoDashboard';
import IcoStudent from '../../public/assets/imgs/icons/icoStudent';
import IcoGroup from '../../public/assets/imgs/icons/icoGroup';
import IcoNotes from '../../public/assets/imgs/icons/icoNotes';
import IcoTime from '../../public/assets/imgs/icons/icoTime';
import IcoTeacher from '../../public/assets/imgs/icons/icoTeacher';
import IcoClass from '../../public/assets/imgs/icons/icoClass';
import IcoRoom from '../../public/assets/imgs/icons/icoRoom';
import IcoComptes from '../../public/assets/imgs/icons/icoComptes';
import IcoBook from '../../public/assets/imgs/icons/icoBook';

function Menu() {
	return (
		<div className="main_menu">
			<ul>
				<li>
					<NavLink to="/dashboard">
						<IcoDashboard />
						Tableau de bord
					</NavLink>
				</li>
				<li>
					<NavLink to={'/etudiants'}>
						<IcoStudent />
						Etudiants
					</NavLink>
				</li>
				<li>
					<NavLink to={'/enseignants'}>
						<IcoTeacher />
						Enseignants
					</NavLink>
				</li>
				<li>
					<NavLink to={'/class'}>
						<IcoClass />
						Classes
					</NavLink>
				</li>
				<li>
					<NavLink to={'/group'}>
						<IcoGroup />Groupes
					</NavLink>
				</li>
				<li>
					<NavLink to={'/subject'}>
						<IcoBook/> 
						Matières</NavLink>
				</li>
				<li>
					<NavLink to={'/salle'}>
						<IcoRoom />
						Salles
					</NavLink>
				</li>
				<li>
					<NavLink to={'/temps'}>
						<IcoTime />
						Emploi du temps
					</NavLink>
				</li>
				<li>
					<NavLink to={'/temps'}>
						<IcoNotes />
						Notes
					</NavLink>
				</li>
				<li>
					<NavLink to={'/users'}>
						<IcoComptes />
						Gestion Utilisateur
					</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default Menu;
