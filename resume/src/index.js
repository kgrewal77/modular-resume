import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Navbar from 'react-bootstrap/Navbar'

import keyboard from './img/keyboard.jpg';
import resume from './docs/resume.pdf';
import linkedinIcon from './img/linkedin3.jpg'
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

class HeaderLink extends React.Component {

  /*clickNavLink = () => {

    console.log(document.getElementById(this.props.target))
    if (document.getElementById(this.props.target)) {
      console.log("scroll to id");
      document.getElementById(this.props.target).scrollIntoView();

        window.scrollBy(0,-window.innerHeight*.10);
    }
      this.props.parentCallback();
  }*/

  render () {

    return (
          <tr><td><div /*onClick={this.clickNavLink}*/>{this.props.text}</div></td></tr>
      );
  }
}

class Header extends React.Component {

  /*toggleNavBar = () => {

    let ln = document.getElementsByClassName("topnav")[0];
    //console.log(document.getElementById("content"));
    if (ln.style.width === "100vw") {
      ln.style.width = "0";
      document.getElementsByClassName("header")[0].style.backgroundColor = "darkseagreen";
    } else {
      ln.style.width = "100vw";
      document.getElementsByClassName("header")[0].style.backgroundColor = "peachpuff";
    }
  }*/


  render(){
     return (
      <div>
        <div className="topnav">
{/*        <table className="link-table">
          <HeaderLink
            //onClick={this.clickNavLink}
            text="About Me"
            //parentCallback={this.toggleNavBar}
            target="aboutMe"
          ></HeaderLink>
          <HeaderLink
            //onClick={this.clickNavLink}
            text="My Skills"
            //parentCallback={this.toggleNavBar}
            target="mySkills"
          ></HeaderLink>
          <HeaderLink
            //onClick={this.clickNavLink}
            text="Work Experience"
            //parentCallback={this.toggleNavBar}
            target="workExperience"
          ></HeaderLink>        </table>*/}
        </div>
        <div className="header sticky">

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
            
          </ImgPane>
        </div>
        
    );
  }
}

class MySkills extends React.Component {
  render() {
    return (
        <div id={this.props.id} className="slide">
          <TextPane text={aboutMe}/>
          <TextPane text={aboutMe}/>
        </div>
        
    );
  }
}

class WorkExperience extends React.Component {
  render() {
    return (
        <div id={this.props.id} className="slide">
          <TextPane text={aboutMe}/>
          <TextPane text={aboutMe}/>
        </div>
        
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

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div id="content">
         <AboutMe id="aboutMe"/>
         <MySkills id="mySkills"/>
         <WorkExperience id="workExperience"/>
        </div>
        <IconFooter/>
      </div>);
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
