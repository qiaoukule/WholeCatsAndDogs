import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import styles from '../styles/pages/index.module.css'
import { Row, Col, List, Button } from 'antd'
import {EditOutlined, BulbOutlined,FireOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import servicePath from '../pages/api/apiUrl'

export default function Home(list) {

  const [myList, setList] = useState(
    list.data
  )
  /*样式搞定*/ 
   const [buttonStyle, setButtonStyle] = useState(
    styles.ButtonOut
  ) 


  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

        <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={15} lg={15} xl={15}  >
          <div className={styles.leftDiv}>
            <List
              header={<div>最新动态</div>}
              itemLayout="vertical"
              dataSource={myList}
              renderItem={item => (
                <List.Item>
                  <div className={styles.ListDiv}>
                  <div className={styles.listTitle}>
                    <Link href={{pathname: '/detailed',query:{id:item.id}}}>
                      <a className={styles.linkStyle}> {item.title} </a>
                    </Link>
                  </div>
                  <div className={styles.listIcon}>
                    <span ><EditOutlined /> {new Date(item.addTime).toLocaleDateString()}</span>
                    <span><BulbOutlined /> 不定期更新</span>
                    <span><FireOutlined /> 浏览次数：{item.view_count}</span>
                  </div>
                  <div className={styles.listContext}>{item.introduce}</div>
                  <div className={styles.ButtonDiv}>
                     <Button className={buttonStyle}>
                     <Link href={{pathname: '/detailed',query:{id:item.id}}}>
                      <a className={styles.linkStyle}>阅 读  -{'>'} </a>
                    </Link>
                     </Button>
                  </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={9} lg={9} xl={9}>
          <Author/>
          <Advert/>
      </Col>
      </Row>

      <div>
          <Footer/>
      </div>

    </div>
  )
}

//从接口获取数据,这个方法获取的数据可以直接用参数传进去用
Home.getInitialProps = async ()=> {
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
  return await promise
}