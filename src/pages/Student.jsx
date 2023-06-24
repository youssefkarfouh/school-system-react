import { DatePicker, Form, Input, Modal, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../components/ButtonComp';
import { fetchStudents, addStudent, removeStudent } from '../services/student';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'


function Student() {

	const [students, setStudents] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
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
			key: "lname"
		},
		{
			title: 'Genre',
			dataIndex: 'genre',
			key: "genre"
		},
		{
			title: 'Birth',
			dataIndex: 'birth',
			key: "birth"
		},
		
		{
			title: 'Group',
			dataIndex: 'group',
			key: "group"
		},
		{
			title: 'Action',
			key: "action",
			render: (_, record) => (
				<Space>
					<DeleteOutlined onClick={() => deleteStudent(record.id)} style={{ color: "red", cursor: "pointer" }} />
					<EditOutlined onClick={() => showPreview(record)} style={{ cursor: "pointer" }} />
					<EyeOutlined onClick={() => showPreview(record , true)} style={{ cursor: "pointer" }} />
				</Space>
			),
		},

	];

	function closeModal() {
		setIsOpen(false)
	}
	async function getAllStudent() {
		const data = await fetchStudents();
		console.log("data", data)
		setStudents(data);
	};

	function showPreview(studentData , isDisabled = false) {
		form.setFieldsValue(studentData)
		setIsDisabled(isDisabled)
		setIsOpen(true)
	}

	async function deleteStudent(id) {
		const data = await removeStudent(id);

		setStudents(prev => prev.filter(ele => ele.id !== id))

	}
	async function addNewStudent(studentData) {
		const data = await addStudent(studentData);

		console.log("data", data)

	}
	const onFinish = (values) => {

		console.log(values)
		// addNewStudent(currentStudent)
		// setStudents(prev => [...prev, currentStudent])

		closeModal();
	};

	useEffect(() => {
		getAllStudent();
	}, []);


	return (
		<>

			<h4>Gestion Des Etudients</h4>

			<div className="mt-5">
				<div className="filter_container">
					<Form onFinish={onFinish} >

						<Form.Item name="name" rules={[{ required: true, message: 'Please enter name!' }]} className='m-0'>
							<Input className="input_style" placeholder="Name" />
						</Form.Item>

					</Form>
				</div>
				<div className="my-3">
					<Table rowKey={(record) => record.id} columns={columns} dataSource={students} />
				</div>
				<div className="student_add">
					<ButtonComp text="Add Etudiant" click={() => setIsOpen(true)} />
				</div>
			</div>


			{isOpen &&
				(
					<Modal
						open={isOpen}
						title="Student Form" onCancel={closeModal} destroyOnClose={true} footer={null}>

						<div className="mt-5">
							<Form form={form} disabled={isDisabled} onFinish={onFinish}>
								<Form.Item name="fname" rules={[{ required: true, message: 'Please enter the first name' }]}>
									<Input
										className="input_style"
										placeholder="Enter First Name"
									/>
								</Form.Item>

								<Form.Item name="lname" rules={[{ required: true, message: 'Please enter the last name' }]}>
									<Input
										className="input_style"
										placeholder="Enter Last Name"
									/>
								</Form.Item>

								<Form.Item name="group" rules={[{ required: true, message: 'Please select the group' }]}>
									<Select
										placeholder="Select group"
										
										className="input_select"
										
										options={[
											{ value: 'Option 1', label: 'Option 1' },
											{ value: 'Option 2', label: 'Option 2' }
										]}
									/>
								</Form.Item>

								<Form.Item name="birth" rules={[{ required: true, message: 'Please select the birth date' }]}>
									<DatePicker

										format={'YYYY-MM-DD'}
										style={{ width: '100%' }}
										
									/>
								</Form.Item>

								<Form.Item name="genre" rules={[{ required: true, message: 'Please select the genre' }]}>
									<Select
										
										placeholder="Select genre"
										className="input_select"
										
										options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
									/>
								</Form.Item>

								<div className="btns_form">
									<ButtonComp text="cancel" click={closeModal} />
									<ButtonComp text="submit" />
								</div>
							</Form>
						</div>
					</Modal>
				)

			}

		</>
	);
}

export default Student;
