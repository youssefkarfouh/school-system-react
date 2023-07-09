import { Form, Input, Modal, Popconfirm, Select, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../components/ButtonComp';
import { fetchSubjects, addSubject, deleteSubject, updateSubject } from '../services/subject';

import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { IoPersonAddOutline } from "react-icons/io5";

import ModalConfirm from '../components/ModalConfirm';


function Subject() {


    const [subjects, setSubjects] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form] = Form.useForm();


    const columns = [
        {
            title: 'Matière',
            dataIndex: 'subject',
            key: "subject"

        },

        {
            title: 'Action',
            key: "action",
            render: (_, record) => (
                <Space size={20}>
                    <ModalConfirm handlFunc={() => removeSubject(record.id)}>
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
    function showModal(subjectData, isPreview = false, isEdit = false) {

        if (subjectData) {
            form.resetFields();
        }

        form.setFieldsValue({
            id: subjectData ? subjectData.id : null,
            subject: subjectData ? subjectData.subject : null,


        });

        setIsPreview(isPreview)
        setIsEdit(isEdit)
        setIsOpen(true)
    }
    // for API calls 
    async function getAllSubjects() {
        const data = await fetchSubjects();
        setSubjects(data);
    };
    async function removeSubject(id) {
        const data = await deleteGroup(id);

        setSubjects(prev => prev.filter(ele => ele.id !== id))

        message.success('Enregistrement supprimé avec succès')
    }
    async function addNewSubject(groupData) {
        const data = await addSubject(groupData);
        setSubjects(prev => [data, ...prev])

        message.success('Enregistrement ajouté avec succès')
    }
    async function updateExistSubject(groupData) {

        const data = await updateSubject(groupData);

        getAllSubjects()


        message.success('Enregistrement modifé avec succès')

    }
    async function getAllSubjects() {

        const dataSubjects = await fetchSubjects();

        setSubjects(dataSubjects)

    }


    // for submit data

    const onFinish = (values) => {

        if (isEdit) {
            updateExistSubject(values)
        }
        else {
            addNewSubject(values)
        }
        handleCancel();
    };


    useEffect(() => {
        getAllSubjects();
    }, []);


    return (
        <>

            <h4>Gestion Des Matières</h4>

            <div className="my-5">
                <div className="buttons_wrapper">

                    <ButtonComp text="Ajouter Matière" click={() => showModal(null, false, false)} >
                        <IoPersonAddOutline />
                    </ButtonComp>
                </div>

            </div>
            <div >
                <Table rowKey={(record) => record.id} columns={columns} dataSource={subjects} />
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

                                <Form.Item name="subject" rules={[{ required: true, message: 'required' }]}>
                                    <Input
                                        className="input_style"
                                        placeholder="Group"
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

export default Subject;
