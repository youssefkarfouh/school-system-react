import React from 'react';
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { IoPersonOutline , IoChevronDownSharp } from "react-icons/io5";



function TopBar() {
	const items = [
		{
			key: '1',
			label: <Link>My Profile</Link>
		},
		{
			key: '2',
			label: <Link to={'/'}>Logout</Link>
		}
	];

	return (
		<div className="top_bar">
			<div>
				<Link to={'/dashboard'}>
					<img src={`${import.meta.env.VITE_IMAGE_DIR}/logo.svg`} className="logo" alt="logo" />
				</Link>
			</div>

			<div className="logged_user">
				<Dropdown
					menu={{
						items
					}}
				>
					<a onClick={(e) => e.preventDefault()}>
						<Space>
							<IoPersonOutline />
							Admin
							
							<IoChevronDownSharp />
						</Space>
					</a>
				</Dropdown>
			</div>
		</div>
	);
}

export default TopBar;
