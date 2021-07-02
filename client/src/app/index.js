import React, {useState,useEffect} from 'react';
import DOMPurify from 'dompurify'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { InView } from 'react-intersection-observer';

import '../style/index.css';

import {
    insertStructure,
    getAllStructures,
    updateStructureByKey,
    deleteStructureByKey,
    getStructureByKey,
} from '../api/index.js';

import keyboard from '../img/keyboard.jpg';
import circuit from '../img/circuit_blue_half.jpg';
import suit from '../img/suit.png';
import rezume from '../img/rezume.PNG';
import gif from '../img/loader.gif';

// db
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



// consts

const email = "kgrewal7777@gmail.com";
const linkedin = "https://www.linkedin.com/in/kabir-grewal-9b8b8a10a";
const github = "https://github.com/kgrewal77";


// Nav Components

  const NavBar = (props) => {
   // console.log(props.backcolor||'white');
     return (
        <div className="navbar sticky" style={{background:`${props.backcolor||'grey'}`} }>
          <span className="namerow"> 
            <a href="/">
              <span className="title">RE-ZU.ME</span>
            </a>
          </span>
          <span className="iconrow">
              <IconLink icon="fa-at"
                         link={`mailto:${email}`}
                         />
              <IconLink icon="fa-github"
                         link={github}
                         />
              <IconLink icon="fa-linkedin"
                         link={linkedin}
                         />
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
        href={props.box.href}>
        <span
          className="box-text" 
          style={props.box.textStyle}>{props.box.text}
        </span>
      </BoxTag> )
  }

  const Pane = (props) => {

    return (
      <span className={`pane ${props.size === 1 && 'pane__full'} ${props.img_src && 'parallax'}`}
            style={props.img_src && {backgroundImage:`url(${props.img_src})`}}>
        {props.text ? 
          <p className="text-pane" 
             style={{"textAlign":`${props.align?props.align:'default'}`}}
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
                      ${props.size === 'half' ? " slide__half ":""} 
                      slide`}
          style={{background:`${props.backcolor||'white'}`}}>
            {props.panels.map((value,index) => {
                        return <Pane size={l}
                                     key={index}
                                     text={value.content}
                                     align={value.align}
                                     img_src={value.img}
                                     boxes={value.boxes}/>

                  })
            }
          </div>
      </InView>

    );
  };

  const Content = (props) => {
    let l = 0;
    if (props.rowdata) {
      l = props.rowdata.length;
    }
    const [color,setColor] = useState('white');
    return (

        

      <div id="content">
        {props.contentkey && <NavBar backcolor={color}/>}
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


// App Code
  const App = (props) => {

    const key = window.location.pathname.substring(1);
    const [structure,setStructure] = useState({rowdata:[]});
    console.log(key);
    useEffect( ()=>{
      // if (!key){


      //   setStructure({
      //     rowdata: [
      //       {
      //         title:'home',
      //         backcolor: 'transparent',
      //         size:'full',
      //         panels:[
      //           {
      //             img:keyboard,
      //             boxes:[{text:"RE-ZU.ME",
      //                     textStyle:{"fontSize": "8vh",
      //                                "fontFamily":"azonix, sans-serif"}},
      //                    {text:"the simple networking solution"},
      //                    {text:"see mine",href:"/kabir"},
      //                    {text:"make yours",href:"/edit"}]
      //           }
      //         ]
      //       }
      //     ]
      //   });

      // } else {
      //   setStructure( {
      //       rowdata: [
      //         {
      //           title:'aboutMe',
      //           backcolor: 'transparent',
      //           size: 'full',
      //           panels:[
      //             {
      //               img:keyboard,
      //               boxes:[{text:"Kabir Grewal",
      //                     textStyle:{"fontSize": "8vh",
      //                                "fontFamily":"azonix, sans-serif"},
      //                     boxStyle:{background:'#2A4172'}},
      //                    {text:"software engineer",boxStyle:{background:'#2A4172'},textStyle:{"fontFamily":"azonix, sans-serif"}}]
      //                    // #2A4172 100%
      //             }
      //           ]
      //         },
      //         {
      //           title:'summary',
      //          backcolor:'linear-gradient(0deg,   #B0CCDC 0%, #e3dac5 100%)',
      //           navcolor:'#e3dac5',
                
      //           panels:[
      //             {
      //               content:"<div><h1>about me</h1>Software Engineer with 4 years of work experience. Quickly adapts to new environments and tech stacks. Experience with Web Development as well as DevOps engineering. Creative problem-solver who can work independently or collaborate with a team. Seeking employment opportunities that feature continually improving development philosophy and opportunities to engage with emerging technologies.</div>"
      //             }
      //           ]
      //         },
      //         {
      //           title:'tech',
      //           backcolor: '#B0CCDC', 
      //          size:'half',
      //           panels:[
      //             {img:circuit},
      //             {
      //               content:`
      //               <div><h1>tech</h1> <b><ul>
      //                 <li>React</li>
      //                 <li>Angular</li>
      //                 <li>Node</li>
      //                 <li>JS+HTML+CSS</li>
      //                 <li>AWS</li>
      //                 <li>NGINX</li>
      //               </b></ul></div>`
      //             }
      //           ]
      //         },
      //         { title:'work',
      //          backcolor:'linear-gradient(180deg, #B0CCDC 0%, #fcfcf2 100%)',
      //          size:'half',
      //          navcolor:'white',
      //           panels:[
      //           {
      //               content:`
      //               <div><h1>work</h1> <b><ul>
      //                 <li>Deloitte CBO</li>
      //                 <li>CGI Canada</li>
      //                 <li>Viryl Technologies</li>
      //                 <li>Bonfire Interactive</li>
      //               </b></ul></div>`
      //             },
      //             {img:suit}]},
      //         {title:'projectHeader',
      //          backcolor:'#fcfcf2',
      //          panels:[{content:`<h1>projects</h1>`}]
      //        },            


      //          {title:'rezume',
      //           backcolor: 'transparent',
      //           size: 'half',
      //           panels:[{img:rezume}]
      //         },
      //         {title:'rezume-desc',
      //           size: 'half',
      //           backcolor: '#fcfcf2',
      //           panels:[{align:'center',content:`<div><h1>REZUME</h1>Write your resume using markup <br> See it rendered stylishly <br> Host it online <br> Built using React, Node, and MongoDB</div>`}]
      //         },
      //         {title:'projectFooter',
      //          backcolor:'linear-gradient(180deg, #fcfcf2 0%, #e3dac5 100%)',
      //          navcolor:'white',
      //          panels:[{content:`<h1>...</h1>`}]},
      //         {
      //           title:'closingCard',
      //           backcolor: '#e3dac5',
      //           panels:[
      //             {
      //               // img:keyboard,
      //               content:["<h1>thanks for your time!"]
      //             }
      //           ]
      //         }
      //       ]
      //     });
      // }
      getStructureByKey(key || 'home').then(res => {
        if (!res.data.success) {
          console.log('oh no');
          return;
        }
        setStructure(res.data.data);
      });
    
    } ,[key,setStructure]);

    return (

          <Content contentkey={key} rowdata={structure.rowdata}/>
      );
    }

export default App;

