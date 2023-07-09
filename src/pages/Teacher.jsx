import { Form, Input, Modal, Popconfirm, Select, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../components/ButtonComp';
import { fetchTeachers, addTeacher, removeTeacher, updateTeacher } from '../services/teacher';
import { fetchSubjects } from '../services/subject';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { IoSearch, IoDownloadOutline, IoPersonAddOutline } from "react-icons/io5";

import ModalConfirm from '../components/ModalConfirm';

function Teacher() {

	const [teachers, setTeachers] = useState([]);
	const [subjects, setSubjects] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isPreview, setIsPreview] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [form] = Form.useForm();


	const subjectOptions = subjects.map(ele=>{
		return { value: ele.id, label: ele.subject }
	})


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
				<Space size={20}>
					<ModalConfirm handlFunc={()=>deleteTeacher(record.id)}>
						<DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
					</ModalConfirm>

					<EditOutlined onClick={() => showModal(record, false, true)} style={{ cursor: "pointer" }} />
					<EyeOutlined onClick={() => showModal(record, true, false)} style={{ cursor: "pointer" }} />
				</Space>
			),
		},

	];

	// for modal 
	function handleCancel() {
		setIsOpen(false)
	}
	function showModal(teacherData, isPreview = false, isEdit = false) {

		if (teacherData) {
			form.resetFields();
		}

		form.setFieldsValue({
			id: teacherData ? teacherData.id : null,
			fname: teacherData ? teacherData.fname : null,
			lname: teacherData ? teacherData.lname : null,
			matiere: teacherData ? teacherData.matiere : null,
			genre: teacherData ? teacherData.genre : null,
		});

		setIsPreview(isPreview)
		setIsEdit(isEdit)
		setIsOpen(true)
	}

	// for API calls 
	async function getAllTeachers() {
		const data = await fetchTeachers();
		console.log("data", data)
		setTeachers(data);
	};
	async function getAllSubjects() {
		const data = await fetchSubjects();
		console.log("data", data)
		setSubjects(data);
	};
	async function deleteTeacher(id) {
		const data = await removeTeacher(id);

		setTeachers(prev => prev.filter(ele => ele.id !== id))

		message.success('Enregistrement supprimé avec succès')
	}
	async function addNewTeacher(teacherData) {
		const data = await addTeacher(teacherData);
		setTeachers(prev => [...prev, data])

		message.success('Enregistrement ajouté avec succès')
	}
	async function updateExistTeacher(teacherData) {

		const data = await updateTeacher(teacherData);

		getAllTeachers()

		
		message.success('Enregistrement modifé avec succès')

	}

	// for submit data
	const filter = (values) => {

		const {name} = values;
		const data = students.filter(ele => ele.fname.startsWith(name));

		setTeachers(data)
	}
	const onFinish = (values) => {

		console.log(values)
		if (isEdit) {
			updateExistTeacher(values)
		}
		else {

			const {matiere} = values;
			addNewTeacher(values)
		}
		handleCancel();
	};

	// other 
	const exportList = () => {
	}

	useEffect(() => {
		getAllTeachers();
		getAllSubjects();

	}, []);


	return (
		<>

			<h4>Gestion Des Enseignants</h4>

			<div className="mt-5">
				<div className="buttons_wrapper">
					<ButtonComp text="Exporter la liste" click={() => exportList()} >
						<IoDownloadOutline />
					</ButtonComp>
					<ButtonComp text="Ajouter Enseignant" click={() => showModal(null, false, false)} >
						<IoPersonAddOutline />
					</ButtonComp>
				</div>
				<div className="filter_container my-5">
					<Form onFinish={filter} >

						<Form.Item name="name" rules={[{ required: true, message: 'Please enter name!' }]} className='m-0'>
							<Input className="input_style" placeholder="Prénom" />
						</Form.Item>

						<button className='filter_btn'>
							<IoSearch />
						</button>

					</Form>
				</div>
			</div>
			<div >
				<Table rowKey={(record) => record.id} columns={columns} dataSource={teachers} />
			</div>

			{isOpen &&
				(
					<Modal
						open={isOpen}
						title="Form" onCancel={handleCancel} destroyOnClose={true} footer={null}>

						<div className="mt-5">
							<Form form={form} disabled={isPreview} onFinish={onFinish}>

								<Form.Item name="id" initialValue={form.getFieldValue('id')} style={{ display: 'none' }}>
									<Input type="hidden" />
								</Form.Item>
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
										options={subjectOptions}
									/>
								</Form.Item>

								<Form.Item name="genre" rules={[{ required: true, message: 'Please select the sex' }]}>
									<Select

										placeholder="Select genre"
										className="input_select"

										options={[{ value: 'F', label: 'F' }, { value: 'M', label: 'M' }]}
									/>
								</Form.Item>

								<div className="btns_form">
									<ButtonComp type="button" text="Annuler" click={handleCancel} />
									{isPreview === false && <ButtonComp text={isEdit ? "Modifier" : "Ajouter"} />}
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
