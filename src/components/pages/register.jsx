import React from "react";
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.registerAccount = this.registerAccount.bind(this)
    }

    render() {
        return (
            <div className={"row col-3"}>
                <form onSubmit={event => this.registerAccount(event)}>
                    <div className="input-group mb-3">
                        <span className="input-group-text fs-3"><i className="bi bi-person-badge-fill"></i></span>
                        <div className="form-floating">
                            <input type="text" className="form-control" minLength="3" maxLength="30" id="username" placeholder="xudong_zhong" required={true}/>
                            <label htmlFor="username"><span className="text-danger">*</span>&nbsp;Username</label>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text fs-3"><i className="bi bi-envelope-at-fill"></i></span>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="emailr" placeholder="Email" required={true}/>
                            <label htmlFor="emailr"><span className="text-danger">*</span>&nbsp;Email</label>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text fs-3"><i className="bi bi-shield-lock-fill"></i></span>
                        <div className="form-floating">
                            <input type="password" className="form-control" minLength="8" maxLength="69" id="password" placeholder="Password" required={true}/>
                            <label htmlFor="password"><span className="text-danger">*</span>&nbsp;Password</label>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text fs-3"><i className="bi bi-shield-lock-fill"></i></span>
                        <div className="form-floating">
                            <input type="password" className="form-control" minLength="8" maxLength="69" id="passwordc" placeholder="Confirm password" required={true}/>
                            <label htmlFor="passwordc"><span className="text-danger">*</span>&nbsp;Confirm Password</label>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <button type={'submit'} id="registerBtn" className={"btn btn-outline-success w-100 fs-5"}><i className={"bi bi-person-fill-add"}></i>&nbsp;Create account</button>
                    </div>
                    <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick={true} rtl={false} pauseOnFocusLoss={true} draggable={false} pauseOnHover={true} theme={"colored"}/>
                </form>
            </div>
    );
    }

    registerAccount(event) {
        event.preventDefault()

        try {
            const user = document.getElementById('username').value;
            const eml = document.getElementById('emailr').value;
            const pass = document.getElementById('password').value;
            const passc = document.getElementById('passwordc').value;

            if (pass === passc && pass.length >= 8 && passc.length >= 8) {
                // is_crypto=true&not_login=0&email=tujigufmizswuqstjt%40tmmbt.com&password=????&captcha=000000

                $.ajax({
                    url: `/Api/regist_by_email`,
                    method: 'POST',
                    dataType: 'json',
                    crossOrigin: false,
                    data: {
                        is_crypto: true,
                        not_login: 0,
                        username: user,
                        email: eml,
                        password: pass,
                        captcha: 0
                    }
                }).done(function () {
                    window.location.href = `uniwebview://close`
                    toast.success("Successfully registred, you can now close this window.", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }).fail(function () {
                    toast.error("Unexpected error occurred!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                })
            } else {
                if (pass !== passc) {
                    toast.error("Passwords do not match!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            }
        } catch (e) {
            toast.error("Unexpected error occurred!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

}