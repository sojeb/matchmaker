import styled from "styled-components";
import {Button} from "antd";

const ActiveButton = styled(Button)`
           border-top: 3px solid green;
           border-right: 1px solid green;
           border-left: 1px solid green;
           color: green;
           
           .ant-btn:active, .ant-btn:focus, .ant-btn:hover {
                text-decoration: none;
                background: #fff;
          }
    
         .ant-btn:focus, .ant-btn:hover {
           color: green;
           border-color: green;
           background: #fff;
    }
`
export default ActiveButton