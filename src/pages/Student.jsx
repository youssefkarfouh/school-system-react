import { DatePicker, Form, Input, Modal, Popconfirm, Select, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../components/ButtonComp';
import { fetchStudents, addStudent, removeStudent, updateStudent } from '../services/student';
import { fetchClasses } from '../services/class';
import { fetchGroups } from '../services/group';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { IoSearch, IoDownloadOutline, IoPersonAddOutline } from "react-icons/io5";
import dayjs from 'dayjs';
import ModalConfirm from '../components/ModalConfirm';

function Student() {

	const [students, setStudents] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isPreview, setIsPreview] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [form] = Form.useForm();
	const [classes , setClasses] = useState([]);
	const [groupes , setGroupes] = useState([]);



	const classesOptions = classes.map(ele=>{
		return { value: ele.id, label: ele.class }
	})
	const groupOptions = groupes.map(ele=>{
		return { value: ele.id, label: ele.group }
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
			title: 'Group',
			dataIndex: 'group',
			key: "group"

		},

		{
			title: 'Birth',
			dataIndex: 'birth',
			key: "birth"

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
					<ModalConfirm handlFunc={() => deleteStudent(record.id)}>
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
	function showModal(studentData, isPreview = false, isEdit = false) {

		console.log("studentData" , studentData)
		if (studentData) {
			form.resetFields(); 
		}

		form.setFieldsValue({
			id: studentData ? studentData.id : null,
			fname: studentData ? studentData.fname : null,
			lname: studentData ? studentData.lname : null,
			genre: studentData ? studentData.genre : null, 
			group: studentData ? studentData.group : null,
			class: studentData ? studentData.class : null,
			birth: studentData ?  dayjs(studentData.birth) : null,
		});

		setIsPreview(isPreview)
		setIsEdit(isEdit)
		setIsOpen(true)
	}
	// for API calls 
	async function getAllStudents() {
		const data = await fetchStudents();
		setStudents(data);
	};
	async function deleteStudent(id) {
		const data = await removeStudent(id);

		setStudents(prev => prev.filter(ele => ele.id !== id))

		message.success('Enregistrement supprimé avec succès')
	}
	async function addNewStudent(studentData) {
		const data = await addStudent(studentData);
		setStudents(prev => [data, ...prev])

		message.success('Enregistrement ajouté avec succès')
	}
	async function updateExistStudent(studentData) {

		const data = await updateStudent(studentData);

		getAllStudents()


		message.success('Enregistrement modifé avec succès')

	}

	async function getAllClasses(){

		const dataClasses = await fetchClasses();
		
		setClasses(dataClasses)
		
	}
	async function getAllGroupes(){

		const dataGroupes = await fetchGroups();
		
		setGroupes(dataGroupes)
		
	}

	// for submit data
	const filter = (values) => {

		const {name} = values;
		const data = students.filter(ele => ele.fname.startsWith(name));

		setStudents(data)
	}
	const onFinish = (values) => {
	

		console.log(values)
		if (isEdit) {
			updateExistStudent(values)
		}
		else {
			addNewStudent(values)
		}
		handleCancel();
	};


	const exportList = () => {
	}

	const selectChange = (value)=>{
		console.log(value)
	}

	useEffect(() => {
		getAllStudents();
		getAllClasses();
		getAllGroupes();
	}, []);


	return (
		<>

			<h4>Gestion Des Etudiants</h4>

			<div className="mt-5">
				<div className="buttons_wrapper">
					<ButtonComp text="Exporter la liste" click={() => exportList()} >
						<IoDownloadOutline />
					</ButtonComp>
					<ButtonComp text="Ajouter etudiant" click={() => showModal(null, false, false)} >
						<IoPersonAddOutline />
					</ButtonComp>
				</div>
				<div className="filter_container my-5">
					<Form onFinish={filter} >

						<Form.Item name="name" rules={[{ required: true, message: 'required' }]} className='m-0'>
							<Input className="input_style" placeholder="Prénom" />
						</Form.Item>

						<button className='filter_btn'>
							<IoSearch />
						</button>

					</Form>
				</div>
			</div>
			<div >
				<Table rowKey={(record) => record.id} columns={columns} dataSource={students} />
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
								<Form.Item name="fname" rules={[{ required: true, message: 'required' }]}>
									<Input
										className="input_style"
										placeholder="Enter First Name"
									/>
								</Form.Item>

								<Form.Item name="lname" rules={[{ required: true, message: 'required' }]}>
									<Input
										className="input_style"
										placeholder="Enter Last Name"

									/>
								</Form.Item>

								<Form.Item name="class" rules={[{ required: true, message: 'required' }]}>
									<Select
									onChange={selectChange}
										placeholder="Class"
										className="input_select"
										options={classesOptions}
									/>
								</Form.Item>
								<Form.Item name="group" rules={[{ required: true, message: 'required' }]}>
									<Select
										placeholder="Group"
										className="input_select"
										options={groupOptions}
									/>
								</Form.Item>

								<Form.Item name="genre" rules={[{ required: true, message: 'required' }]}>
									<Select

										placeholder="Select genre"
										className="input_select"

										options={[{ value: 'F', label: 'F' }, { value: 'M', label: 'M' }]}
									/>
								</Form.Item>

								<Form.Item name="birth" rules={[{ required: true, message: 'required' }]}>
									<DatePicker format={'DD-MM-YYYY'} style={{ width: '100%' }} />
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

export default Student;
