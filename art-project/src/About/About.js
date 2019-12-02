import React, { Component } from "react";
import "./About.css";
import Topview from "../Topview/Topview";
import ImageFadeIn from 'react-image-fade-in';
import FadeIn from 'react-fade-in';

class About extends Component {

  constructor(props) {
        super(props);

        this.state = {
            status: "LOADING"
        };
    }

  handleAdd = (event) => {
    console.log("Add to chart");
  }

  componentWillUnmount() {
    // remove observer
  }

  componentDidMount() {
    // add observer
    this.setState({status: "LOADED" });
  }

  update() {
    // set states
  };


  render() {


    return (
      <div className="Detail">
      <Topview/>
      <div className="row justify-content-center">

          <div className="col-sm-4">
          <ImageFadeIn width={240} height={320} src={"https://static.wixstatic.com/media/a0ca6a_b9b6dcc48ff946e898dfa0f3a8590fb4~mv2.jpg/v1/fill/w_253,h_335,al_c,q_90/Me.webp"} opacityTransition={1.5} />
          </div>
          <div className="col-sm-4">
            <FadeIn>
              <p>
              This is me! During the days you'll find me at the film production company <a href="http://diggin.se/">Diggin Larry</a> where I work as a motion designer. I live in Stockholm with my love Love, our daughter and our two cats. See more of what I do on my <a href="https://www.instagram.com/mariafallstrom/">instagram account</a> and on my <a href="https://www.mariafallstrom.com/">portfolio</a>. </p>
              <p>
                +46763067770
                </p>
                <p>
                maria.h.fallstrom@gmail.com
              </p>
              </FadeIn>
          </div>
      </div>
      </div>

    );
  }
}

export default About;
