import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import styles from '../styles/pages/index.module.css'
import enjoyStyles from '../styles/pages/enjoy.module.css'
import { Row, Col, List, Icon, Card } from 'antd'
import React, { useState } from 'react'


export default function Enjoy() {

  const { Meta } = Card;

  const [myList, setList] = useState(
    [
      {alt: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2776608547,3948027272&fm=26&gp=0.jpg', title: '布偶猫', context: '布偶猫是猫中较大、较重的一种。它的头呈V形，眼大而圆，被毛丰厚，四肢粗大，尾长，身体柔软，多为三色或双色猫。布偶猫抱起来像软绵绵的布偶，而且对人非常友善！' },
      { alt: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=802831659,2784506268&fm=111&gp=0.jpg',title: '狸花猫', context: '狸花猫是一种体格健壮的大型猫咪，长有美丽的斑纹被毛。尽管它感情不太外露，但还是能成为忠实友好的宠物。狸花猫以聪明的捕猎技巧而著称，需要较大的运动空间，所以不适宜小公寓的圈养生活。' },
      { alt:'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3544918438,2478078860&fm=26&gp=0.jpg',title: '土拨鼠', context: '土拨鼠（Marmota）是啮齿目其中一种，旱獭属，又名土属拨鼠草地獭，又叫哈拉、雪猪、曲娃（藏语）。在外形和生活方式上都与鼠类相似，是松鼠科中体型最大的一种，是陆生和穴居的草食性、冬眠性野生动物。' },
      { alt:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=784536254,3522626623&fm=26&gp=0.jpg',title: '虎皮鹦鹉', context: '虎皮鹦鹉（学名：Melopsittacus undulatus）是鹦形目鹦鹉科的鸟类，又名娇凤，属小型攀禽品种，原产于澳大利亚的内陆地区，野生的虎皮鹦鹉栖息于林缘、草地等处。结群活动。' },
      { alt:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2166110741,1009483339&fm=26&gp=0.jpg',title: '拉仔', context: '拉姆是《摩尔庄园》中常见的宠物，常常跟随着摩尔住人玩耍和战斗，其中分为初级、中级和高级拉姆，图片是乐乐的拉姆拉仔。' },
      { alt:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2260309235,4129436638&fm=26&gp=0.jpg',title: '山雀', context: '山雀属于脊椎动物，鸟纲，是山雀科（Paridae）各种类的通称。小型鸣禽。树栖，主食昆虫及其幼虫，为农林益鸟。常见于平原、丘陵、盆地等，在山地林区数量犹较平原地区的数量多。' },
      { alt:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=527813313,1743834670&fm=26&gp=0.jpg',title: '雪狐', context: '北极狐（学名：Alopex lagopus），也称为白狐、雪狐，主要分布在西伯利亚及北美洲的苔原地带。有良好、敏锐的听力。' },
      {alt: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2776608547,3948027272&fm=26&gp=0.jpg', title: '布偶猫', context: '布偶猫是猫中较大、较重的一种。它的头呈V形，眼大而圆，被毛丰厚，四肢粗大，尾长，身体柔软，多为三色或双色猫。布偶猫抱起来像软绵绵的布偶，而且对人非常友善！' },
      { alt: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=802831659,2784506268&fm=111&gp=0.jpg',title: '狸花猫', context: '狸花猫是一种体格健壮的大型猫咪，长有美丽的斑纹被毛。尽管它感情不太外露，但还是能成为忠实友好的宠物。狸花猫以聪明的捕猎技巧而著称，需要较大的运动空间，所以不适宜小公寓的圈养生活。' },
      { alt:'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3544918438,2478078860&fm=26&gp=0.jpg',title: '土拨鼠', context: '土拨鼠（Marmota）是啮齿目其中一种，旱獭属，又名土属拨鼠草地獭，又叫哈拉、雪猪、曲娃（藏语）。在外形和生活方式上都与鼠类相似，是松鼠科中体型最大的一种，是陆生和穴居的草食性、冬眠性野生动物。' },
      { alt:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=784536254,3522626623&fm=26&gp=0.jpg',title: '虎皮鹦鹉', context: '虎皮鹦鹉（学名：Melopsittacus undulatus）是鹦形目鹦鹉科的鸟类，又名娇凤，属小型攀禽品种，原产于澳大利亚的内陆地区，野生的虎皮鹦鹉栖息于林缘、草地等处。结群活动。' },
      { alt:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2166110741,1009483339&fm=26&gp=0.jpg',title: '拉仔', context: '拉姆是《摩尔庄园》中常见的宠物，常常跟随着摩尔住人玩耍和战斗，其中分为初级、中级和高级拉姆，图片是乐乐的拉姆拉仔。' },
      { alt:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2260309235,4129436638&fm=26&gp=0.jpg',title: '山雀', context: '山雀属于脊椎动物，鸟纲，是山雀科（Paridae）各种类的通称。小型鸣禽。树栖，主食昆虫及其幼虫，为农林益鸟。常见于平原、丘陵、盆地等，在山地林区数量犹较平原地区的数量多。' },
      { alt:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=527813313,1743834670&fm=26&gp=0.jpg',title: '雪狐', context: '北极狐（学名：Alopex lagopus），也称为白狐、雪狐，主要分布在西伯利亚及北美洲的苔原地带。有良好、敏锐的听力。' },
    ]
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
            <div className={enjoyStyles.masonry}>
          <List
              dataSource={myList}
              renderItem={item => (
                <List.Item>
                  <Card bordered={false} hoverable={true}>
         <div className={enjoyStyles.item}>
                    <img src={item.alt} />
                    <h2>{item.title}</h2>
                    <p>{item.context}</p>
                  </div>
        </Card>
                  
                </List.Item>
              )}
            />
            </div>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={9} lg={9} xl={9}>
          <Author />
          <Advert />
        </Col>
      </Row>

      <div>
        <Footer />
      </div>

    </div>
  )
}
