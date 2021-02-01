//直接拿antd的布局例子改写成hooks
//路由部分：刷新后，页面会空白，渲染不出来
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import '../static/css/AdminIndex.css'
import React, { useState } from 'react';
import { Route, Link, Switch, BrowserRouter as Router, } from 'react-router-dom';
import AddArticle from '../Pages/AddArticle'
import ArticleList from '../Pages/ArticleList'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {

    const { children, location, loading } = props;

    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed)
    };

    return (
    <Router>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        文章管理
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<DesktopOutlined />} title="文章管理">
                        <Menu.Item key="3"> 
                            <Link to="/addArticle/">添加文章</Link>
                         </Menu.Item>
                        <Menu.Item key="4">
                        <Link to="/articleList/">文章列表</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />}>
                        留言管理
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <div>
                            <Switch>
                               {/*  错误 children={AddArticle} */} 
                               <Route path="/articleList/" exact>
                                    <ArticleList />
                                </Route>
                                <Route path="/addArticle/"  >
                                  <AddArticle  history={props.history}/> 
                                </Route>
                               
                            </Switch>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    </Router>
    );
}

export default AdminIndex