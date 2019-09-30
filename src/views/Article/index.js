import React, { Component } from 'react'
import {Card,Table, Tooltip,Tag, Button,Modal, Icon} from 'antd'
import {getArticleList,delArticle,getAllArticleList} from '../../api'
import moment from 'moment'
const { confirm } = Modal;
const mapToChinese ={
  id:'序号',
  amount:'阅读数',
  title:'文章标题',
  author:'作者',
  creatAt:'发布时间',
}

export default class Article extends Component {

  constructor(props){
    super(props)
    this.state={
      dataSource:[],
      total:100,
      columns:[],
      isLoading:false,
      currentPage:1,
      pageSize:10,
      currentRecord:{},
      
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
    }
  }

  componentDidMount(){
    this.getAllList()
    this.getList(this.state.currentPage,this.state.pageSize)
  }

  // 获取所有数据设置总记录数
  getAllList(){
    getAllArticleList().then(res =>{
      console.log('total',res.length);
      this.setState({
        total:res.length
      })
    })
  }

  // 获取分页文章列表,渲染页面
  getList = (page,limit) =>{
    this.setState({
      isLoading:true
    })
    getArticleList(page,limit).then(res =>{
   
      var rs=[];
      for(let i=0; i<res.length; i++ ){
        var temp={
          id:res[i]['id'],
          title:res[i]['title'],
          author:res[i]['author'],
          amount:res[i]['amount'],
          creatAt:moment(res[i]['creatAt']).format('YYYY-MM-DD HH:mm:ss')
        }
        rs.push(temp);
      }
      console.log('rs',rs);
      
      var keys=Object.keys(rs[0]);
      // console.log(keys);
      var keyName = keys.map(item =>{
        if(item === 'amount'){
          return{
          title: mapToChinese[item],
          dataIndex: item,
          key: item,
          render:((text,record,index)=>{
            return(
              <Tooltip title={record.amount > 100 ? '此文章的阅读数超过了100哟~~':'此文章的阅读数还没有超过100哟~~'  }>
                <Tag color={record.amount > 100 ? 'volcano':'cyan'}>{record.amount}</Tag>
              </Tooltip>
            )
          })
          }
          
        }
        return {
          title: mapToChinese[item],
          dataIndex: item,
          key: item,
        }
      })

      // 增加一个操作列
      keyName.push({
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render:((text,record,index)=>{
          return(
            <div>
              <Button type='primary' onClick={this.editHandle.bind(this,record)}>编辑</Button>
              <Button type='danger' onClick={this.delHandle.bind(this,record)}>删除</Button>
            </div>
            
          )
        })
      })
      
      this.setState({
        dataSource:rs,
        columns:keyName
      })
    }).catch(error =>{
      throw error
    }).finally(() =>{
      // 在异步请求完之后肯定会走的一步
      this.setState({
        isLoading:false
      })
    });
  }
  // 添加文章
  addHandle = () =>{
  
  }
  //编辑文章
  editHandle(record){
    console.log('edit',record);
    console.log(this.props);
    
    this.props.history.push('/admin/article/edit/' + record.id);
  }

  //删除文章
  delHandle = (record) =>{
  // console.log('del',record);
  this.setState({
    currentRecord:record
  })
  confirm({
    title: '删除文章',
    content: '你真的想要删除此文章吗？',
    onOk: () => {
    
      delArticle(this.state.currentRecord.id).then(res =>{
        
      }).catch(error =>{
        throw error
        
      }).finally(()=>{
        this.getList(this.state.currentPage,this.state.pageSize)
      })
    },
  });
  }
   
  // 分页切换
  changeHandler = (page,pageSize) =>{
    console.log(page,pageSize);
    this.getList(page,pageSize)
    this.setState({
      currentPage:page
    })
  }

    render() {
        return (
            <div>
                <Card title="文章列表" 
                extra={
                <div>
                  <Button onClick={this.addHandle} type="primary" style={{marginRight:'10px'}}><Icon type="plus-circle"/>添加文章 </Button> 
                  <Button onClick={this.exportHandle} type="dashed">导出表格</Button>
                </div>
                
                }>
                <Table dataSource={this.state.dataSource} 
                        rowKey={ record => record.id }
                        columns={this.state.columns} 
                        loading={this.state.isLoading}
                        pagination={{current:this.state.currentPage,total:this.state.total,pageSize:this.state.pageSize,onChange: this.changeHandler}}/>;
                </Card>
            </div>
        )
    }
}
