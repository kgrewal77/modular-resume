import React, {useState,useEffect} from 'react';
import DOMPurify from 'dompurify'
import { InView } from 'react-intersection-observer';
import {Helmet} from 'react-helmet';


import '../style/index.css';
import "../style/prism.css";


import {
    insertStructure,
    updateStructureByKey,
    getStructureByKey,
} from '../api/index.js';

import keyboard from '../img/keyboard.jpg';
import circuit from '../img/circuit_blue_half.jpg';
import suit from '../img/suit.png';
import rezume from '../img/rezume.PNG';
import diginto from '../img/diginto.PNG';
import gif from '../img/loader.gif';





// consts

const email = "kgrewal7777@gmail.com";
const linkedin = "https://www.linkedin.com/in/kabir-grewal-9b8b8a10a";
const github = "https://github.com/kgrewal77";


// Nav Components

  const EditBtn = (props) => {

    return <span className="iconcol">
          <i onClick={()=>{props.setEdit(!props.edit)}} 
             className={`fa icon ${props.edit? 'fa-undo' : 'fa-pencil-square-o'} `}>
            
          </i>
      </span>;
  }

  const SaveBtn = (props) => {

    return <span className="iconcol">
          <i onClick={()=>{

            let j;
            try {
              j = JSON.parse(props.rowtext);
              updateStructureByKey(props.structkey,{"rowdata":j})
                .then(()=>{
                  window.location.reload(true);
                })
                .catch(error=>{
                  alert("update failed: " + error.response.data.error);
                });
            } catch (e) {
              alert("invalid json");
            }
            

          }} 
             className={`fa icon fa-save`}>
            
          </i>
      </span>;
  }

  const SaveAsBtn = (props) => {

    return <span className="iconcol save-icon">
          <i className={`fa icon fa-plus`}
             onClick={()=>{

            let j;
            let k = window.prompt("enter resume name:");
            try {
              j = JSON.parse(props.rowtext);
              insertStructure({"rowdata":j,key:k})
                .then(()=>{
                  window.location.href = "/" + k;
                })
                .catch(error=>{
                  alert("create failed: " + error.response.data.error);

                });
            } catch (e) {
              alert("invalid json");
              //console.log(e);
            }


          }}>
            
          </i>
      </span>;
  }

  const LoadBtn = () => {

    return <span className="iconcol">
          <i onClick={()=>{

            let k = window.prompt("load existing rezume by name:");
            getStructureByKey(k)
              .then(()=>{
                window.location.href = "/" + k;
              }).catch(error=>{
                alert("load failed: "+error.response.data.error);
              });
               
          }} 
             className={`fa icon fa-folder-open`}>
            
          </i>
      </span>;
  }


  const NavBar = (props) => {
   // console.log(props.backcolor||'white');
     // console.log(props);
     return (
        <div className="navbar sticky" style={{color:`${props.textColor||'#1D1D29'}`,background:`${props.backcolor||'grey'}`} }>
          <span className="namerow"> 
            <a href="/">
              <span className="title">RE-ZU.ME</span>
            </a>

          </span>
          <span className="iconrow">
            <EditBtn edit={props.edit} setEdit={props.setEdit}/>
            {props.edit ?
              <React.Fragment>
                  <LoadBtn/> 
                  {!['home','kabir','edit'].includes(props.structkey) && 
                    <SaveBtn structkey={props.structkey} rowtext={props.rowtext} />} 
                  <SaveAsBtn rowtext={props.rowtext} />
              </React.Fragment> :
              <React.Fragment>
                    <IconLink icon="fa-at"
                               link={`mailto:${email}`}
                               />
                    <IconLink icon="fa-github"
                               link={github}
                               />
                    <IconLink icon="fa-linkedin"
                               link={linkedin}
                               />
              </React.Fragment>
              }
          </span>
        </div>
        );
  }

  const IconLink = (props) => {

    return (
      <span className="iconcol">
        <a href={props.link}
            target="_blank"
            rel="noreferrer"
            className="iconlink" >
          <i className={`fa icon ${props.icon}`}>
            
          </i>
        </a>
      </span>
      );
    }

// Content Components
  const Box = (props) => {

    const BoxTag = props.box.href ? `a` : `div`;
    return (
     <BoxTag
        className="box" 
        style={props.box.boxStyle}
        href={props.box.href}
        target={props.box.target || '_self'}>
        <span
          className="box-text" 
          style={props.box.textStyle}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.box.text)}}>
        </span>
      </BoxTag> )
  }

  const Pane = (props) => {

    let a;
    switch(props.img_src) {
      case '../img/circuit_blue_half.jpg': a=circuit; break;
      case '../img/suit.png': a=suit; break;
      case '../img/rezume.PNG': a=rezume; break;
      case '../img/diginto.PNG': a=diginto; break;
      case '../img/keyboard.jpg': a=keyboard; break;
      default: a=props.img_src;
    }

    return (
      <span className={`pane ${props.size === 1 && 'pane__full'} ${a ? 'parallax' : 'pane__noimg'}`}
            style={a && {backgroundImage:`url(${a})`}}>
        {props.text ? 
          <p className="text-pane" 
             style={{"textAlign":`${props.align?props.align:'default'}`,
                     "color":`${props.fontColor?props.fontColor:'black'}`}}
             dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.text)}}>
          </p>
         :<div className="img-pane"></div>
        }
        {props.boxes &&
          props.boxes.map((value,index) => {
                  return <Box size={props.boxes.length}
                               key={index}
                               box={value}/>

            })
        }
      </span>

    );
  }


  const ContentRow = (props) => {

    const l = props.panels.length;

    return (
      <InView as="div" 
              // threshold={[.07,.93]}
              threshold={.035}
              rootMargin={"-93% 0px 0px 0px"}
              onChange={
                (inView, entry) => {
                  //console.log(entry);
                  //if (entry.intersectionRect.bottom === (window.innerHeight)) {
                    //console.log(entry);
                  if (entry.intersectionRatio > .035) {
                    props.changeHeaderColor(props.navcolor||'white');
                  }
                  //}
                }}>
          <div //className="slide" 
          className={`${props.last  ? " slide__bottom ":""} 
                      ${props.size === 'full' ? " slide__full ":""} 
                      ${props.size === 'three-quarter' ? " slide__34 ":""} 
                      ${props.size === 'half' ? " slide__half ":""} 
                      slide`}
          style={{background:`${props.backcolor||'white'}`}}>
            {props.panels.map((value,index) => {
                        return <Pane size={l}
                                     key={index}
                                     text={value.content}
                                     align={value.align}
                                     fontColor={value.fontcolor}
                                     img_src={value.img}
                                     boxes={value.boxes}/>

                  })
            }
          </div>
      </InView>

    );
  };

  const Editor = (props) => {


    return (
      <div className="editor">

        <div className="edit-area">
          <pre>
            <code onBlur={(e)=>{ 

                props.setRowText(DOMPurify.sanitize(e.target.innerHTML)
                    .replace(/&amp;/g,'&')
                    .replace(/&lt;/g,'<')
                    .replace(/&gt;/g,'>')
                    .replace(/&quot;/g,'"')
                    .replace(/&#039;/g,"'")

                    );
              }}  
                  contentEditable="true">
            {props.rowtext}
            </code>
          </pre>
        </div>
      </div>);
    // const[struct, setStruct] = useState({key="",rowdata=props.rowdata});
  }

  const Content = (props) => {
    let l = 0;
    if (props.rowdata) {
      l = props.rowdata.length;
    }

    const [color,setColor] = useState('white');
    const [rowtext,setRowText] = useState('[]');


    useEffect(()=>{
        setRowText(JSON.stringify(props.rowdata,null,2))
      }
    ,[props.rowdata]);



    if (props.edit){

      return (
      <div>
          <NavBar textColor={'darkgoldenrod'} 
                  edit={props.edit} 
                  setEdit={props.setEdit} 
                  backcolor={'#1D1D29'}
                  structkey={props.contentkey} 
                  rowtext={rowtext} 
                  />
          <Editor rowtext={rowtext} setRowText={setRowText} />
      </div>);
    } else {
      return (
        <div className="content">
          {<NavBar structkey={props.contentkey} 
                                       rowtext={rowtext} 
                                       edit={props.edit} 
                                       setEdit={props.setEdit} 
                                       backcolor={color}/>}
          {l !== 0 ?
            props.rowdata.map((value,index) => {
                return <ContentRow 
                  key={index} 
                  last={l-index-1 === 0 && l>1} 
                  backcolor={value.backcolor} 
                  navcolor={value.navcolor || value.backcolor}
                  panels={value.panels} 
                  size={value.size}
                  changeHeaderColor={setColor}/>
              })
            
           :<img className="loader" src={gif} alt="spinner"/>
          }
        </div>
      );
    }
  }


// App Code
  const App = (props) => {

    const key = window.location.pathname.substring(1);
    const [structure,setStructure] = useState({rowdata:[]});
    const [edit,setEdit] = useState(false);
    //console.log(key);
    useEffect( ()=>{

      getStructureByKey(key || 'home').then(res => {
        if (!res.data.success) {
          //console.log('oh no');
          return;
        }
        setStructure(res.data.data);
      });
    
    } ,[key,setStructure]);

    return (
        <React.Fragment>
          <Helmet>
            <title> Rezume </title>
            <meta property="og:title" content="Re-Zu.Me: Custom Resume Builder" data-rh="true"/>
            <meta property="og:description" content="Tailor your Resume to each potential employer with Re-Zu.Me" data-rh="true"/>
            <meta property="og:url" content="https://re-zu.me"/>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"/>
          </Helmet>
          <Content edit={edit} setEdit={setEdit} contentkey={key||'home'} rowdata={structure.rowdata}/>
        </React.Fragment>
      );
    }

export default App;

