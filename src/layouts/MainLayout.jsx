import React from 'react';
import Menu from './Menu';
import TopBar from './TopBar';
import { Outlet } from 'react-router-dom';

function MainLayout() {
	return (
		<div className="main_layout">
			<div className="main_layout_bar">
				<TopBar />
			</div>
			<div className="main_content_wrapper">
				<div className="main_content_menu">
					<Menu />
				</div>
				<div className="main_content">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default MainLayout;
