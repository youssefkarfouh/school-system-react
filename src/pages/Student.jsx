import { DatePicker, Form, Input, Modal, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../components/ButtonComp';
import { fetchStudents, addStudent, removeStudent } from '../services/student';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'


function Student() {

	const [students, setStudents] = useState([]);
	const [isOpen, setIsOpen] = useState(false);


	const [currentStudent, setCurrentStudent] = useState({ fname: "", lname: "", class: "", group: "", birth: "", genre: "" });

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
			title: 'Class',
			dataIndex: 'class',
			key: "class"
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
					<EditOutlined onClick={() => editStudent(record)} style={{ cursor: "pointer" }} />
					<EyeOutlined  style={{ cursor: "pointer" }} />
				</Space>
			),
		},

	];

	function handleCancel() {
		setIsOpen(false)
	}
	function handleChange(name, value) {

		setCurrentStudent((prevData) => {
			return {
				...prevData,
				[name]: value
			};
		});

		console.log(currentStudent)
	};
	function handleDateChange(date, dateString) {

		setCurrentStudent((prevFormData) => ({
			...prevFormData,
			birth: dateString
		}));
	}
	async function getAllStudent() {
		const data = await fetchStudents();
		console.log("data", data)
		setStudents(data);
	};
	function editStudent(student) {

		console.log(student)
		setCurrentStudent(student)
		setIsOpen(true)
	
		
	}
	function showPreview(){
		setIsOpen(true)
		// setPreview(false)
	}
	
	async function deleteStudent(id) {
		const data = await removeStudent(id);

		setStudents(prev => prev.filter(ele => ele.id !== id))

	}
	async function addNewStudent(studentData) {
		const data = await addStudent(studentData);

		console.log("data", data)

	}
	const onFinish = () => {

		addNewStudent(currentStudent)
		setStudents(prev => [...prev, currentStudent])

		handleCancel();
	};

	useEffect(() => {
		getAllStudent();
	}, []);


	return (
		<>
			<div className="student_wrapper">
				<h4>Gestion Des Etudients</h4>

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
						<Table columns={columns} dataSource={students} />
					</div>
					<div className="student_add">
						<ButtonComp text="Add Student" click={() => setIsOpen(true)} />
					</div>
				</div>
			</div>

		{isOpen && 
		(
			<Modal 
			open={isOpen}
			title="Student Form" onCancel={handleCancel} destroyOnClose={true} footer={null}>

			<div className="mt-5">
				<Form onFinish={onFinish}>
					<Form.Item name="fname" rules={[{ required: true, message: 'Please enter the first name' }]}>
						<Input
							className="input_style"
							placeholder="Enter First Name"
							
							value={currentStudent.fname}
							onChange={(event) => handleChange('fname', event.target.value)}
						/>
					</Form.Item>

					<Form.Item name="lname" rules={[{ required: true, message: 'Please enter the last name' }]}>
						<Input
							className="input_style"
							placeholder="Enter Last Name"
							value={currentStudent.lname}
							onChange={(event) => handleChange('lname', event.target.value)}
						/>
					</Form.Item>

					<Form.Item name="class" rules={[{ required: true, message: 'Please select the class' }]}>
						<Select
							placeholder="Select class"
							className="input_select"
							value={currentStudent.class}
							onChange={(value) => handleChange('class', value)}
							options={[
								{ value: 'Option 1', label: 'Option 1' },
								{ value: 'Option 2', label: 'Option 2' }
							]}
						/>
					</Form.Item>

					<Form.Item name="group" rules={[{ required: true, message: 'Please select the group' }]}>
						<Select
							placeholder="Select group"
							value={currentStudent.group}
							className="input_select"
							onChange={(value) => handleChange('group', value)}
							options={[
								{ value: 'Option 1', label: 'Option 1' },
								{ value: 'Option 2', label: 'Option 2' }
							]}
						/>
					</Form.Item>

					<Form.Item name="birth" rules={[{ required: true, message: 'Please select the birth date' }]}>
						<DatePicker
							value={currentStudent.birth}
							format={'YYYY-MM-DD'}
							style={{ width: '100%' }}
							onChange={handleDateChange}
						/>
					</Form.Item>

					<Form.Item name="genre" rules={[{ required: true, message: 'Please select the genre' }]}>
						<Select
							value={currentStudent.genre}
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

export default Student;
