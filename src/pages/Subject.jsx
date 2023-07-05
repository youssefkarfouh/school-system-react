import { Form, Input, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../components/ButtonComp';
import { fetchSubjects, addSubject, updateSubject, deleteSubject } from '../services/subject';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'


function Subject() {

    const [subjects, setSubjects] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [currentSubject, setCurrentSubject] = useState({ subject: "", })

    const columns = [
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: "subject",

            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.startsWith(value),

        },
        {
            title: 'Action',
            key: "action",
            render: (_, record) => (
                <Space>
                    <DeleteOutlined onClick={() => removeSubject(record.id)} style={{ color: "red", cursor: "pointer" }} />
                    <EditOutlined onClick={() => updateSubject(record)} style={{ cursor: "pointer" }} />
                    <EyeOutlined onClick={() => previewSubject(record)} style={{ cursor: "pointer" }} />
                </Space>
            ),
        },
    ]

    function handleCancel() {
        setIsOpen(false)
    }
    function handleChange(name, value) {

        setCurrentSubject((prevData) => {
            return {
                ...prevData,
                [name]: value
            };
        });

        console.log(currentSubject)
    };
    async function getAllsubjects() {
        const data = await fetchSubjects();
        console.log("data", data)
        setSubjects(data);
    };
    function updateSubject(Subject) {

        setCurrentSubject(Subject)
        setIsOpen(true)

    }
    function previewSubject(Subject) {
        setIsOpen(true)
    }
    async function removeSubject(id) {
        const data = await deleteSubject(id);

        setSubjects(prev => prev.filter(ele => ele.id !== id))

    }
    async function addNewSubject(subject) {
        const data = await addSubject(subject);

        console.log("data", data)

    }
    const onFinish = () => {

        addNewSubject(currentSubject)
        setSubjects(prev => [...prev, currentSubject])
        handleCancel();
    };

    useEffect(() => {
        getAllsubjects();
    }, []);

    return (

        <>

            <h4>Gestion Des Matièrs</h4>

            <div className="mt-5">
                <div className="class_list my-5">
                    <Table rowKey={(record) => record.id} columns={columns} dataSource={subjects} />
                </div>
                <div className="class_add">
                    <ButtonComp text="Add Subject" click={() => setIsOpen(true)} />
                </div>
            </div>


            {isOpen &&
                (
                    <Modal
                        open={isOpen}
                        title="Ajouter matière" onCancel={handleCancel} destroyOnClose={true} footer={null}>

                        <div className="mt-5">
                            <Form onFinish={onFinish}>
                                <Form.Item name="subject" rules={[{ required: true, message: 'Please enter Subject name' }]}>
                                    <Input
                                        className="input_style"
                                        placeholder="Enter subject name"
                                        value={currentSubject.subject}
                                        onChange={(event) => handleChange('subject', event.target.value)}
                                    />
                                </Form.Item>


                                <div className="btns_form">
                                    <ButtonComp text="Annuler" click={handleCancel} />
                                    <ButtonComp text="Ajouter" />
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
