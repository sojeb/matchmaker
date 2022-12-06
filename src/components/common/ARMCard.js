import styled from "styled-components";
import {Card} from "antd";

const ARMCard = styled(Card)`
  .ant-card {
    border-radius: 5px;
  }
  .ant-list-item:hover{
    background-color: #EEEEED;
  }

  .ant-card-head-title {
    text-transform: uppercase;

  }

  .ant-card-head {
    background-color: #EEEEED;
    border-bottom: 1px solid black;
  }

  .ant-list-item a {
    text-decoration: none;
    color: black;
    padding-left: 10px;
  }

`

export default ARMCard;