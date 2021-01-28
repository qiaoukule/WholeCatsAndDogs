import react , {useState,useEffect} from 'react'
import { Row, Col, Menu, Icon } from 'antd'
import styles from '../styles/components/header.module.css'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../pages/api/apiUrl'

//子组件不能直接使用getInitialProps
const Header = () => {
    const [navArray, setNavArray] = useState([])
    useEffect(()=>{
        //不能直接使用异步
       const fetchData = async()=>{
        const result = await axios(servicePath.getTypeInfo).then(
            (res) => {
                return res.data.data
            }
        )
        setNavArray(result)
       }
       fetchData()
    },[])

    const handleClick = (e) =>{//组件传过来的e
        console.log(e.key);
        if(e.key=="home") {
            Router.push('/')
        }
        if(e.key == "adopt") {
            Router.push('/enjoy')
        }
        if(e.key == "about") {
            Router.push('./report')
        }
    }

    return (
         <div className={styles.header}>
        <Row justify="center">
            <Col xs={24} sm={24} md={8} lg={8} xl={4}>
                <span className={styles.title}>CatsAndDogs</span>
            </Col>

            <Col xs={0} sm={0} md={16} lg={16} xl={20}>
                <Menu 
                    mode="horizontal"   
                    style={{backgroundColor: "#333333",color: "white"}}
                    onClick={handleClick}
                >
                    <Menu.Item key="home">首页</Menu.Item>
                    <Menu.Item key="adopt">大赏</Menu.Item>
                    <Menu.Item key="about">动态</Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
    )
}
   


export default Header;