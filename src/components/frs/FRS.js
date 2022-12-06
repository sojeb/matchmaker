import { Col, List, Row } from "antd";
import { Link } from "react-router-dom";
import ARMCard from "../common/ARMCard";
import CommonLayout from "../layout/CommonLayout";

const FRS = () => {
    const menus = {
      
        partsReceive: [
            {name:'Stock Inward',url: 'stock-inwards'},
            {name:'Goods Receive',url: 'goods-receive-list'},
        ],
    

    }

    return (
        <div>
            <CommonLayout>
                <Row gutter={[6, 6]}>
     
                    <Col md={6} sm={12} xs={24}>
                        <ARMCard title="PARTS RECEIVE">
                            <List
                                itemLayout="horizontal"
                                dataSource={menus.partsReceive}
                                renderItem={item => (
                                    <List.Item>
                                        <Link to={`/frs/${item.url}`}>
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

export default FRS;