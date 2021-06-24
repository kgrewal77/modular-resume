import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import isMobile from 'react-device-detect';

import keyboard from './img/keyboard.jpg';
import resume from './docs/resume.pdf';
import linkedinIcon from './img/linkedin3.jpg'
import emailIcon from './img/email.png'
import downloadIcon from './img/download.png'
import githubIcon from './img/github.png'


// consts

const aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const email = "kgrewal7777@gmail.com";
const linkedin = "https://www.linkedin.com/in/kabir-grewal-9b8b8a10a";
const github = "https://github.com/kgrewal77";


// Header Components

  const Header = () => {
     return (
        <div className="header sticky">

        </div>
        );
  }

// Content Components

  const Pane = (props) => {

    return (
      <span className={props.size === 2 ? "parallax pane" :"parallax pane__full pane"}
            style={props.img_src && {backgroundImage:`url(${props.img_src})`}}>
        <div className="text-pane">{props.text}</div>
        {props.children}
      </span>

    );
  }


  const ContentRow = (props) => {

    const l = props.panels.length;

    return (
        <div //className="slide" 
        className={`${props.last ? " slide__bottom ":" "} ${props.half ? " slide__half ":" "} slide`}
        >
          {props.panels.map((value,index) => {
                return <Pane size={l}
                             key={index}
                             text={value.content}
                             img_src={value.img}/>

          })}
        </div>

    );
  }

  const Content = (props) => {

    const l = props.rowdata.length;
    return (
      <div id="content">
        {props.rowdata.map((value,index) => {
            return <ContentRow key={index} last={l-index-1 === 0} panels={value.panels} half={value.half}/>
          })
        }
      </div>
    );

  }


  // class Content extends React.Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       current: 0,
  //       total: props.rowdata.length,
  //       top: 0,
  //       originalOffset: 0,
  //       velocity: 0,
  //       timeOfLastDragEvent: 0,
  //       touchStartY: 0,
  //       prevTouchY: 0,
  //       beingTouched: false,
  //       height: 0,
  //       intervalId: null
  //     };
  //   }

  //   render() {
  //     const index = this.state.current;
  //     const value = this.props.rowdata[index];
  //     return (
  //       <div
  //           id="content"
  //           onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
  //           onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
  //           onTouchEnd={() => this.handleTouchEnd()}>
  //             <ContentRow index={index} panels={value.panels}/>
  //       </div>
  //     );
  //   }

  //   // animateSlidingToZero() {
  //   //   let {left, velocity, beingTouched} = this.state;
  //   //   if (!beingTouched && left < -0.01) {
  //   //     velocity += 10 * 0.033;
  //   //     left += velocity;
  //   //     if (left < -350) {
  //   //       window.clearInterval(this.state.intervalId);
  //   //       this.handleRemoveSelf();
  //   //     }
  //   //     this.setState({left, velocity});
  //   //   } else if (!beingTouched) {
  //   //     left = 0;
  //   //     velocity = 0;
  //   //     window.clearInterval(this.state.intervalId);
  //   //     this.setState({left, velocity, intervalId: null, originalOffset: 0});
  //   //   }
  //   // }

  //   handleSwipe(val) {
  //     if (!(this.state.current+val < 0 || this.state.current+val > this.state.total-1)) {
  //       this.setState({current:this.state.current+val});
  //     }
  //     this.handleEnd();
  //   }

  //   handleStart(clientY) {
  //     // if (this.state.intervalId !== null) {
  //     //   window.clearInterval(this.state.intervalId);
  //     // }
  //     this.setState({
  //       originalOffset: this.state.top,
  //       velocity: 0,
  //       timeOfLastDragEvent: Date.now(),
  //       touchStartY: clientY,
  //       beingTouched: true,
  //       intervalId: null
  //     });
  //   }

  //   handleMove(clientY) {
  //     if (this.state.beingTouched) {
  //       const touchY = clientY;
  //       const currTime = Date.now();
  //       const elapsed = currTime - this.state.timeOfLastDragEvent;
  //       const velocity = 20 * (touchY - this.state.prevTouchY) / elapsed;
  //       let deltaY = touchY - this.state.touchStartY + this.state.originalOffset;
  //       if (deltaY < -200) {
  //         this.handleSwipe(1);
  //       } else if (deltaY > 200) {
  //         this.handleSwipe(-1);
  //       }
  //       this.setState({
  //         left: deltaY,
  //         velocity,
  //         timeOfLastDragEvent: currTime,
  //         prevtouchY: touchY
  //       });
  //     }
  //   }

  //   handleEnd() {
  //     this.setState({
  //       velocity: this.state.velocity,
  //       touchStartY: 0,
  //       beingTouched: false,
  //       intervalId: null//window.setInterval(this.animateSlidingToZero.bind(this), 33)
  //     });
  //   }

  //   handleTouchStart(touchStartEvent) {
  //     //touchStartEvent.preventDefault();
  //     this.handleStart(touchStartEvent.targetTouches[0].clientY);
  //   }

  //   handleTouchMove(touchMoveEvent) {
  //     this.handleMove(touchMoveEvent.targetTouches[0].clientY);
  //   }

  //   handleTouchEnd() {
  //     this.handleEnd();
  //   }
  // }

// Footer Components
  const LinkImage = (props) => {

    return (
      <a href={props.link}
          target="_blank"
          rel="noreferrer" >
        <img src={props.image_src}
             alt={props.image_alt}
             className={props.classes}>
        </img>
      </a>
    );
  }

  const IconFooter = (props) => {

    //const [expanded, setExpanded] = useState(props.expanded);

    // const handleClickOutside = event => {
    //     const domNode = ReactDOM.findDOMNode(this);

    //     if ((!domNode || !domNode.contains(event.target)) && expanded) {
    //         setExpanded(!expanded)
    //     }
    // }

    // useEffect(()=>{
    //   document.addEventListener('click', handleClickOutside, true);
    //   document.addEventListener('touchstart', handleClickOutside, true);
    //   return () => {
    //     document.removeEventListener('click', handleClickOutside, true);
    //     document.removeEventListener('touchstart', handleClickOutside, true);
    //   };
    // },[handleClickOutside])


    return (
        <div className="icon-footer">
              <LinkImage image_src={downloadIcon}
                         image_alt="download logo"
                         link={resume}
                         classes="fourth-first fourth"/>
              <LinkImage image_src={emailIcon}
                         image_alt="gmail logo"
                         link={`mailto:${email}`}
                         classes="fourth"/>
              <LinkImage image_src={githubIcon}
                         image_alt="github logo"
                         link={github}
                         classes="fourth"/>
              <LinkImage image_src={linkedinIcon}
                         image_alt="linkedin logo"
                         link={linkedin}
                         classes="fourth"/>
          </div>


    );
  }


// App Code
  const App = (props) => {

    //const [key, setKey] = useState(window.location.pathname.substring(1));

    const structure = {
        rowdata: [
          {
            title:'aboutMe',
            panels:[
              {
                content:aboutMe
              },
              {
                img:keyboard,
              }
            ]
          },
          {
            title:'mySkills',
            panels:[
              {
                content:aboutMe
              }
            ]
          },
          {
            title:'workExperience',
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
          },{
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
          },{
            title:'closingCard',
            panels:[
              {
                img:keyboard
              }
            ]
          }
        ]
      };

      //console.log("is mobile? " + isMobile);

      return (
        isMobile || true
        ? <div>
            <Header/>
            <Content rowdata={structure.rowdata}/>
            <IconFooter/>
          </div>
        : <div>Desktop Version not yet launched. Please access on mobile or use mobile emulator in browser.</div>
        );
    }

  // ========================================

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
