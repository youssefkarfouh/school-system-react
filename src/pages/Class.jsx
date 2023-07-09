import { DatePicker, Form, Input, Modal, Popconfirm, Select, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../components/ButtonComp';
import { fetchClasses, addClass, deleteClass, updateClass } from '../services/class';

import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { IoPersonAddOutline } from "react-icons/io5";

import ModalConfirm from '../components/ModalConfirm';

function Class() {

    const [classes, setClasses] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form] = Form.useForm();



    const columns = [
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
                    <ModalConfirm handlFunc={() => removeClass(record.id)}>
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
    function showModal(classData, isPreview = false, isEdit = false) {

        console.log("classData", classData)
        if (classData) {
            form.resetFields();
        }

        form.setFieldsValue({
            id: classData ? classData.id : null,
            class: classData ? classData.class : null,

        });

        setIsPreview(isPreview)
        setIsEdit(isEdit)
        setIsOpen(true)
    }
    // for API calls 
    async function getAllClasses() {
        const data = await fetchClasses();
        setClasses(data);
    };
    async function removeClass(id) {
        const data = await deleteClass(id);

        setClasses(prev => prev.filter(ele => ele.id !== id))

        message.success('Enregistrement supprimé avec succès')
    }
    async function addNewClass(studentData) {
        const data = await addClass(studentData);
        setClasses(prev => [data, ...prev])

        message.success('Enregistrement ajouté avec succès')
    }
    async function updateExistClass(studentData) {

        const data = await updateClass(studentData);

        getAllClasses()

        message.success('Enregistrement modifé avec succès')

    }



    const onFinish = (values) => {

        if (isEdit) {
            updateExistClass(values)
        }
        else {
            addNewClass(values)
        }
        handleCancel();
    };


    useEffect(() => {
        getAllClasses();
    }, []);


    return (
        <>

            <h4>Gestion Des Classes</h4>

            <div className="my-5">
                <div className="buttons_wrapper">

                    <ButtonComp text="Ajouter Class" click={() => showModal(null, false, false)} >
                        <IoPersonAddOutline />
                    </ButtonComp>
                </div>

            </div>
            <div >
                <Table rowKey={(record) => record.id} columns={columns} dataSource={classes} />
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

                                <Form.Item name="class" rules={[{ required: true, message: 'required' }]}>
                                    <Input
                                        className="input_style"
                                        placeholder="Class"
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

export default Class;
