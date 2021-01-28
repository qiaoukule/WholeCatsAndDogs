import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import styles from '../styles/pages/index.module.css'
import detailedStyles from '../styles/pages/detailed.module.css'
import { Row, Col, Input, Affix } from 'antd'
import React, { useState } from 'react'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css'
import servicePath from '../pages/api/apiUrl'
import {EditOutlined, BulbOutlined,FireOutlined } from '@ant-design/icons';


export default function Detailed(props) {
    const { TextArea } = Input;
    const renderer = new marked.Renderer();

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    let html = marked(props.article_content)
    console.log(props)


    const [myList, setList] = useState(
        props
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
                        {/* 文章内容 */}
                        <div className={detailedStyles.articleDiv}>
                            <div className={styles.listTitle}>{props.title}</div>
                            <div className={styles.listIcon}>
                                <span ><EditOutlined /> {props.addTime}</span>
                                <span><BulbOutlined /> 不定期更新</span>
                                <span><FireOutlined /> 浏览次数：{props.view_count}</span>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{ __html: html }}
                            ></div>
                        </div>
                        {/* 留言板 */}
                        <div className={detailedStyles.articleDiv}>
                            <h2>留言</h2>
                            <h4>Your email address will not be published. Required fields are marked *</h4>
                            <h3>Comment</h3>
                            <TextArea rows={4} />
                            <h3>Name*</h3>
                            <Input />
                            <h3>Email*</h3>
                            <Input />
                            <h3>Website</h3>
                            <Input />
                        </div>
                    </div>

                </Col>

                <Col className="comm-right" xs={0} sm={0} md={9} lg={9} xl={9}>
                    <Author />
                    <Advert />
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            <MarkNav
                                className="article-menu"
                                ordered={false}
                            />
                        </div>
                    </Affix>
                </Col>
            </Row>

            <div>
                <Footer />
            </div>

        </div>
    )
}

Detailed.getInitialProps = async (context) => {
    let id = context.query.id//接受路由传过来的id进行查询
    const promise = new Promise((resolve) => {
        axios(servicePath.getArticleById + id).then(
            (res) => {
                console.log(res);
                resolve(res.data.data[0])
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    })
    return await promise
}
