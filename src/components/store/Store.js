import {Col, List, Row} from 'antd';
import React from 'react'
import {Link} from 'react-router-dom';
import ARMCard from '../common/ARMCard';
import CommonLayout from '../layout/CommonLayout';

const Store = () => {
    const menus = {
        config: [

          
            {name: 'Room', url: 'room'},
            {name: 'Rack', url: 'rack'},
            {name: 'Rack Row', url: 'rack-row'},
            {name: 'Rack Row Bin', url: 'rack-row-bin'},
            {name: 'Manufacturer', url: 'manufacturer/list'},
            {name: 'Supplier', url: 'supplier/list'},
            // {name: 'WorkShop', url: 'workshop'},
            {name: 'Unit Of Measurement', url: 'unit-of-measurement'},

        ],
        partIssue:[
            {name:'Issue Demand',url:'issue-demand'},
            {name:'Pending Issues',url:'pending-issues'},
            {name:'Approved Issues',url:'approve-issues'}, 
            {name:'Issue Report',url:'issue-report'}, 
        ],
        demand:[
            {name:'Item Demand',url:'item-demand'},
            {name:'Pending Demand',url:'pending-demand'},
            {name:'Approved Demand',url:'approve-demand'},
            {name:'Demand Report',url:'demand-report'},
           
        ],
        itemReturn: [
            {name:'Unusable Item Return',url: 'unusable-item-return'},
           
        ],
        requisition:[
            {name:'Procurement Requisition',url: 'procurement-requisiton'},
        ],
        unServiceable:[
         {name:'Unserviceable Item',url: 'unserviceable-item'},
        ]


    }

    return (
        <div>
            <CommonLayout>
                <Row gutter={[6, 6]}>
                    <Col md={6} sm={12} xs={24}>
                        <ARMCard title="Parts Demand">
                            <List
                                itemLayout="horizontal"
                                dataSource={menus.demand}
                                renderItem={item => (
                                    <List.Item>
                                        <Link to={`/store/${item.url}`}>
                                            {item.name}
                                        </Link>
                                    </List.Item>
                                )}
                            />
                        </ARMCard>
                        &nbsp;
                        <ARMCard title="PARTS Requisition">
                            <List
                                itemLayout="horizontal"
                                dataSource={menus.requisition}
                                renderItem={item => (
                                    <List.Item>
                                        <Link to={`/store/${item.url}`}>
                                            {item.name}
                                        </Link>
                                    </List.Item>
                                )}
                            />
                        </ARMCard>
                    </Col>
                    <Col md={6} sm={12} xs={24}>
                        <ARMCard title="PARTS ISSUE">
                            <List
                                itemLayout="horizontal"
                                dataSource={menus.partIssue}
                                renderItem={item => (
                                    <List.Item>
                                        <Link to={`/store/${item.url}`}>
                                            {item.name}
                                        </Link>
                                    </List.Item>
                                )}
                            />
                        </ARMCard>
                        &nbsp;
                        <ARMCard title="Unserviceable Item">
                            <List
                                itemLayout="horizontal"
                                dataSource={menus.unServiceable}
                                renderItem={item => (
                                    <List.Item>
                                        <Link to={`/store/${item.url}`}>
                                            {item.name}
                                        </Link>
                                    </List.Item>
                                )}
                            />
                        </ARMCard>
                    </Col>
                    <Col md={6} sm={12} xs={24}>
                        <ARMCard title="Store CONFIGURATION">
                            <List
                                itemLayout="horizontal"
                                dataSource={menus.config}
                                renderItem={item => (
                                    <List.Item>
                                        <Link to={`/store/${item.url}`}>
                                            {item.name}
                                        </Link>
                                    </List.Item>
                                )}
                            />
                        </ARMCard>
                    </Col>
                    <Col md={6} sm={12} xs={24}>
                    <ARMCard title="Item Return">
                            <List
                                itemLayout="horizontal"
                                dataSource={menus.itemReturn}
                                renderItem={item => (
                                    <List.Item>
                                        <Link to={`/store/${item.url}`}>
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
    )
}

export default Store;