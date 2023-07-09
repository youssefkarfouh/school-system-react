import React from 'react'
import { Popconfirm } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';

function ModalConfirm({ children, handlFunc }) {
    return (

        <Popconfirm onConfirm={handlFunc} okText="Supprimer" cancelText="Annuler"
            title="Supprimer"
            description="Êtes-vous sûr de vouloir supprimer cet enregistrement?"
            icon={
                <QuestionCircleOutlined
                    style={{
                        color: 'red',
                    }}
                />
            }
        >

            {children}

        </Popconfirm>
    )
}

export default ModalConfirm