import React, { useEffect, useState } from 'react'
import { Frame, Header, Heading, Link, Words, Row, Col } from 'arwes'

const testData = [
  {
    title: 'Test Data Test Data Test Data Test Data Test Data',
    created: '3/23/2022',
    docs: 9,
    stl: 1,
    stp: 9,
    pics: 10,
    size: 9.28,
    link: 'http://house.gov/tempus/vel/pede/morbi.png?euismod=consequat&scelerisque=dui&quam=nec&turpis=nisi&adipiscing=volutpat&lorem=eleifend&vitae=donec&mattis=ut&nibh=dolor&ligula=morbi&nec=vel&sem=lectus&duis=in&aliquam=quam&convallis=fringilla&nunc=rhoncus&proin=mauris&at=enim&turpis=leo&a=rhoncus&pede=sed&posuere=vestibulum&nonummy=sit&integer=amet&non=cursus&velit=id&donec=turpis&diam=integer&neque=aliquet&vestibulum=massa&eget=id&vulputate=lobortis&ut=convallis&ultrices=tortor&vel=risus&augue=dapibus&vestibulum=augue&ante=vel&ipsum=accumsan&primis=tellus&in=nisi&faucibus=eu&orci=orci&luctus=mauris&et=lacinia&ultrices=sapien&posuere=quis&cubilia=libero&curae=nullam&donec=sit&pharetra=amet&magna=turpis&vestibulum=elementum&aliquet=ligula&ultrices=vehicula&erat=consequat&tortor=morbi&sollicitudin=a&mi=ipsum&sit=integer&amet=a&lobortis=nibh&sapien=in&sapien=quis&non=justo&mi=maecenas&integer=rhoncus&ac=aliquam&neque=lacus&duis=morbi&bibendum=quis&morbi=tortor&non=id&quam=nulla&nec=ultrices&dui=aliquet&luctus=maecenas&rutrum=leo&nulla=odio&tellus=condimentum&in=id&sagittis=luctus&dui=nec&vel=molestie',
  },
  {
    title: 'tincidunt eget',
    created: '10/7/2021',
    docs: 1,
    stl: 8,
    stp: 5,
    pics: 6,
    size: 4.74,
    link: 'http://discovery.com/adipiscing/elit/proin/risus/praesent/lectus.json?ultrices=nulla&mattis=eget',
  },
  {
    title: 'ante ipsum primis',
    created: '10/1/2021',
    docs: 10,
    stl: 7,
    stp: 4,
    pics: 1,
    size: 1.1,
    link: 'https://barnesandnoble.com/tempus/semper/est.html?malesuada=quam&in=a&imperdiet=odio&et=in&commodo=hac&vulputate=habitasse&justo=platea&in=dictumst&blandit=maecenas&ultrices=ut&enim=massa&lorem=quis&ipsum=augue&dolor=luctus&sit=tincidunt&amet=nulla&consectetuer=mollis&adipiscing=molestie&elit=lorem',
  },
  {
    title: 'vulputate',
    created: '1/9/2022',
    docs: 9,
    stl: 3,
    stp: 1,
    pics: 4,
    size: 7.67,
    link: 'https://taobao.com/lectus.png?dolor=donec&morbi=dapibus&vel=duis&lectus=at&in=velit&quam=eu&fringilla=est&rhoncus=congue&mauris=elementum&enim=in&leo=hac',
  },
  {
    title: 'dui proin leo odio',
    created: '12/27/2021',
    docs: 6,
    stl: 6,
    stp: 9,
    pics: 5,
    size: 2.19,
    link: 'http://buzzfeed.com/leo/rhoncus/sed.json?potenti=in&cras=purus&in=eu&purus=magna&eu=vulputate&magna=luctus&vulputate=cum&luctus=sociis&cum=natoque&sociis=penatibus&natoque=et&penatibus=magnis&et=dis&magnis=parturient&dis=montes&parturient=nascetur&montes=ridiculus&nascetur=mus&ridiculus=vivamus&mus=vestibulum&vivamus=sagittis&vestibulum=sapien&sagittis=cum&sapien=sociis&cum=natoque&sociis=penatibus&natoque=et&penatibus=magnis&et=dis&magnis=parturient&dis=montes&parturient=nascetur&montes=ridiculus&nascetur=mus&ridiculus=etiam&mus=vel&etiam=augue&vel=vestibulum&augue=rutrum&vestibulum=rutrum&rutrum=neque&rutrum=aenean&neque=auctor&aenean=gravida&auctor=sem&gravida=praesent&sem=id',
  },
  {
    title: 'posuere cubilia curae',
    created: '5/10/2022',
    docs: 2,
    stl: 9,
    stp: 6,
    pics: 1,
    size: 7.73,
    link: 'http://livejournal.com/etiam.js?tortor=velit&duis=id&mattis=pretium&egestas=iaculis&metus=diam&aenean=erat&fermentum=fermentum&donec=justo&ut=nec&mauris=condimentum&eget=neque&massa=sapien&tempor=placerat&convallis=ante&nulla=nulla&neque=justo&libero=aliquam&convallis=quis&eget=turpis&eleifend=eget&luctus=elit&ultricies=sodales&eu=scelerisque&nibh=mauris&quisque=sit&id=amet&justo=eros&sit=suspendisse&amet=accumsan&sapien=tortor&dignissim=quis&vestibulum=turpis&vestibulum=sed&ante=ante&ipsum=vivamus&primis=tortor&in=duis&faucibus=mattis&orci=egestas&luctus=metus&et=aenean&ultrices=fermentum&posuere=donec&cubilia=ut&curae=mauris&nulla=eget&dapibus=massa&dolor=tempor&vel=convallis&est=nulla&donec=neque&odio=libero&justo=convallis&sollicitudin=eget&ut=eleifend&suscipit=luctus&a=ultricies&feugiat=eu&et=nibh&eros=quisque&vestibulum=id&ac=justo&est=sit&lacinia=amet&nisi=sapien&venenatis=dignissim&tristique=vestibulum&fusce=vestibulum&congue=ante&diam=ipsum&id=primis&ornare=in&imperdiet=faucibus&sapien=orci&urna=luctus&pretium=et&nisl=ultrices&ut=posuere&volutpat=cubilia&sapien=curae&arcu=nulla&sed=dapibus&augue=dolor&aliquam=vel&erat=est&volutpat=donec&in=odio&congue=justo',
  },
  {
    title: 'justo morbi ut',
    created: '1/6/2022',
    docs: 8,
    stl: 3,
    stp: 5,
    pics: 6,
    size: 4.97,
    link: 'http://multiply.com/consectetuer/adipiscing/elit/proin/risus/praesent.xml?eget=sit&massa=amet&tempor=erat&convallis=nulla&nulla=tempus&neque=vivamus&libero=in&convallis=felis&eget=eu&eleifend=sapien&luctus=cursus&ultricies=vestibulum&eu=proin&nibh=eu&quisque=mi&id=nulla&justo=ac&sit=enim&amet=in&sapien=tempor&dignissim=turpis&vestibulum=nec&vestibulum=euismod&ante=scelerisque&ipsum=quam&primis=turpis&in=adipiscing&faucibus=lorem&orci=vitae&luctus=mattis&et=nibh&ultrices=ligula&posuere=nec&cubilia=sem&curae=duis&nulla=aliquam&dapibus=convallis&dolor=nunc&vel=proin&est=at&donec=turpis&odio=a&justo=pede&sollicitudin=posuere&ut=nonummy&suscipit=integer&a=non&feugiat=velit&et=donec&eros=diam&vestibulum=neque&ac=vestibulum&est=eget&lacinia=vulputate&nisi=ut&venenatis=ultrices&tristique=vel&fusce=augue&congue=vestibulum&diam=ante&id=ipsum&ornare=primis&imperdiet=in&sapien=faucibus&urna=orci&pretium=luctus&nisl=et&ut=ultrices&volutpat=posuere&sapien=cubilia&arcu=curae&sed=donec&augue=pharetra&aliquam=magna&erat=vestibulum&volutpat=aliquet&in=ultrices&congue=erat&etiam=tortor&justo=sollicitudin&etiam=mi&pretium=sit&iaculis=amet&justo=lobortis&in=sapien&hac=sapien&habitasse=non&platea=mi&dictumst=integer&etiam=ac&faucibus=neque&cursus=duis&urna=bibendum&ut=morbi&tellus=non',
  },
  {
    title: 'proin risus praesent lectus',
    created: '1/16/2022',
    docs: 7,
    stl: 7,
    stp: 10,
    pics: 8,
    size: 1.18,
    link: 'https://mlb.com/nulla/suspendisse.jsp?turpis=mus&elementum=vivamus&ligula=vestibulum&vehicula=sagittis&consequat=sapien&morbi=cum&a=sociis&ipsum=natoque&integer=penatibus&a=et&nibh=magnis&in=dis&quis=parturient&justo=montes&maecenas=nascetur&rhoncus=ridiculus&aliquam=mus&lacus=etiam&morbi=vel&quis=augue&tortor=vestibulum&id=rutrum&nulla=rutrum&ultrices=neque&aliquet=aenean&maecenas=auctor&leo=gravida&odio=sem&condimentum=praesent&id=id&luctus=massa&nec=id&molestie=nisl&sed=venenatis&justo=lacinia&pellentesque=aenean&viverra=sit&pede=amet&ac=justo&diam=morbi&cras=ut&pellentesque=odio&volutpat=cras&dui=mi&maecenas=pede&tristique=malesuada&est=in&et=imperdiet&tempus=et&semper=commodo&est=vulputate&quam=justo&pharetra=in&magna=blandit&ac=ultrices&consequat=enim&metus=lorem&sapien=ipsum&ut=dolor&nunc=sit&vestibulum=amet&ante=consectetuer&ipsum=adipiscing&primis=elit&in=proin&faucibus=interdum&orci=mauris&luctus=non&et=ligula&ultrices=pellentesque&posuere=ultrices&cubilia=phasellus&curae=id&mauris=sapien&viverra=in&diam=sapien&vitae=iaculis&quam=congue&suspendisse=vivamus&potenti=metus&nullam=arcu&porttitor=adipiscing&lacus=molestie&at=hendrerit&turpis=at&donec=vulputate&posuere=vitae&metus=nisl&vitae=aenean&ipsum=lectus&aliquam=pellentesque&non=eget&mauris=nunc&morbi=donec&non=quis&lectus=orci&aliquam=eget&sit=orci',
  },
  {
    title: 'diam id',
    created: '5/15/2022',
    docs: 8,
    stl: 6,
    stp: 9,
    pics: 1,
    size: 9.75,
    link: 'https://macromedia.com/luctus/rutrum/nulla.xml?semper=viverra&sapien=diam&a=vitae&libero=quam&nam=suspendisse&dui=potenti&proin=nullam&leo=porttitor&odio=lacus&porttitor=at&id=turpis&consequat=donec&in=posuere&consequat=metus&ut=vitae&nulla=ipsum&sed=aliquam&accumsan=non&felis=mauris&ut=morbi&at=non&dolor=lectus&quis=aliquam&odio=sit&consequat=amet&varius=diam&integer=in&ac=magna&leo=bibendum&pellentesque=imperdiet&ultrices=nullam&mattis=orci&odio=pede&donec=venenatis&vitae=non&nisi=sodales&nam=sed&ultrices=tincidunt&libero=eu&non=felis&mattis=fusce&pulvinar=posuere&nulla=felis&pede=sed&ullamcorper=lacus&augue=morbi&a=sem&suscipit=mauris&nulla=laoreet&elit=ut&ac=rhoncus&nulla=aliquet&sed=pulvinar&vel=sed&enim=nisl&sit=nunc&amet=rhoncus&nunc=dui&viverra=vel&dapibus=sem&nulla=sed&suscipit=sagittis&ligula=nam&in=congue&lacus=risus&curabitur=semper&at=porta&ipsum=volutpat&ac=quam&tellus=pede&semper=lobortis&interdum=ligula&mauris=sit&ullamcorper=amet&purus=eleifend&sit=pede&amet=libero&nulla=quis&quisque=orci&arcu=nullam&libero=molestie&rutrum=nibh&ac=in&lobortis=lectus&vel=pellentesque',
  },
  {
    title: 'duis consequat dui',
    created: '5/13/2022',
    docs: 10,
    stl: 1,
    stp: 3,
    pics: 4,
    size: 9.91,
    link: 'https://whitehouse.gov/at/nulla.html?montes=ipsum&nascetur=primis&ridiculus=in&mus=faucibus&etiam=orci&vel=luctus&augue=et&vestibulum=ultrices&rutrum=posuere&rutrum=cubilia&neque=curae&aenean=donec&auctor=pharetra&gravida=magna&sem=vestibulum&praesent=aliquet&id=ultrices&massa=erat&id=tortor&nisl=sollicitudin&venenatis=mi&lacinia=sit&aenean=amet&sit=lobortis&amet=sapien&justo=sapien&morbi=non&ut=mi&odio=integer&cras=ac&mi=neque&pede=duis&malesuada=bibendum&in=morbi&imperdiet=non&et=quam&commodo=nec&vulputate=dui&justo=luctus&in=rutrum&blandit=nulla&ultrices=tellus&enim=in&lorem=sagittis&ipsum=dui&dolor=vel&sit=nisl&amet=duis&consectetuer=ac&adipiscing=nibh&elit=fusce&proin=lacus&interdum=purus&mauris=aliquet&non=at&ligula=feugiat&pellentesque=non&ultrices=pretium&phasellus=quis&id=lectus&sapien=suspendisse&in=potenti&sapien=in&iaculis=eleifend&congue=quam&vivamus=a&metus=odio',
  },
  {
    title: 'ullamcorper purus sit amet',
    created: '2/28/2022',
    docs: 2,
    stl: 5,
    stp: 5,
    pics: 8,
    size: 7.52,
    link: 'https://chronoengine.com/eros/suspendisse/accumsan/tortor/quis.html?magnis=est&dis=et&parturient=tempus&montes=semper&nascetur=est&ridiculus=quam&mus=pharetra&etiam=magna&vel=ac&augue=consequat&vestibulum=metus&rutrum=sapien&rutrum=ut&neque=nunc&aenean=vestibulum&auctor=ante&gravida=ipsum&sem=primis&praesent=in&id=faucibus&massa=orci&id=luctus&nisl=et&venenatis=ultrices&lacinia=posuere&aenean=cubilia&sit=curae&amet=mauris&justo=viverra&morbi=diam&ut=vitae&odio=quam&cras=suspendisse&mi=potenti&pede=nullam&malesuada=porttitor&in=lacus&imperdiet=at&et=turpis&commodo=donec&vulputate=posuere&justo=metus&in=vitae&blandit=ipsum&ultrices=aliquam&enim=non&lorem=mauris&ipsum=morbi&dolor=non&sit=lectus&amet=aliquam&consectetuer=sit&adipiscing=amet&elit=diam&proin=in&interdum=magna&mauris=bibendum&non=imperdiet&ligula=nullam&pellentesque=orci&ultrices=pede&phasellus=venenatis&id=non&sapien=sodales&in=sed&sapien=tincidunt&iaculis=eu&congue=felis&vivamus=fusce&metus=posuere&arcu=felis&adipiscing=sed&molestie=lacus&hendrerit=morbi&at=sem',
  },
  {
    title: 'morbi sem',
    created: '7/28/2021',
    docs: 1,
    stl: 4,
    stp: 2,
    pics: 4,
    size: 5.9,
    link: 'http://surveymonkey.com/non/velit/donec/diam/neque/vestibulum/eget.html?vestibulum=donec&velit=ut&id=mauris&pretium=eget&iaculis=massa&diam=tempor&erat=convallis&fermentum=nulla&justo=neque&nec=libero&condimentum=convallis&neque=eget&sapien=eleifend&placerat=luctus&ante=ultricies&nulla=eu&justo=nibh&aliquam=quisque&quis=id&turpis=justo&eget=sit&elit=amet&sodales=sapien&scelerisque=dignissim&mauris=vestibulum&sit=vestibulum&amet=ante&eros=ipsum&suspendisse=primis&accumsan=in&tortor=faucibus&quis=orci&turpis=luctus&sed=et&ante=ultrices&vivamus=posuere&tortor=cubilia&duis=curae&mattis=nulla&egestas=dapibus&metus=dolor&aenean=vel&fermentum=est&donec=donec&ut=odio&mauris=justo&eget=sollicitudin&massa=ut&tempor=suscipit&convallis=a&nulla=feugiat&neque=et&libero=eros&convallis=vestibulum&eget=ac&eleifend=est&luctus=lacinia&ultricies=nisi&eu=venenatis&nibh=tristique&quisque=fusce&id=congue&justo=diam&sit=id&amet=ornare&sapien=imperdiet&dignissim=sapien&vestibulum=urna&vestibulum=pretium&ante=nisl&ipsum=ut&primis=volutpat&in=sapien&faucibus=arcu&orci=sed&luctus=augue&et=aliquam&ultrices=erat&posuere=volutpat&cubilia=in&curae=congue&nulla=etiam',
  },
  {
    title: 'rutrum',
    created: '3/27/2022',
    docs: 7,
    stl: 6,
    stp: 10,
    pics: 9,
    size: 7.49,
    link: 'http://stanford.edu/congue/vivamus/metus/arcu/adipiscing.jpg?dolor=amet&sit=consectetuer&amet=adipiscing&consectetuer=elit&adipiscing=proin&elit=interdum&proin=mauris&interdum=non&mauris=ligula&non=pellentesque&ligula=ultrices&pellentesque=phasellus&ultrices=id&phasellus=sapien&id=in&sapien=sapien&in=iaculis&sapien=congue&iaculis=vivamus&congue=metus&vivamus=arcu&metus=adipiscing&arcu=molestie&adipiscing=hendrerit&molestie=at&hendrerit=vulputate&at=vitae&vulputate=nisl&vitae=aenean&nisl=lectus&aenean=pellentesque',
  },
  {
    title: 'consequat ut',
    created: '12/9/2021',
    docs: 3,
    stl: 3,
    stp: 10,
    pics: 7,
    size: 7.26,
    link: 'https://bigcartel.com/tristique/tortor/eu.html?erat=ligula&eros=sit&viverra=amet&eget=eleifend&congue=pede',
  },
  {
    title: 'non velit',
    created: '3/30/2022',
    docs: 7,
    stl: 10,
    stp: 7,
    pics: 7,
    size: 3.31,
    link: 'http://irs.gov/sodales/scelerisque/mauris/sit/amet/eros.js?rhoncus=natoque&sed=penatibus&vestibulum=et&sit=magnis&amet=dis&cursus=parturient&id=montes&turpis=nascetur&integer=ridiculus&aliquet=mus&massa=vivamus&id=vestibulum&lobortis=sagittis&convallis=sapien&tortor=cum&risus=sociis&dapibus=natoque&augue=penatibus&vel=et&accumsan=magnis&tellus=dis&nisi=parturient&eu=montes&orci=nascetur&mauris=ridiculus&lacinia=mus&sapien=etiam&quis=vel&libero=augue&nullam=vestibulum&sit=rutrum&amet=rutrum&turpis=neque&elementum=aenean&ligula=auctor&vehicula=gravida&consequat=sem&morbi=praesent&a=id&ipsum=massa&integer=id&a=nisl&nibh=venenatis&in=lacinia&quis=aenean&justo=sit&maecenas=amet&rhoncus=justo&aliquam=morbi&lacus=ut&morbi=odio&quis=cras&tortor=mi&id=pede&nulla=malesuada&ultrices=in&aliquet=imperdiet&maecenas=et&leo=commodo&odio=vulputate&condimentum=justo&id=in&luctus=blandit&nec=ultrices&molestie=enim&sed=lorem&justo=ipsum&pellentesque=dolor&viverra=sit&pede=amet&ac=consectetuer&diam=adipiscing&cras=elit&pellentesque=proin&volutpat=interdum&dui=mauris&maecenas=non&tristique=ligula&est=pellentesque&et=ultrices&tempus=phasellus&semper=id&est=sapien&quam=in&pharetra=sapien&magna=iaculis&ac=congue&consequat=vivamus&metus=metus&sapien=arcu&ut=adipiscing&nunc=molestie&vestibulum=hendrerit&ante=at&ipsum=vulputate&primis=vitae&in=nisl&faucibus=aenean&orci=lectus&luctus=pellentesque',
  },
  {
    title: 'luctus rutrum nulla',
    created: '10/1/2021',
    docs: 2,
    stl: 4,
    stp: 10,
    pics: 9,
    size: 6.34,
    link: 'http://squidoo.com/integer/tincidunt/ante/vel/ipsum.jpg?dapibus=id&augue=justo&vel=sit&accumsan=amet&tellus=sapien&nisi=dignissim&eu=vestibulum&orci=vestibulum&mauris=ante&lacinia=ipsum&sapien=primis&quis=in&libero=faucibus&nullam=orci&sit=luctus&amet=et&turpis=ultrices&elementum=posuere&ligula=cubilia&vehicula=curae&consequat=nulla&morbi=dapibus&a=dolor&ipsum=vel&integer=est&a=donec&nibh=odio&in=justo&quis=sollicitudin&justo=ut&maecenas=suscipit&rhoncus=a&aliquam=feugiat&lacus=et&morbi=eros&quis=vestibulum&tortor=ac&id=est&nulla=lacinia&ultrices=nisi&aliquet=venenatis&maecenas=tristique&leo=fusce&odio=congue&condimentum=diam&id=id&luctus=ornare&nec=imperdiet',
  },
]

const print2aApiHost = 'https://print2a.com'
const print2aApiPort = '5757'
const print2aApiEndpoint = `${print2aApiHost}:${print2aApiPort}`

const GetLatest = (props) => {
  // console.log(props)
  const [latest, setLatest] = useState([
    { title: 'LOADING...', tags: 'LOADING...', link: '#' },
  ])
  async function getLatest() {
    const req = await fetch(`${print2aApiEndpoint}/LatestProjects`)
    const res = await req.json()
    setLatest(res)
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      getLatest()
    }
  }, [])
  const apiResponse = [...latest]
  const repoStats = [apiResponse.shift()]
  const stats = repoStats.map((stat, i) => {
    const details = stat.tags.split('\n').map((file, index) => {
      const key = file.split(':')[0]
      const value = file.split(':')[1]
      return (
        <Col s={10} m={10} l={10} xl={6} offset={['s1', 'm1', 'l1', 'xl3']}>
          <Frame
            animate
            level={3}
            corners={1}
            layer="primary"
            show={props.anim.entered}
          >
            <Words>{key}:&nbsp;</Words>
            <Words layer="alert">{value}</Words>
          </Frame>
          <br />
        </Col>
      )
    })
    return (
      <Row col s={12} m={12} l={10} xl={10} offset={['s0', 'm0', 'l1', 'xl1']}>
        <Frame
          animate
          level={3}
          corners={3}
          layer="primary"
          show={props.anim.entered}
        >
          <Heading style={{ paddingTop: 20 }} node="h2">
            {stat.title}
          </Heading>
          {details}
        </Frame>
      </Row>
    )
  })
  let latestProjects = [
    { desc: <i className="fa-solid fa-gun  fa-shake"></i> },
    { desc: 'Nothing New' },
    { desc: 'Check Back Later' },
    {
      desc: (
        <i data-fa-transform="flip-h" className="fa-solid fa-gun fa-shake"></i>
      ),
    },
  ].map((file) => (
    <Col s={3} m={3} l={3} xl={3} style={props.style}>
      <Frame>{file.desc}</Frame>
    </Col>
  ))
  if (/* apiResponse.length */ testData.length) {
    latestProjects = testData.map((project) => (
      // console.log(project)
      <Link href={project.link}>
        <Col s={12} m={12} l={6} xl={4} style={props.style}>
          <Frame
            animate
            level={3}
            corners={3}
            layer="primary"
            show={props.anim.entered}
          >
            <Header>
              <Heading style={{ margin: 0 }} node="h3">
                <Words className="project-title">{project.title}</Words>
              </Heading>
              <Words layer="primary">{project.created}</Words>
            </Header>
            <Row style={{ marginBottom: 0 }}>
              <Col s={6} m={6} l={6} xl={6}>
                <Words layer="primary">STL: {project.stl}</Words>
              </Col>
              <Col s={6} m={6} l={6} xl={6}>
                <Words layer="primary">STP: {project.stp}</Words>
              </Col>
            </Row>
            <Row style={{ marginBottom: 0 }}>
              <Col s={6} m={6} l={6} xl={6}>
                <Words layer="primary">Docs: {project.docs}</Words>
              </Col>
              <Col s={6} m={6} l={6} xl={6}>
                <Words layer="primary">Pics: {project.pics}</Words>
              </Col>
            </Row>
            <Col s={12} m={12} l={12} xl={12}>
              <Words layer="primary">Project Size: {project.size}</Words>
            </Col>
          </Frame>
        </Col>
      </Link>
    ))
  }

  // console.log(latestProjects)

  return [...stats, ...latestProjects]
}
export default GetLatest
