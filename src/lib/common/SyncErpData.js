import {Button, Col, Row} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeftOutlined, PlusOutlined, SyncOutlined} from "@ant-design/icons";

export const SyncErpData = (title, getErpData) => {

    return (

        <Row justify="space-between">
            <Col>{title}</Col>
            <Col>
                <Button onClick = {getErpData} type="primary" style={{backgroundColor: '#04aa6d', borderColor: 'transparent', borderRadius: '5px'}}>
                    <SyncOutlined spin = {false} /> Sync
                </Button>
            </Col>
        </Row>
    )
}