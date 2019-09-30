import React from 'react';
import ReactDOM from 'react-dom';
import  {HashRouter as Router, Route, Switch, Redirect} from  'react-router-dom'

import App from './App';
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from 'antd'
import {commonRoutes} from './routes'
import './css/index.less'

ReactDOM.render(
<ConfigProvider locale={zhCN}>
    <Router>

    {/* 使用switch来选择是共又路由还是私有路由，这个只能由一个选择 */}

    <Switch>
    {/* 私有操作，只能在登录之后才可以访问 */}

    <Route path="/admin" render={(rootprops) =>{
        // 做授权检测
        return <App {...rootprops}/>
    }}>
    </Route>
   
    {
        //   配置公有路由
        commonRoutes.map((item)=>{
            return(
                <Route path={item.pathname} key={item.pathname} component={item.component}/>
            )
        })

    }
        {/* 配置notfound和默认的路由 */}
        <Redirect from="/" to="/login" exact/> {/*exact精准匹配*/}
        <Redirect to="/404"/>

    </Switch>
     

    
    </Router>

</ConfigProvider>, 

document.getElementById('root'));
  

