import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Form, Input, message,Row,Col, Button,Card} from 'antd';
import {findArticle,editArticle} from '../../api/index'
const { TextArea } = Input;
@withRouter
@Form.create({ name: 'edit' })
class EditArticle extends Component {

constructor(props){
    super(props)
    this.state={
        articleDetail:{}
    }
}

componentDidMount(){
    this.getDetail();
}

handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
            console.log('haha',this.props.match.params.id);
            let editID=this.props.match.params.id
            editArticle(editID,values).then(res =>{
                console.log('result',res);
                if(this.isEmptyObject(res)){
                message.error('修改失败！');   
                
                }
                else{
                message.success('修改成功！');
                }
                
            })
        }
    });
};
// 检验一个对象是否为空对象
isEmptyObject = (obj) =>{
    for(var n in obj){return false} //当不是空对象时就返回false
    return true;
}
// 根据ID获取对应的信息
getDetail = () =>{
    console.log('kk',this.props);
    
    console.log('aa',this.props.match.params.id);
    let bascicID=this.props.match.params.id;
    findArticle(bascicID).then(res =>{
        console.log(res);
        console.log(this.props,'oo');
        
        this.props.form.setFieldsValue({
            'id':res.id,
            'title':res.title,
            'author':res.author,
            'imageUrl':res.imageUrl,
            'content':res.content,
            'amount':res.amount
        })
    })
    
}

render() {
const { getFieldDecorator } = this.props.form;
// console.log('record',this.props)
return (
   
    <Row>
        <Col span={16} offset={4}>

            <Card title='文章编辑' extra={ <Button type="danger" onClick={ this.props.history.goBack }>取消</Button> }>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('id')(
                            <Input placeholder="ID..." disabled />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入文章标题' }],
                           
                        })(
                            <Input placeholder="title..." />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: '请输入作者名称！' }],
                        })(
                            <Input
                                placeholder="author..."
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('amount')(
                            <Input placeholder="amount..." disabled/>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('imageUrl', {
                            rules: [{ required: true, message: '请上传文章图片' }],
                        })(
                            <Input
                              placeholder="pictures..."
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: '请输入文章内容！' }],
                        })(
                            <TextArea 
                               rows={5}
                                placeholder="content..."
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            修改
                        </Button>

                    </Form.Item>
                </Form>
            </Card>

        </Col>
    </Row>


);
}
}
export default EditArticle
