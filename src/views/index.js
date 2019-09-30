import Loadable from 'react-loadable';
import Loading from '../components/Loading';
// 路由懒加载
const Article = Loadable({
    loader: () => import('./Article'),
    loading: Loading,
  });
const Setting = Loadable({
    loader: () => import('./Setting'),
    loading: Loading,
  });
const Dashboard = Loadable({
    loader: () => import('./Dashboard'),
    loading: Loading,
  });
const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading,
  });
const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading,
  });
const Notify = Loadable({
    loader: () => import('./Notify'),
    loading: Loading,
  });
const EditArticle = Loadable({
    loader: () => import('./Article/EditArticle'),
    loading: Loading,
  });

// 将所有的页面导出
// import Article from './Article'
// import Setting from './Setting'
// import Dashboard from './Dashboard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Notify from './Notify'


export{
    Setting,
    Dashboard,
    Login,
    NotFound,
    Article,
    Notify,
    EditArticle
}