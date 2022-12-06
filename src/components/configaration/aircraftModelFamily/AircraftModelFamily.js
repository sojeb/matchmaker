import {
    EditOutlined,
    EyeOutlined,
    FilterOutlined,
    LockOutlined,
    RollbackOutlined,
    UnlockOutlined,
} from '@ant-design/icons';
import {
    Breadcrumb,
    Col,
    Empty,
    Form,
    Input,
    notification,
    Popconfirm,
    Row,
    Select,
    Space,
} from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getErrorMessage } from '../../../lib/common/helpers';
import { getLinkAndTitle } from '../../../lib/common/TitleOrLink';
import { useActiveInactive } from '../../../lib/hooks/active-inactive';
import AircraftModelFamilyService from '../../../service/AircraftModelFamilyService';
import { getAircraftModelFamilyList } from '../../../store/actions/aircraftModelFamily.action';
import ActiveInactive from '../../common/ActiveInactive';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMCard from '../../common/ARMCard';
import ARMTable from '../../common/ARMTable';
import ARMButton from '../../common/buttons/ARMButton';
import ResponsiveTable from '../../common/ResposnsiveTable';
import CommonLayout from '../../layout/CommonLayout';

const { Option } = Select;

const AircraftModelFamily = () => {
    const dispatch = useDispatch();
    const aircraftModelFamilies = useSelector(
        (state) => state.aircraftModelFamilies.model
    );
    const { isActive, setIsActive } = useActiveInactive(
        getAircraftModelFamilyList
    );

    const handleStatus = useCallback(
        async (id, status) => {
            try {
                await AircraftModelFamilyService.toggleAircraftModelFamilyStatus(
                    id,
                    status
                );
                dispatch(getAircraftModelFamilyList(isActive));
                notification['success']({
                    message: 'Status changed successfully!',
                });
            } catch (er) {
                notification['error']({ message: getErrorMessage(er) });
            }
        },
        [isActive]
    );

    useEffect(() => {
        dispatch(getAircraftModelFamilyList(isActive));
    }, []);

    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        {' '}
                        <Link to="/planning">
                            {' '}
                            <i className="fas fa-chart-line" /> &nbsp; Planning
                        </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>Aircraft Model Families</Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>

            <ARMCard
                title={getLinkAndTitle(
                    'AIRCRAFT MODEL FAMILY LIST',
                    '/planning/aircraft-model-family/add',
                    'add'
                )}
            >
                <Form initialValues={{ pageSize: 10 }}>
                    <Row gutter={20}>
                        <Col xs={24} md={6}>
                            <Form.Item>
                                <Input placeholder="Search" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={4}>
                            <Form.Item
                                name="pageSize"
                                label="Page Size"
                                rules={[
                                    {
                                        message: 'Field should not be empty',
                                    },
                                ]}
                            >
                                <Select id="antSelect">
                                    <Option value="10">10</Option>
                                    <Option value="20">20</Option>
                                    <Option value="30">30</Option>
                                    <Option value="40">40</Option>
                                    <Option value="50">50</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item>
                                <Space>
                                    <ARMButton
                                        size="middle"
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        <FilterOutlined /> Filter
                                    </ARMButton>
                                    <ARMButton
                                        size="middle"
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        <RollbackOutlined /> Reset
                                    </ARMButton>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <ActiveInactive isActive={isActive} setIsActive={setIsActive} />

                <Row className="table-responsive">
                    <ResponsiveTable>
                        <ARMTable>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aircraftModelFamilies.map((aircarftModel) => (
                                    <tr key={aircarftModel.id}>
                                        <td>
                                            {aircarftModel.aircraftModelName}
                                        </td>
                                        <td>
                                            <Space size="small">
                                                <ARMButton
                                                    type="primary"
                                                    size="small"
                                                    style={{
                                                        backgroundColor:
                                                            '#4aa0b5',
                                                        borderColor: '#4aa0b5',
                                                    }}
                                                >
                                                    <EyeOutlined />
                                                </ARMButton>

                                                <Link
                                                    to={`/planning/aircraft-model-family/edit/${aircarftModel.id}`}
                                                >
                                                    <ARMButton
                                                        type="primary"
                                                        size="small"
                                                        style={{
                                                            backgroundColor:
                                                                '#6e757c',
                                                            borderColor:
                                                                '#6e757c',
                                                        }}
                                                    >
                                                        <EditOutlined />
                                                    </ARMButton>
                                                </Link>

                                                <Popconfirm
                                                    title="Are you Sure?"
                                                    okText="Yes"
                                                    cancelText="No"
                                                    onConfirm={() =>
                                                        handleStatus(
                                                            aircarftModel.id,
                                                            !isActive
                                                        )
                                                    }
                                                >
                                                    {isActive ? (
                                                        <ARMButton
                                                            type="primary"
                                                            size="small"
                                                            style={{
                                                                backgroundColor:
                                                                    '#53a351',
                                                                borderColor:
                                                                    '#53a351',
                                                            }}
                                                        >
                                                            <LockOutlined />
                                                        </ARMButton>
                                                    ) : (
                                                        <ARMButton
                                                            type="primary"
                                                            size="small"
                                                            danger
                                                        >
                                                            <UnlockOutlined />
                                                        </ARMButton>
                                                    )}
                                                </Popconfirm>
                                            </Space>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </ARMTable>
                    </ResponsiveTable>
                </Row>

                <Row>
                    {aircraftModelFamilies.length === 0 ? (
                        <Col style={{ margin: '30px auto' }}>
                            <Empty />
                        </Col>
                    ) : null}
                </Row>
            </ARMCard>
        </CommonLayout>
    );
};

export default AircraftModelFamily;
