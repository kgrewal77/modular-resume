import React from 'react';
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

  class Header extends React.Component {


    render(){
       return (
        <div>
          <div className="topnav">
          </div>
          <div className="header sticky">

          </div>
        </div>
          );  
     }
  }

// Content Components

class ImgPane extends React.Component {
  render() {
    const img_src = this.props.img_src;
    //console.log(img_src);
    return (
      <span className={this.props.size === 2 ? "img-pane" :"img-pane img-pane__full"}
            style={{backgroundImage:`url(${img_src})`}}>
        {this.props.children}

      </span>

    );
  }
}

class TextPane extends React.Component {


  render() {

    return (
      <span className={this.props.size === 2 ? "text-pane" :"text-pane text-pane__full"}>
        {this.props.text}
        {this.props.children}
      </span>

    );
  }
}


class ContentRow extends React.Component {

  render() {
    const panels = this.props.panels; 
    const l = this.props.panels.length;
    return (
        <div className={`slide ${this.props.index === 0 ? "top-slide":" "}`}>
          {panels.map((value,index) => {
            switch(value.type) {
              case 'image':
                return <ImgPane size={l} img_src={value.content}/>
              default:
                return <TextPane size={l} text={value.content}/>
            }
          })}
        </div>
        
    );
  }
}


class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      total: props.rowdata.length,
      top: 0,
      originalOffset: 0,
      velocity: 0,
      timeOfLastDragEvent: 0,
      touchStartY: 0,
      prevTouchY: 0,
      beingTouched: false,
      height: 0,
      intervalId: null
    };
  }

  render() {
    const index = this.state.current;
    const value = this.props.rowdata[index];
    return (
      <div 
          id="content"
          onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
          onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
          onTouchEnd={() => this.handleTouchEnd()}>
            <ContentRow index={index} panels={value.panels}/>
      </div>
    );
  }

  // animateSlidingToZero() {
  //   let {left, velocity, beingTouched} = this.state;
  //   if (!beingTouched && left < -0.01) {
  //     velocity += 10 * 0.033;
  //     left += velocity;
  //     if (left < -350) {
  //       window.clearInterval(this.state.intervalId);
  //       this.handleRemoveSelf();
  //     }
  //     this.setState({left, velocity});
  //   } else if (!beingTouched) {
  //     left = 0;
  //     velocity = 0;
  //     window.clearInterval(this.state.intervalId);
  //     this.setState({left, velocity, intervalId: null, originalOffset: 0});
  //   }
  // }

  handleSwipe(val) {
    if (!(this.state.current+val < 0 || this.state.current+val > this.state.total-1)) {
      this.setState({current:this.state.current+val});
    }
    this.handleEnd();
  }

  handleStart(clientY) {
    // if (this.state.intervalId !== null) {
    //   window.clearInterval(this.state.intervalId);
    // }
    this.setState({
      originalOffset: this.state.top,
      velocity: 0,
      timeOfLastDragEvent: Date.now(),
      touchStartY: clientY,
      beingTouched: true,
      intervalId: null
    });
  }
  
  handleMove(clientY) {
    if (this.state.beingTouched) {
      const touchY = clientY;
      const currTime = Date.now();
      const elapsed = currTime - this.state.timeOfLastDragEvent;
      const velocity = 20 * (touchY - this.state.prevTouchY) / elapsed;
      let deltaY = touchY - this.state.touchStartY + this.state.originalOffset;
      if (deltaY < -200) {
        this.handleSwipe(-1);
      } else if (deltaY > 200) {
        this.handleSwipe(1);
      }
      this.setState({
        left: deltaY,
        velocity,
        timeOfLastDragEvent: currTime,
        prevtouchY: touchY
      });
    }
  }
  
  handleEnd() {
    this.setState({
      velocity: this.state.velocity,
      touchStartY: 0,
      beingTouched: false,
      intervalId: null//window.setInterval(this.animateSlidingToZero.bind(this), 33)
    });
  }

  handleTouchStart(touchStartEvent) {
    //touchStartEvent.preventDefault();
    this.handleStart(touchStartEvent.targetTouches[0].clientY);
  }
  
  handleTouchMove(touchMoveEvent) {
    this.handleMove(touchMoveEvent.targetTouches[0].clientY);
  }
  
  handleTouchEnd() {
    this.handleEnd();
  }
}

// Footer Code
  class LinkImage extends React.Component {

    render() {

      return (
        <a href={this.props.link}
            target="_blank"
            rel="noreferrer" > 
          <img src={this.props.image_src}
               alt={this.props.image_alt}
               className={this.props.classes}>
          </img>
        </a>
      );
    }
  }

  class IconFooter extends React.Component {

    constructor(props) {

      super(props);
      this.state = {
        expanded: false
      }
    }

    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside, true);
      document.addEventListener('touchstart', this.handleClickOutside, true);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside, true);
      document.removeEventListener('touchstart', this.handleClickOutside, true);
    }

    handleClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this);

        if ((!domNode || !domNode.contains(event.target)) && this.state.expanded) {
            this.setState({
                expanded: false
            });
        }
    }

    render() {
      return (
        <div>
        {this.state.expanded
          ? <div className="icon-footer">  
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
          : <div className="icon-footer">
                 <i className="expand-icon fa fa-arrow-circle-left  "
                    onClick={()=>{this.setState({expanded:true});}}
                    >
                 </i>
            </div>}
        </div>

      );
    }
  }

// App Code
  class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = { 
        width: 0, 
        height: 0, 
        key: window.location.pathname.substring(1),
        structure: {
          rowdata: [
            {
              title:'aboutMe',
              panels:[
                {
                  type:'text',
                  content:aboutMe
                },
                { 
                  type:'image',
                  content:keyboard,
                  alt: 'muted neutrals keyboard'
                }
              ]
            },
            {
              title:'mySkills',
              panels:[
                {
                  type:'text',
                  content:aboutMe
                }
              ]
            },
            {
              title:'workExperience',
              panels:[
                {
                  type:'text',
                  content:aboutMe
                },
                {
                  type:'text',
                  content:aboutMe
                }
              ]
            },
            {
              title:'closingCard',
              panels:[
                { 
                  type:'image',
                  content:keyboard,
                  alt: 'muted neutrals keyboard'
                }
              ]
            }
          ]
        }
      };
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
       window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    render() {
      const rowdata = this.state.structure.rowdata;
      return (
        isMobile || this.state.width < 600
        ? <div>
            <Header/>
            <Content rowdata={rowdata}/> 
            <IconFooter/>
          </div>
        : <div>Desktop Version not yet launched. Please access on mobile or use mobile emulator in browser.</div>
        );
    }
  }

  // ========================================

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
