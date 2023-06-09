import { DatePicker, Form, Input, Modal, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../components/ButtonComp';
import { fetchTeachers, addTeacher, removeTeacher } from '../services/teacher';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'


function Teacher() {

	const [teachers, setTeachers] = useState([]);
	const [isOpen, setIsOpen] = useState(false);


	const [currentTeacher, setCurrentTeacher] = useState({ fname: "", lname: "", matiere: "", genre: "" });

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
			title: 'Matiere',
			dataIndex: 'matiere',
			key: "matiere"

		},
		{
			title: 'Genre',
			dataIndex: 'genre',
			key: "genre"

		},
		
		{
			title: 'Action',
			key: "action",
			render: (_, record) => (
				<Space>
					<DeleteOutlined onClick={() => deleteTeacher(record.id)} style={{ color: "red", cursor: "pointer" }} />
					<EditOutlined onClick={() => editTeacher(record)} style={{ cursor: "pointer" }} />
					<EyeOutlined  style={{ cursor: "pointer" }} />
				</Space>
			),
		},

	];

	function handleCancel() {
		setIsOpen(false)
	}
	function handleChange(name, value) {

		setCurrentTeacher((prevData) => {
			return {
				...prevData,
				[name]: value
			};
		});

		console.log(currentTeacher)
	};

	async function getAllTeachers() {
		const data = await fetchTeachers();
		console.log("data", data)
		setTeachers(data);
	};
	function editTeacher(teacher) {
		console.log(teacher)
		setCurrentTeacher(teacher)
		setIsOpen(true)
	
	}
	function showPreview(){
		setIsOpen(true)
		
	}
	
	async function deleteTeacher(id) {
		const data = await removeTeacher(id);

		setTeachers(prev => prev.filter(ele => ele.id !== id))

	}
	async function addNewTeacher(teacherData) {
		const data = await addTeacher(teacherData);

		console.log("data", data)

	}
	const onFinish = () => {

		addNewTeacher(currentTeacher)
		setTeachers(prev => [...prev, currentTeacher])

		handleCancel();
	};

	useEffect(() => {
		getAllTeachers();
	}, []);


	return (
		<>
			<div className="student_wrapper">
				<h4>Gestion Des Enseignants</h4>

				<div className="mt-5">
					<div className="student_filter">
						<Form onFinish={onFinish} >

							<Form.Item name="name" rules={[{ required: true, message: 'Please enter name!' }]} className='m-0'>
								<Input className="input_style" placeholder="Name" />
							</Form.Item>

							<ButtonComp text="filter" />
						</Form>
					</div>
					<div className="student_list my-5">
						<Table columns={columns} dataSource={teachers} />
					</div>
					<div className="student_add">
						<ButtonComp text="Ajouter Enseignant" click={() => setIsOpen(true)} />
					</div>
				</div>
			</div>

		{isOpen && 
		(
			<Modal 
			open={isOpen}
			title="Teacher Form" onCancel={handleCancel} destroyOnClose={true} footer={null}>

			<div className="mt-5">
				<Form onFinish={onFinish}>
					<Form.Item name="fname" rules={[{ required: true, message: 'Please enter the first name' }]}>
						<Input
							className="input_style"
							placeholder="Enter First Name"
							
							value={currentTeacher.fname}
							onChange={(event) => handleChange('fname', event.target.value)}
						/>
					</Form.Item>

					<Form.Item name="lname" rules={[{ required: true, message: 'Please enter the last name' }]}>
						<Input
							className="input_style"
							placeholder="Enter Last Name"
							value={currentTeacher.lname}
							onChange={(event) => handleChange('lname', event.target.value)}
						/>
					</Form.Item>

					<Form.Item name="matiere" rules={[{ required: true, message: 'Please select the subject' }]}>
						<Select
							placeholder="Select matiere"
							className="input_select"
							value={currentTeacher.class}
							onChange={(value) => handleChange('matiere', value)}
							options={[
								{ value: 'math', label: 'Math' },
								{ value: 'svt', label: 'SVT' }
							]}
						/>
					</Form.Item>

					<Form.Item name="genre" rules={[{ required: true, message: 'Please select the sex' }]}>
						<Select
							value={currentTeacher.sex}
							placeholder="Select genre"
							className="input_select"
							onChange={(value) => handleChange('genre', value)}
							options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
						/>
					</Form.Item>

					<div className="btns_form">
						<ButtonComp text="cancel" click={handleCancel} />
						<ButtonComp type="submit" text="submit" />
					</div>
				</Form>
			</div>
		</Modal>
		)
		
		}

		</>
	);
}

export default Teacher;
