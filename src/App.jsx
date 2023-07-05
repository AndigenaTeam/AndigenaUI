import React from "react";
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

import Register from "./components/pages/register";
import ForgetPassword from "./components/pages/forgetPassword";
import ForgetPassword2 from "./components/pages/forgetPassword2";
import Announcement from "./components/pages/announcement";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'register',
      forgetemail: ""
    }

    this.navigation = this.navigation.bind(this)
    this.getForgetEmail = this.getForgetEmail.bind(this)
    this.setForgetEmail = this.setForgetEmail.bind(this)
  }

  //           { this.state.page === 'bulletin' ? <Announcement/> : null }
  render() {
    return(
        <>
            <div className="d-flex justify-content-center align-items-center" style={{height: '90vh'}}>
              { this.state.page === 'register' ? <Register navigation={this.navigation}/> : null }
              { this.state.page === 'forgetPassword' ? <ForgetPassword navigation={this.navigation} setForgetEmail={this.setForgetEmail}/> : null }
              { this.state.page === 'forgetPassword2' ? <ForgetPassword2 navigation={this.navigation} getForgetEmail={this.getForgetEmail}/> : null }
            </div>
          { this.state.page === 'bulletin' ? <Announcement/> : null }
        </>
  )
  }

  componentDidMount() {
    let page = window.location.href
    if (page.includes('#/register')) return this.setState({page: 'register'});
    if (page.includes('#/forgetPassword')) return this.setState({page: 'forgetPassword'});
    if (page.includes("announcement/index.html")) return this.setState({page: 'bulletin'})

  }

  navigation(page) {
    // eslint-disable-next-line default-case
    switch (page) {
      case "forgetPassword":
        this.setState({page: 'forgetPassword'})
        break
      case "forgetPassword2":
        this.setState({page: 'forgetPassword2'})
        break
    }
  }

  getForgetEmail() {
    return this.state.forgetemail;
  }

  setForgetEmail(email) {
    return this.setState({forgetemail: email})
  }

}