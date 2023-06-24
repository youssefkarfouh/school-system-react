import { Form, Input, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../components/ButtonComp';
import { fetchClasses, addClass, updateClass, deleteClass } from '../services/class';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'


function Class() {

    const [classes, setClasses] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [currentClass, setCurrentclass] = useState({ class: "" })

    const columns = [
        {
            title: 'Class',
            dataIndex: 'class',
            key: "class",

        },
        {
            title: 'Action',
            key: "action",
            render: (_, record) => (
                <Space>
                    <DeleteOutlined onClick={() => removeClass(record.id)} style={{ color: "red", cursor: "pointer" }} />
                    <EditOutlined onClick={() => updateClass(record)} style={{ cursor: "pointer" }} />
                    <EyeOutlined onClick={() => previewClass(record)} style={{ cursor: "pointer" }} />
                </Space>
            ),
        },
    ]

    function handleCancel() {
        setIsOpen(false)
    }
    function handleChange(name, value) {

        setCurrentclass((prevData) => {
            return {
                ...prevData,
                [name]: value
            };
        });

        console.log(currentClass)
    };
    async function getAllClasses() {
        const data = await fetchClasses();
        console.log("data", data)
        setClasses(data);
    };
    function updateClass(classe) {

        setCurrentclass(classe)
        setIsOpen(true)


    }
    function previewClass(classe) {
        setIsOpen(true)
        // setPreview(false)
    }
    async function removeClass(id) {
        const data = await deleteClass(id);

        setClasses(prev => prev.filter(ele => ele.id !== id))

    }
    async function addNewclass(classData) {
        const data = await addClass(classData);

        console.log("data", data)

    }
    const onFinish = () => {

        addNewclass(currentClass)
        setClasses(prev => [...prev, currentClass])
        handleCancel();
    };

    useEffect(() => {
        getAllClasses();
    }, []);

    return (

        <>
         
                <h4>Gestion Des Classes</h4>

                <div className="mt-5">
                    <div className="filter_container">
                        <Form onFinish={onFinish} >

                            <Form.Item name="name" rules={[{ required: true, message: 'Please enter name!' }]} className='m-0'>
                                <Input className="input_style" placeholder="Name" />
                            </Form.Item>

                        </Form>
                    </div>
                    <div className="my-3">
                        <Table rowKey={(record) => record.id} columns={columns} dataSource={classes} />
                    </div>
                    <div className="class_add">
                        <ButtonComp text="Add class" click={() => setIsOpen(true)} />
                    </div>
                </div>
        

            {isOpen &&
                (
                    <Modal
                        open={isOpen}
                        title="class Form" onCancel={handleCancel} destroyOnClose={true} footer={null}>

                        <div className="mt-5">
                            <Form onFinish={onFinish}>
                                <Form.Item name="class" rules={[{ required: true, message: 'Please enter the first name' }]}>
                                    <Input
                                        className="input_style"
                                        placeholder="Enter class name"
                                        value={currentClass.class}
                                        onChange={(event) => handleChange('class', event.target.value)}
                                    />
                                </Form.Item>

                                <div className="btns_form">
                                    <ButtonComp text="cancel" click={handleCancel} />
                                    <ButtonComp  text="submit" />
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
