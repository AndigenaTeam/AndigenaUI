import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min'
import '@floating-ui/react'
import 'bootstrap/dist/js/bootstrap.min';
import 'react-toastify/dist/ReactToastify.css';

import Register from "./components/pages/register";
import ForgetPassword from "./components/pages/forgetPassword";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'register'
    }

    this.navigation = this.navigation.bind(this)
  }

  render() {
    return(
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
          { this.state.page === 'register' ? <Register navigation={this.navigation}/> : null }
          {this.state.page === 'forgetPassword' ? <ForgetPassword navigation={this.navigation}/> : null }
        </div>
    )
  }

  componentDidMount() {
    let page = window.location.href
    if (page.includes('#/registe')) return this.setState({page: 'register'});
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

}