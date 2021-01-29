import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Card, Input, Button, Spin} from 'antd'
import '../static/css/Login.css'

function Login(){

    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)//防止重复提交

    const checkLogin = () =>{
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
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