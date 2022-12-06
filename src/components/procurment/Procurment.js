import React from 'react';
import {Col, List, Row} from 'antd';
import {Link} from 'react-router-dom';
import ARMCard from '../common/ARMCard';
import CommonLayout from '../layout/CommonLayout';
const Procurment = () => {
        const menus = {
            quoteRequest: [
    
              
                {name: 'Request for Quotation(RFQ)', url: 'request-for-quotation'},
            ],
           
    
        }
    
        return (
            <div>
                <CommonLayout>
                    <Row gutter={[6, 6]}>
                        <Col md={6} sm={12} xs={24}>
                            <ARMCard title="Quote Request">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={menus.quoteRequest}
                                    renderItem={item => (
                                        <List.Item>
                                            <Link to={`/procurment/${item.url}`}>
                                                {item.name}
                                            </Link>
                                        </List.Item>
                                    )}
                                />
                            </ARMCard>
                        </Col>
                    </Row>
                </CommonLayout>
            </div>
        );
    }



export default Procurment;