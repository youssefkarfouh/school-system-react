import { Form, Input, Modal, Popconfirm, Select, Space, Switch, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../components/ButtonComp';
import { fetchUsers, } from '../services/users';
import { EditOutlined } from '@ant-design/icons'
import { IoSearch, IoDownloadOutline, IoPersonAddOutline } from "react-icons/io5";

function Users() {

	const [users, setStudents] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const [isEdit, setIsEdit] = useState(false);
	const [form] = Form.useForm();


	const columns = [
		{
			title: 'First Name',
			dataIndex: 'fname',
			key: "fname"

		},
		{
			title: 'Last Name',
			dataIndex: 'lname',
			key: "lName"

		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: "email"

		},

		{
			title: 'Password',
			dataIndex: 'password',
			key: "password"

		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: "status",
			render: (status) => (status ? 'Enabled' : 'Disabled')

		},

		{
			title: 'Action',
			key: "action",
			render: (_, record) => (
				<Space size={20}>

					<EditOutlined onClick={() => showModal(record, true)} style={{ cursor: "pointer" }} />
				</Space>
			),
		},

	];

	// for modal 
	function handleCancel() {
		setIsOpen(false)
	}
	function showModal(userData, isEdit = false) {

		console.log("userData", userData)

		form.setFieldsValue({

			password: userData.password,
			status: userData.status


		});

		setIsEdit(isEdit)
		setIsOpen(true)
	}


	// for API calls 
	async function getAllUsers() {
		const data = await fetchUsers();
		setStudents(data);
	};


	// async function updateExistStudent(studentData) {

	// 	const data = await updateStudent(studentData);

	// 	getAllStudents()


	// 	message.success('Enregistrement modifé avec succès')

	// }
	// 	message.success('Enregistrement ajouté avec succès')

	// async function getAllClasses(){

	// 	const dataClasses = await fetchClasses();

	// 	setClasses(dataClasses)

	// }

	// for submit datagetAllStudents
	const filter = (values) => {

		console.log(values)
	}
	const onFinish = (values) => {


		console.log("values", values)

		// if (isEdit) {
		// 	updateExistStudent(values)

		// }
		// else {
		// 	addNewStudent(values)
		// }
		handleCancel();
	};


	const switchChange = (checked)=>{
		console.log(checked)
	}

	useEffect(() => {
		getAllUsers();
	}, []);


	return (
		<>

			<h4>Gestion Des Comptes</h4>

			<div className="mt-5">
				<div className="filter_container my-5">
					<Form onFinish={filter} >

						<Form.Item name="name" rules={[{ required: true, message: 'required' }]} className='m-0'>
							<Input className="input_style" placeholder="Name" />
						</Form.Item>

						<button className='filter_btn'>
							<IoSearch />
						</button>

					</Form>
				</div>
			</div>
			<div>
				<Table rowKey={(record) => record.id} columns={columns} dataSource={users} />
			</div>

			{isOpen &&
				(
					<Modal
						open={isOpen}
						title="Form" onCancel={handleCancel} destroyOnClose={true} footer={null}>

						<div className="mt-5">
							<Form form={form} onFinish={onFinish}>

								<Form.Item name="password" rules={[{ required: true, message: 'required' }]}>
									<Input
										placeholder='Entrer le mot de pass'
										className="input_style"
									/>
								</Form.Item>

								<Form.Item name="status" rules={[{ required: true, message: 'required' }]}>
									<Switch checked={form.getFieldValue('status')} onChange={switchChange} />
								</Form.Item>


								<div className="btns_form">
									<ButtonComp type="button" text="Annuler" click={handleCancel} />
									<ButtonComp text={isEdit ? "Modifier" : "Ajouter"} />
								</div>
							</Form>
						</div>
					</Modal>
				)

			}

		</>
	);
}

export default Users;
