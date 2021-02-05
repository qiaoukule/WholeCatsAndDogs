import React, { useState, useEffect } from 'react'
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import {  useLocation, useParams, } from 'react-router-dom';
import axios from 'axios'
import servicePath from '../config/apiUrl'

const { TextArea } = Input

function AddArticle(props) {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState(['请选择类别']) //选择的文章类别

   // let {id}  = useParams(); 一直是undefined，太可恶了
   let location = useLocation();
   let id = location.pathname.replace(/[^0-9]/ig,"");
    console.log(location);

    useEffect(() => {
        //进入页面执行一次,查看是更新还是添加文章
        getTypeInfor()
        if(id){
            setArticleId(id)
            getArticleById(id)
        } 
    }, [])

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const getTypeInfor = ()=> {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials: true,//跨域
        }).then(
            res => {
                if (res.data.data === "请登录") {
                    localStorage.getItem('openId')
                    localStorage.removeItem('openId')
                    props.history.push('/')//这里需要父组件传参数进来，不然就是{}，根本跳转不了！！！
                } else {
                    setTypeInfo(res.data.data)
                }
            }
        )
    }

    const selectedTypeHandler =(value)=>{
        console.log(value);
        setSelectType(value)
    }

    const saveArticle =()=>{
        if(!selectedType){
            message.error("请选择文章类型")
            return false
        } else if(!articleTitle){
            message.error("请输入文章标题")
            return false
        }
        else if(!introducemd){
            message.error("请输入文章简介")
            return false
        }
        else if(!showDate){
            message.error("请选择发布日期")
            return false
        } 
        let dataProps = {}
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        dataProps.addTime = new Date(showDate);

        if(articleId === 0) { 
            dataProps.view_count = Math.ceil(Math.random()*100)+1000;
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                withCredentials:true,
            }).then(res => {
                setArticleId(res.data.insertId)
              //  console.log("--"+res.data.insertId);
                if(res.data.isSuccess) {
                    message.success("发布成功！")
                } else{
                    message.error("文章发布失败！")
                }
            })
        }
        else{//修改文章
            dataProps.id = articleId
            axios({
                method:'post',
                url:servicePath.updateArticle,
                data:dataProps,
                withCredentials:true,
            }).then(
                res=>{
                    if(res.data.isSuccess){
                        message.success("保存成功！")
                    } else {
                        message.error("保存失败！")
                    }
                }
            )
        }
    }

    const getArticleById=(id)=>{
        axios(servicePath.getArticleById+id,{
            withCredentials:true,
        }).then(res=>{
            let articleInfo = res.data.data[0]//是数组
            setArticleTitle(articleInfo.title)
            setArticleContent(articleInfo.article_content)
            let html = marked(articleInfo.article_content)
            setMarkdownContent(html)
            setIntroducemd(articleInfo.introduce)
            let tmpInt = marked(articleInfo.introduce)
            setIntroducehtml(tmpInt)
            setShowDate(articleInfo.addTime)
            setSelectType(articleInfo.typeId)
        })
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input placeholder="博客标题" size="large" value={articleTitle} onChange={e => setArticleTitle(e.target.value)}/>
                        </Col>
                        <Col span={4}>
                            &nbsp;
                        <Select defaultValue={selectedType} size="large" onChange={selectedTypeHandler}>
                                {typeInfo.map((item,index) => (
                                    <Select.Option key={index} value={item.id}>
                                        {item.typeName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                onChange={changeContent}
                                value={articleContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }}
                            >
                            </div>

                        </Col>
                    </Row>
                </Col>

                <Col span={6}>
                    <Row>
                        <Col span="24">
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button size="large" type="primary" onClick={saveArticle}>发布文章</Button>
                            <br />
                        </Col>
                        <Col span="24">
                            <br />
                            <TextArea rows={4} value={introducemd} placeholder="文章简介" onChange={changeIntroduce} onPressEnter={changeIntroduce}></TextArea>
                            <br /><br />
                            <div className="introduce-html" dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }}></div>
                        </Col>
                        <Col span={12}>
                            <div className="data-select">
                                <DatePicker placeholder="发布日期" size="large" onChange={(date,dateString) => setShowDate(dateString)}/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle;