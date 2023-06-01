import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import ButtonComp from '../components/ButtonComp';


function Register() {

	const onFinish = (values) => {
		console.log('Received values of form: ', values);
		
	};


	return (
		<Form   onFinish={onFinish}>
			<Form.Item name="username" rules={[ { required: true, message: 'Please input your Username!' } ]}>
				<Input
					className="input_style"
					prefix={<UserOutlined className="site-form-item-icon" />}
					placeholder="Username"
				/>
			</Form.Item>

			<Form.Item
				name="password"
				hasFeedback
				rules={[ { required: true, message: 'Please input your Password!' } ]}
			>
				<Input.Password
					className="input_style"
					prefix={<LockOutlined className="site-form-item-icon" />}
					placeholder="Password"
				/>
			</Form.Item>

			<Form.Item
				name="confirm"
				dependencies={[ 'password' ]}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Please confirm your password!'
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('The two passwords that you entered do not match!'));
						}
					})
				]}
			>
				<Input.Password
					className="input_style"
					placeholder="Confirm Password"
					prefix={<LockOutlined className="site-form-item-icon" />}
				/>
			</Form.Item>

			<ButtonComp text={'Register'} />
		</Form>
	);
}

export default Register;
