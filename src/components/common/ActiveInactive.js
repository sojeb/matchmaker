import { Button, Row, Space } from "antd";
import classNames from "classnames";

function ActiveInactive({ isActive, setIsActive }) {
  return (
    <Row>
      <Button
        onClick={() => setIsActive(true)}
        size="middle"
        id="active-button"
        className={classNames({ "active-button": isActive })}
      >
        Active
      </Button>

      <Button
        onClick={() => setIsActive(false)}
        size="middle"
        id="inactive-button"
        className={classNames({ "inactive-button": !isActive })}
      >
        Inactive
      </Button>
    </Row>
  );
}

export default ActiveInactive;
