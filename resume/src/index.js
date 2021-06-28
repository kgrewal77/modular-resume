import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import isMobile from 'react-device-detect';
import { InView } from 'react-intersection-observer';
import keyboard from './img/keyboard.jpg';
import resume from './docs/resume.pdf';


// consts

const aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
        {props.text && <div className="text-pane">{props.text}</div>}
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
    //console.log(document.querySelector('div.navbar'));
    return (
      <InView as="div" 
              // threshold={[.07,.93]}
              threshold={.035}
              rootMargin={"-93% 0px 0px 0px"}
              onChange={
                (inView, entry) => {
                  console.log(entry);
                  //if (entry.intersectionRect.bottom === (window.innerHeight)) {
                    //console.log(entry);
                  if (entry.intersectionRatio > .035) {
                    props.changeHeaderColor(props.backcolor||'white');
                  }
                  //}
                }}>
          <div //className="slide" 
          className={`${props.last ? " slide__bottom ":" "} ${props.half ? " slide__half ":" "} slide`}
          style={{background:`${props.backcolor||'white'}`}}

          >
            {props.panels.map((value,index) => {
                  return <Pane size={l}
                               key={index}
                               text={value.content}
                               img_src={value.img}
                               boxes={value.boxes}/>

            })}
          </div>
      </InView>

    );
  };

  const Content = (props) => {

    const l = props.rowdata.length;
    const [color,setColor] = useState('white');
    return (
      <div id="content">
        {props.contentkey && <NavBar backcolor={color}/>}
        {props.rowdata.map((value,index) => {
            return <ContentRow 
              key={index} 
              last={l-index-1 === 0} 
              backcolor={value.backcolor} 
              panels={value.panels} 
              half={value.half}
              changeHeaderColor={setColor}/>
          })
        }
      </div>
    );

  }


// App Code
  const App = (props) => {

    const [key, setKey] = useState(window.location.pathname.substring(1));
    console.log(key);
    let structure;

    if (!key) {
      structure = {
        rowdata: [
          {
            title:'aboutMe',
            backcolor: 'transparent',
            panels:[
              {
                img:keyboard,
                boxes:[{text:"RE-ZU.ME",
                        textStyle:{"font-size": "8vh",
                                   "font-family":"azonix, sans-serif"}},
                       {text:"the simple networking solution"},
                       {text:"see mine",href:"/kabir"},
                       {text:"make yours",href:"/edit"}]
              }
            ]
          }
        ]
      };

    } else {
      structure = {
          rowdata: [
            {
              title:'aboutMe',
              backcolor: 'transparent',
              panels:[
                {
                  img:keyboard,
                  boxes:[{text:"Kabir Grewal",
                        textStyle:{"font-size": "10vh",
                                   "font-family":"azonix, sans-serif"}},
                       {text:"software engineer"}]
                       // {text:"see mine",href:"/kabir"},
                       // {text:"make yours",href:"/edit"}]
                }
              ]
            },
            {
              title:'mySkills',
              backcolor: 'white',
              panels:[
                {
                  content:aboutMe
                }
              ]
            },
            {
              title:'workExperience',
              backcolor: 'peachpuff',
              panels:[
                {
                  content:aboutMe
                },
                {
                  content:aboutMe
                }
              ]
            },
            {
              title:'closingCard',
              backcolor: 'transparent',
              panels:[
                {
                  img:keyboard
                }
              ]
            },
            {
              title:'workExperience',
              half:true,
              panels:[
                {
                  content:aboutMe
                },
                {
                  content:aboutMe
                }
              ]
            },/*{
              title:'workExperience',
              half:true,
              panels:[
                {
                  content:aboutMe
                },
                {
                  content:aboutMe
                }
              ]
            },*/{
              title:'closingCard',
              backcolor: 'transparent',
              panels:[
                {
                  img:keyboard
                }
              ]
            }
          ]
        };
    }

      //console.log("is mobile? " + isMobile);

      return (
        isMobile || true
        ? 
            <Content contentkey={key} rowdata={structure.rowdata}/>
        : <div>Desktop Version not yet launched. Please access on mobile or use mobile emulator in browser.</div>
        );
    }

  // ========================================

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
