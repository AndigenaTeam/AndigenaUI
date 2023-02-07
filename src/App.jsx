import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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
        <div>
          { this.state.page === 'register' ? <Register navigation={this.navigation}/> : null }
          {this.state.page === 'forgor_password' ? <ForgetPassword navigation={this.navigation}/> : null }
        </div>
    )
  }

  navigation(page) {
    // eslint-disable-next-line default-case
    switch (page) {
      case "forgor_password":
        this.setState({page: 'forgor_password'})
        break
    }
  }

}