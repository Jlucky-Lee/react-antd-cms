import React, { Component } from 'react'
import {HashRouter as Router ,Route,Redirect,Switch} from 'react-router-dom'
import {privateRoutes} from './routes'
import Frameout from './components/Frameout';


export default class App extends Component {
  render() {
    return (
      <Router>

      <Frameout>

       <Switch>
         {/* 私有路由的配置 */}
        
        { 
          privateRoutes.map((item) =>{
            return(
              <Route path={item.pathname} exact component={item.component} key={item.pathname}/>
            )
            
          })
          
        }

         {/* 配置notfound和默认的路由 */}
         <Redirect from="/admin" to={privateRoutes[0].pathname} exact/> {/*exact精准匹配*/}
         <Redirect to="/404"/>

       </Switch>

      </Frameout>

    
      </Router>
    )
  }
}
