import React, { Component } from 'react'
import { Layout, Menu, Icon,Row, Col,Dropdown,Avatar,Badge  } from 'antd';
import {privateRoutes} from '../../routes'
import {withRouter} from 'react-router-dom'
const { Header, Content, Sider } = Layout;

// 过滤掉不是一级菜单的路由
var privateRous=privateRoutes.filter((ele) =>{
    return ele.isTop ===true
})

// 装饰器，让不是从route跳转过来的组件拥有history
@withRouter
class Frameout extends Component {

    clickHandler = ({key}) =>{
        console.log(this.props);
        
        console.log(key);
        
        this.props.history.push( key );
    
    }

    menus = () => {
        return (
            <Menu onClick={this.clickHandler}>
                <Menu.Item key="/admin/notify">
                    <Badge dot>通知中心</Badge>
                </Menu.Item>
                <Menu.Item key="/admin/setting">
                        个人设置
                </Menu.Item>
                <Menu.Item key="/login">
                        退出
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        
        return (
        <Layout style={{minHeight:'100%'}}>
            <Header className="header">
            <Row>
                <Col span={8} style={{color:"white" ,fontWeight:700 ,fontSize:26}}>CMS 后台管理系统</Col>
                <Col span={4} offset={12}>
               
                <div>
                <Dropdown overlay={this.menus()}>
                   <div style={{color:'white'}}>
                       <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                       <span style={{marginLeft:"5px"}}>君君，欢迎您来！</span>
                       <Icon type="down"/>
                   </div>
                </Dropdown>
                </div>
              
                </Col>
            </Row>

            </Header>
            <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu  mode="inline" defaultSelectedKeys={[this.props.location.pathname]} style={{ height: '100%', borderRight: 0 }} onClick={this.clickHandler}>
                {
                    privateRous.map((item)=>{
                       
                        return(
                            
                            <Menu.Item key={item.pathname}><Icon type={item.icon}/> {item.title}</Menu.Item>
                        )
                    })
                }
                </Menu>
            </Sider>
            <Layout style={{ padding: '24px' }}>
                
                <Content
                style={{
                    background: '#fff',
                    padding: "24px",
                    margin: 0,
                    minHeight: 280,
                }}
                >
              
                {this.props.children}
                </Content>
            </Layout>
            </Layout>
        </Layout>
 
)
        
    }
}
export default Frameout
