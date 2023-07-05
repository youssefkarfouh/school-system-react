import { DatePicker, Form, Input, Modal, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../components/ButtonComp';
import { fetchTeachers, addTeacher, removeTeacher , updateTeacher } from '../services/teacher';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { IoSearch , IoDownloadOutline , IoPersonAddOutline } from "react-icons/io5";



function Teacher() {

	const [teachers, setTeachers] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isPreview, setIsPreview] = useState(false);
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
					<EditOutlined onClick={() => showModal(record , false,true)} style={{ cursor: "pointer" }} />
					<EyeOutlined onClick={() => showModal(record, true , false)} style={{ cursor: "pointer" }} />
				</Space>
			),
		},

	];

	function handleCancel() {
		setIsOpen(false)
	}
	function closeModal() {
		setIsOpen(false)
	}

	async function getAllTeachers() {
		const data = await fetchTeachers();
		console.log("data", data)
		setTeachers(data);
	};

	function showModal(teacherData, isPreview= false , isEdit=false) {
		if(teacherData){
			form.setFieldsValue({ ...teacherData })
		}
		setIsPreview(isPreview)
		setIsEdit(isEdit)
		setIsOpen(true)
	}

	async function deleteTeacher(id) {
		const data = await removeTeacher(id);

		setTeachers(prev => prev.filter(ele => ele.id !== id))

	}
	async function addNewTeacher(teacherData) {
		const data = await addTeacher(teacherData);
		setTeachers(prev => [...prev, data])

	}
	async function updateExistTeacher(teacherData) {
		
		// const data = await updateTeacher(teacherData);
		
		console.log(teacherData)

	}
	const onFinish = (values) => {

		if(isEdit){
			updateExistTeacher(values)
		}
		else{
			addNewTeacher(values)
		}
		handleCancel();
	};

	useEffect(() => {
		getAllTeachers();
	}, []);


	return (
		<>
			<h4>Gestion Des Enseignants</h4>

			<div className="mt-5">
				<div className="buttons_wrapper">
					<ButtonComp text="Exporter la liste" click={() => exportList()} >
						<IoDownloadOutline/>
					</ButtonComp>
					<ButtonComp text="Ajouter Enseignant" click={() => showModal(null , false,false)} >
				    	<IoPersonAddOutline/>
					</ButtonComp>
				</div>
				<div className="filter_container my-5">
					<Form onFinish={onFinish} >

						<Form.Item name="name" rules={[{ required: true, message: 'Please enter name!' }]} className='m-0'>
							<Input className="input_style" placeholder="Name" />
						</Form.Item>

						<button className='filter_btn'>
							<IoSearch />
						</button>

					</Form>
				</div>
			</div>
			<div className="student_list ">
				<Table rowKey={(record) => record.id} columns={columns} dataSource={teachers} />
			</div>

			{isOpen &&
				(
					<Modal
						open={isOpen}
						title="Teacher Form" onCancel={handleCancel} destroyOnClose={true} footer={null}>

						<div className="mt-5">
							<Form form={form} disabled={isPreview} onFinish={onFinish}>
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

								<Form.Item name="matiere" rules={[{ required: true, message: 'Please select the subject' }]}>
									<Select
										placeholder="Select matiere"
										className="input_select"
										options={[
											{ value: 'math', label: 'Math' },
											{ value: 'svt', label: 'SVT' }
										]}
									/>
								</Form.Item>

								<Form.Item name="genre" rules={[{ required: true, message: 'Please select the sex' }]}>
									<Select

										placeholder="Select genre"
										className="input_select"

										options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
									/>
								</Form.Item>

								<div className="btns_form">
									<ButtonComp type="button" text="Annuler" click={closeModal} />
									{isPreview === false && <ButtonComp  text={isEdit ? "Modifier" : "Ajouter"} />}
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
