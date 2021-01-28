import styles from '../styles/components/advert.module.css'

const Advert = ()=>{
    return (
        <div className={styles.advertDiv}>
            <div>更多放心的呵护~</div>
          <div><img src="https://www.inabafoods.com.cn/uploadfile/2020/1029/20201029105525884.jpg" width="100%" /></div>
          <div><img src="http://www.royal-canin.cn/img/breadclassPC.6a1e874a.jpg" width="100%" /></div>
          <div><img src="https://www.myfoodiepet.com/images/health/customize_img.jpg" width="100%" /></div>
        </div>
    )
 }

 export default Advert