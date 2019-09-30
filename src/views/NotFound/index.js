import React, { Component } from 'react'
import { Row, Col } from 'antd';
import '../../css/index.less'
export default class NotFound extends Component {
    render() {
        return (
            <Row type="flex" justify="space-around" align="middle">
            <Col span={4}>
            <img src="/images/error.png"></img>
            </Col>

            <Col span={4}>
            <h2>系统出现了一些问题，攻城狮小哥哥，小姐姐正在努力修复，请耐心等待哟(＾Ｕ＾)ノ~ＹＯ~~~</h2>
            </Col>
            </Row>
        )
    }
}
