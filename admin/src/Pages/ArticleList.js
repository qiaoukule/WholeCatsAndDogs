import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button, Table } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const { confirm } = Modal

function ArticleList(props) {
    const [list, setList] = useState([])

    const getList = () => {
        axios({
            method: 'get',
            url: servicePath.getAriticleList,
            withCredentials: true,
        }).then(
            res => {
                setList(res.data.list)
            }
        )

    }

    useEffect(() => getList(), [])

    const deleteArticle = (id) => {
        confirm({
            title: '删除文章操作',
            content: '你确定删除此文章吗？如果你点击ok，将无法恢复！',
            onOk() {
                axios(servicePath.deleteArticle + id, { withCredentials: true })
                    .then(
                        res => {
                            getList()
                            //为什么不能 setList(res.data.list)！！
                            message.success("删除成功")
                        }
                    )
            },
            onCancel() {
                message.success("取消成功！")
            }
        })
    }

    const columns = [
        {
            title: '文章标题',
            dataIndex: 'title',
            render: text => <a>{text}</a>,
            align: 'center',
        },
        {
            title: '发布日期',
            className: 'column-money',
            dataIndex: 'addTime',
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'id',
            render: (text) => (
                <div>
                    {text}
                    <Button type="primary" >修改</Button> &nbsp;
                    <Button onClick={() => deleteArticle(text)}>删除 </Button>
                </div>
            ),
            align: 'center',
        },
    ];

    let data = [
        /*  {
             key: '1',
             title: 'John Brown',
             money: '￥300,000.00',
             action: '',
         },*/
        //怎么把key加上啊？？？？？？？？？
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={list}
                bordered
                title={() => '所有文章'}
                footer={() => ''}
            />,
        </div>
    )
}

export default ArticleList;