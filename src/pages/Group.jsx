import { DatePicker, Form, Input, Modal, Popconfirm, Select, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../components/ButtonComp';
import { fetchGroups, addGroup, deleteGroup, updateGroup } from '../services/group';

import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { IoSearch, IoDownloadOutline, IoPersonAddOutline } from "react-icons/io5";

import ModalConfirm from '../components/ModalConfirm';
import { fetchClasses } from '../services/class';

function Group() {

    const [groupes, setGroups] = useState([]);
    const [classes, setClasses] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form] = Form.useForm();


	const classesOptions = classes.map(ele=>{
		return { value: ele.id, label: ele.class }
	})


    const columns = [
        {
            title: 'Group',
            dataIndex: 'group',
            key: "group"

        },

        {
            title: 'Class',
            dataIndex: 'class',
            key: "class"

        },

        {
            title: 'Action',
            key: "action",
            render: (_, record) => (
                <Space size={20}>
                    <ModalConfirm handlFunc={() => removeGroup(record.id)}>
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
    function showModal(groupData, isPreview = false, isEdit = false) {

        console.log("groupData", groupData)
        if (groupData) {
            form.resetFields();
        }

        form.setFieldsValue({
            id: groupData ? groupData.id : null,
            class: groupData ? groupData.class : null,
            group: groupData ? groupData.group : null,

        });

        setIsPreview(isPreview)
        setIsEdit(isEdit)
        setIsOpen(true)
    }
    // for API calls 
    async function getAllGroupes() {
        const data = await fetchGroups();
        setGroups(data);
    };
    async function removeGroup(id) {
        const data = await deleteGroup(id);

        setGroups(prev => prev.filter(ele => ele.id !== id))

        message.success('Enregistrement supprimé avec succès')
    }
    async function addNewGroup(groupData) {
        const data = await addGroup(groupData);
        setGroups(prev => [data, ...prev])

        message.success('Enregistrement ajouté avec succès')
    }
    async function updateExistGroup(groupData) {

        const data = await updateGroup(groupData);

        getAllGroupes()


        message.success('Enregistrement modifé avec succès')

    }
	async function getAllClasses(){

		const dataClasses = await fetchClasses();
		
		setClasses(dataClasses)
		
	}


    // for submit data
    const filter = (values) => {

        console.log(values)
    }
    const onFinish = (values) => {

        if (isEdit) {
            updateExistGroup(values)
        }
        else {
            addNewGroup(values)
        }
        handleCancel();
    };


    useEffect(() => {
        getAllGroupes();
        getAllClasses();
    }, []);


    return (
        <>

            <h4>Gestion Des Groupes</h4>

            <div className="mt-5">
                <div className="buttons_wrapper">

                    <ButtonComp text="Ajouter Group" click={() => showModal(null, false, false)} >
                        <IoPersonAddOutline />
                    </ButtonComp>
                </div>
                {/* <div className="filter_container my-5">
                    <Form onFinish={filter} >

                        <Form.Item name="class" rules={[{ required: true, message: 'required' }]} className='m-0'>
                            <Select
                                placeholder="Class"
                                className="input_select"
                                options={classesOptions}
                            />
                        </Form.Item>

                        <button className='filter_btn'>
                            <IoSearch />
                        </button>

                    </Form>
                </div> */}
            </div>
            <div >
                <Table rowKey={(record) => record.id} columns={columns} dataSource={groupes} />
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

                                <Form.Item name="group" rules={[{ required: true, message: 'required' }]}>
                                    <Input
                                        className="input_style"
                                        placeholder="Group"
                                    />
                                </Form.Item>

                                <Form.Item name="class" rules={[{ required: true, message: 'required' }]}>
									<Select
										placeholder="Class"
										className="input_select"
										options={classesOptions}
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

export default Group;
