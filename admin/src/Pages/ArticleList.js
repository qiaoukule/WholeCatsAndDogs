import React, { useState, useEffect } from 'react'
import { Modal, message, Button, Table } from 'antd'
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

    const updateArticle = (id) =>{
        props.history.push('/adminIndex/addArticle/'+id)
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
                    <Button type="primary" onClick={() => updateArticle(text)}>修改</Button> &nbsp;
                    <Button onClick={() => deleteArticle(text)}>删除 </Button>
                </div>
            ),
            align: 'center',
        },
    ];

    let data = [
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