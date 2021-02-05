import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Card, Input, Button, Spin, message} from 'antd'
import '../static/css/Login.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'

function Login(props){

    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)//防止重复提交

    const checkLogin = () =>{
        setIsLoading(true)
       /* setTimeout(()=>{
            setIsLoading(false)
        },1000)*/
        if(!userName){
            message.error("用户名不能为空")
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }else if(!password) {
            message.error("密码不能为空")
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }
        let dataProps = {//以对象形式传递给后台
            'userName':userName,
            'password':password
        }
        axios({
            method:'post',
            url:servicePath.checkLogin,
            data:dataProps,
            withCredentials: true
        }).then(
            res => {
                setIsLoading(false)
                if(res.data.data == '登录成功') {
                    localStorage.setItem('openId',res.data.openId)
                    console.log(res.data.openId);
                    /*编程导航*/ 
                    props.history.push('/AdminIndex/')
                } else {
                    message.error('用户密码错误')
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    return(
        <div className="login-div">
              <Spin tip="Loading..." spinning={isLoading}>
                 <Card title="Login" bordered={true} style={{width: 400}}>
                     <Input 
                        id="userName"
                        size="large"
                        placeholder="Enter Your userName"
                        onChange={(e)=>{setUserName(e.target.value)}}
                    />
                     <br/><br/>
                    <Input.Password 
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                       
                       onChange={(e)=>{setPassword(e.target.value)}}
                     />
                      <br/><br/>
                        <Button type="primary" size="large" block onClick={checkLogin}>
                          Login in
                      </Button>  
                </Card> 
            </Spin>  
        </div>
    )
}

export default Login