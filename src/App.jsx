import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min'
import '@floating-ui/react'
import 'bootstrap/dist/js/bootstrap.min';
import 'react-toastify/dist/ReactToastify.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import Register from "./components/pages/register";
import ForgetPassword from "./components/pages/forgetPassword";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.particlesConfig = {"particles":{"number":{"value":10,"density":{"enable":true,"value_area":50}},"color":{"value":"#235712"},"shape":{"type":"star","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.4498212552380498,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":4,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":100,"color":"#235712","opacity":0.4,"width":0.6313280775270874},"move":{"enable":true,"speed":2.5,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":800}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"},"onclick":{"enable":true,"mode":"repulse"},"resize":false},"modes":{"grab":{"distance":150,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":100,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true}

    this.state = {
      page: 'register'
    }

    this.navigation = this.navigation.bind(this)
  }

  render() {
    return(
        <>
          <Particles
              id={"particles"}
              init={this.particlesInit}
              options={this.particlesConfig} />
          <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            { this.state.page === 'register' ? <Register navigation={this.navigation}/> : null }
            {this.state.page === 'forgetPassword' ? <ForgetPassword navigation={this.navigation}/> : null }
          </div>
        </>
  )
  }

  componentDidMount() {
    let page = window.location.href
    if (page.includes('#/register')) return this.setState({page: 'register'});
    if (page.includes('#/forgetPassword')) return this.setState({page: 'forgetPassword'});
  }

  navigation(page) {
    // eslint-disable-next-line default-case
    switch (page) {
      case "forgetPassword":
        this.setState({page: 'forgetPassword'})
        break
    }
  }

  async particlesInit(engine) {
    await loadFull(engine);
  }

}