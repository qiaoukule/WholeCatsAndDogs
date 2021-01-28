import { Avatar, Divider, Tooltip } from 'antd'
import styles from '../styles/components/author.module.css'
import { GithubOutlined, QqOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

const Author = () => {
    return (
        <div className={styles.authorDiv}>
            <div> <Avatar size={75} src="http://qqiuklele.cn/wp-content/uploads/2020/10/%E5%8D%9A%E5%AE%A2%E5%A4%B4%E5%83%8F.png" /></div>
            <div className="author-introduction">
                学编程使人快乐！吸猫吸狗使人快乐！<br />听音乐使人快乐！静静阅读使人快乐！<br />愿你也永远快乐！
            <Divider>联系方式</Divider>
                <span className={styles.iconSpan}>
                    <Tooltip title="https://github.com/qiaoukule" className={styles.toolTipStyle}>
                        <GithubOutlined style={{cursor:"pointer"}} />
                    </Tooltip>
                </span>

                <span className={styles.iconSpan}>
                    <Tooltip title="675061026" style={{cursor:"pointer"}}>
                        <QqOutlined />
                    </Tooltip>
                </span>

                <span className={styles.iconSpan}>
                    <Tooltip title="200888-2008824" style={{cursor:"pointer"}}>
                        <PhoneOutlined />
                    </Tooltip>
                </span>

                <span className={styles.iconSpan}>
                    <Tooltip title="675061026@qq.com" style={{cursor:"pointer"}}>
                        <MailOutlined />
                    </Tooltip>
                </span>
            </div>
        </div>
    )
}

export default Author;