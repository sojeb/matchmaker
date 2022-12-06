import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../../reducers/menu.reducers";
const { Sider } = Layout;

export default function Sidebar({ collapsed, logo }) {
  const navigate = useNavigate();
	const dispatch = useDispatch();
	const selectedMenu = useSelector(state => state.menu.selectedMenu);
	
	
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        transition: ".4s",
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="dark"
    >
      <div className="logo">
        <img
          src={logo}
          alt="Logo"
          style={
            collapsed
              ? { marginTop: "15px", width: "40%", transition: ".4s", marginLeft: '25px' }
              : { marginTop: "15px", width: "25%", transition: ".4s", marginLeft: '29px'}
          }
        />
      </div>

      <Menu
        onClick={(value) => {
          const { key } = value;
          dispatch(setMenu({ key }));
          navigate(`/${key}`);
        }}
        selectedKeys={selectedMenu}
        theme="dark"
        mode="inline"
        items={[
         /* {
            key: "",
            icon: <i className="fas fa-home" />,
            label: "Home",
          },*/
          {
            key: "candidates",
            icon: <i className="fas fa-users" />,
            label: "Candidates",
          }
        ]}
      />
    </Sider>
  );
}
