import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Navbar from 'react-bootstrap/Navbar'

import keyboard from './img/keyboard.jpg';
import resume from './docs/resume.pdf';
import linkedinIcon from './img/linkedin.png'
import emailIcon from './img/email.png'
import downloadIcon from './img/download.png'
import githubIcon from './img/github.png'



const aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const email = "kgrewal7777@gmail.com";
const linkedin = "https://www.linkedin.com/in/kabir-grewal-9b8b8a10a";
const github = "https://github.com/kgrewal77";

// class TitleLabel extends React.Component {

//   render() {

//     return (
//       <div className={"title-label "+this.props.classes}>
//         {this.props.text}
//       </div>
//     );
//   }
// }

function toggleLeftNav() {

    let ln = document.getElementsByClassName("leftnav")[0];
    //console.log(document.getElementById("content"));
    if (ln.style.width === "25vw") {
      ln.style.width = "0";
      //document.getElementById("content").style.marginLeft = "0px";
    } else {
      ln.style.width = "25vw";
      //document.getElementById("content").style.marginLeft = "25vw";
    }
  }


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

class ImgPane extends React.Component {

  render() {

    return (
      <span className="img-pane"
            style={{backgroundImage:`url(${this.props.image_src})`}}>
        {this.props.children}

      </span>

    );
  }
}

class TextPane extends React.Component {


  render() {

    return (
      <span className="text-pane">
        {this.props.text}
        {this.props.children}
      </span>

    );
  }
}

class Header extends React.Component {

  

  render(){
     return (
      <div>
        <div className="leftnav"><a href="#aboutMe">About Me</a></div>
        <div className="header sticky">

            <i className="navicon fa fa-bars" onClick={toggleLeftNav}></i>

        </div>
      </div>
        );  
   }
}

class AboutMe extends React.Component {
  render() {
    return (
        <div id={this.props.id} className="slide top-slide">
          <TextPane text={aboutMe}/>
          <ImgPane image_src={keyboard} 
                   image_alt="muted neutrals keyboard">
            <span className="center-of-pane">            
              <LinkImage image_src={downloadIcon}
                         image_alt="download logo"
                         link={resume}
                         classes="fourth"/>
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
            </span>
          </ImgPane>
        </div>
        
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div id="content">
          <AboutMe id="aboutMe"/>
          <AboutMe/>
        </div>
      </div>);
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
