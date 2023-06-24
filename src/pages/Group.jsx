import { Form, Input, Modal, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../components/ButtonComp';
import { fetchGroups, addGroup, updateGroup, deleteGroup } from '../services/group';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'


function Group() {

    const [groups, setGroupes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [currentGroup, setCurrentGroup] = useState({ group: "", class: null })

    const columns = [
        {
            title: 'Group',
            dataIndex: 'group',
            key: "group",

        },
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
                    <DeleteOutlined onClick={() => removeGroup(record.id)} style={{ color: "red", cursor: "pointer" }} />
                    <EditOutlined onClick={() => updateGroup(record)} style={{ cursor: "pointer" }} />
                    <EyeOutlined onClick={() => previewGroup(record)} style={{ cursor: "pointer" }} />
                </Space>
            ),
        },
    ]

    function handleCancel() {
        setIsOpen(false)
    }
    function handleChange(name, value) {

        setCurrentGroup((prevData) => {
            return {
                ...prevData,
                [name]: value
            };
        });

        console.log(currentGroup)
    };
    async function getAllGroups() {
        const data = await fetchGroups();
        console.log("data", data)
        setGroupes(data);
    };
    function updateGroup(group) {

        setCurrentGroup(group)
        setIsOpen(true)

    }
    function previewGroup(group) {
        setIsOpen(true)
        // setPreview(false)
    }
    async function removeGroup(id) {
        const data = await deleteGroup(id);

        setGroupes(prev => prev.filter(ele => ele.id !== id))

    }
    async function addNewGroup(group) {
        const data = await addGroup(group);

        console.log("data", data)

    }
    const onFinish = () => {

        addNewGroup(currentGroup)
        setGroupes(prev => [...prev, currentGroup])
        handleCancel();
    };

    useEffect(() => {
        getAllGroups();
    }, []);

    return (

        <>

            <h4>Gestion Des Groups</h4>

            <div className="mt-5">
                <div className="filter_container">

                    <Form onFinish={onFinish} >

                        <Form.Item name="name" rules={[{ required: true, message: 'Please enter name!' }]} className='m-0'>
                            <Input className="input_style" placeholder="Name" />
                        </Form.Item>

                    </Form>
                </div>
                <div className="class_list my-5">
                    <Table rowKey={(record) => record.id} columns={columns} dataSource={groups} />
                </div>
                <div className="class_add">
                    <ButtonComp text="Add group" click={() => setIsOpen(true)} />
                </div>
            </div>


            {isOpen &&
                (
                    <Modal
                        open={isOpen}
                        title="Add Groupssd" onCancel={handleCancel} destroyOnClose={true} footer={null}>

                        <div className="mt-5">
                            <Form onFinish={onFinish}>
                                <Form.Item name="group" rules={[{ required: true, message: 'Please enter group name' }]}>
                                    <Input
                                        className="input_style"
                                        placeholder="Enter group name"
                                        value={currentGroup.group}
                                        onChange={(event) => handleChange('group', event.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item name="class" rules={[{ required: true, message: 'Please select affected class' }]}>
                                    <Select
                                        value={currentGroup.group}
                                        placeholder="Select class"
                                        className="input_select"
                                        onChange={(value) => handleChange('class', value)}
                                        options={[{ value: 1, label: '5eme' }, { value: 2, label: '6eme' }]}
                                    />
                                </Form.Item>


                                <div className="btns_form">
                                    <ButtonComp text="cancel" click={handleCancel} />
                                    <ButtonComp text="submit" />
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



