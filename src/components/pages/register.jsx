import React from "react";
import PasswordValidator from 'password-validator';
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
                            <input type="password" className="form-control" minLength="8" maxLength="30" id="password" placeholder="Password" required={true}/>
                            <label htmlFor="password"><span className="text-danger">*</span>&nbsp;Password</label>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text fs-3"><i className="bi bi-shield-lock-fill"></i></span>
                        <div className="form-floating">
                            <input type="password" className="form-control" minLength="8" maxLength="30" id="passwordc" placeholder="Confirm password" required={true}/>
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
            const pass = document.getElementById('password');
            const passc = document.getElementById('passwordc');

            let validator = new PasswordValidator().is().min(8, "Password must be minimum 8 characters!").is().max(30, "Password can not be longer then 420 characters!").has().digits(2, "Password must contain at least 2 numbers!").has().uppercase(1, "Password must contain at least 1 uppercase letter!").has().not().spaces().is().not().oneOf(['Passw0rd', 'Password123'], "Password you provided is insecure!");
            const passvalid = validator.validate(pass.value, {details: true});
            const passvalid2 = validator.validate(passc.value, {details: true});

            if (passvalid.length >= 1) {
                let errors = [];
                passvalid.forEach(e => {
                    errors.push(e.message);
                })
                toast.error(errors.join("\n"), {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }

            if (passvalid2.length >= 1) {
                let errors = [];
                passvalid.forEach(e => {
                    errors.push(e.message);
                })
                return toast.error(errors.join("\n"), {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }

            if (pass.value === passc.value) {
                if (passvalid.length === 0 && passvalid2.length === 0) {
                    // is_crypto=true&not_login=0&email=tujigufmizswuqstjt%40tmmbt.com&password=????&captcha=000000
                    fetch(`/Api/regist_by_email`, {
                            method: 'POST',
                            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                is_crypto: true,
                                not_login: 0,
                                username: user,
                                email: eml,
                                password: pass.value,
                                captcha: 0
                            }),
                        },
                    ).then(async res => {
                        let data = await res.json();
                        if (data.retcode === -1) {
                            toast.error(`${data.message}`, {
                                position: toast.POSITION.BOTTOM_RIGHT
                            });
                        } else {
                            window.location.href = `uniwebview://register?token=${data.data.account_info.weblogin_token}`
                        }
                    }).catch(() => {
                        toast.error("Unexpected error occurred!", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    })
                } else {
                    toast.error("Unexpected error occurred!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            } else {
                toast.error("Passwords do not match!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        } catch (e) {
            toast.error("Unexpected error occurred!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

}