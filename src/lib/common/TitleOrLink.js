import {Button, Col, Row} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeftOutlined, PlusOutlined} from "@ant-design/icons";

export const getLinkAndTitle = (title, link,addBtn=false) => {

    return (

        <Row justify="space-between">
            <Col>{title}</Col>
            <Col>
                <Button type="primary" style={{backgroundColor: '#04aa6d', borderColor: 'transparent', borderRadius: '5px'}}>
                    {
                        addBtn ?
                        <Link title="add" to={link}><PlusOutlined/> Add</Link>
                            :
                        <Link title="back" to={link}><ArrowLeftOutlined /> Back</Link>
                    }
                </Button>
            </Col>
        </Row>
    )
}