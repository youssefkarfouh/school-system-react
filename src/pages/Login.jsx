import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import ButtonComp from '../components/ButtonComp';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

function Login() {
	const navigate = useNavigate();

	const onFinish = (values) => {
		console.log('Received values of form: ', values);
		navigate('/dashboard');
	};
	return (
		<div className="login">
			<div className="container">
				<div className="row justify-content-evenly align-items-center">
					<div className="col-md-5">
						<div>
							<img
								src={`${import.meta.env.VITE_IMAGE_DIR}/home_img.svg`}
								className="img-fluid"
								alt="login image"
							/>
						</div>
					</div>
					<div className="col-md-5">
						<div className="mb-5">
							<img
								src={`${import.meta.env.VITE_IMAGE_DIR}/logo.svg`}
								className="img-fluid auth_logo"
								alt="logo"
							/>
						</div>

						<Form  onFinish={onFinish}>
							<Form.Item
								name="username"
								rules={[ { required: true, message: 'Please input your Username!' } ]}
							>
								<Input
									className="input_style"
									prefix={<UserOutlined className="site-form-item-icon" />}
									placeholder="Username"
								/>
							</Form.Item>

							<Form.Item
								name="password"
								rules={[ { required: true, message: 'Please input your Password!' } ]}
							>
								<Input.Password
									className="input_style"
									prefix={<LockOutlined className="site-form-item-icon" />}
									
									placeholder="Password"
								/>
							</Form.Item>

							<div className="mt-5">
								<ButtonComp type="submit" text={'Login'} />
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
