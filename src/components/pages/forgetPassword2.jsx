import React from "react";
import {toast, ToastContainer} from "react-toastify";
import PasswordValidator from "password-validator";

export default class ForgetPassword2 extends React.Component {
    constructor(props) {
        super(props);

        this.forgetPassword = this.forgetPassword.bind(this)
    }

    render() {
        return (
            <div className={"row col-3"}>
                <form onSubmit={event => this.forgetPassword(event)}>
                    <div className="input-group mb-3">
                        <span className="input-group-text fs-3"><i className="bi bi-shield-lock-fill"></i></span>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="newpassword" placeholder="New password" required={true}/>
                            <label htmlFor="newpassword"><span className="text-danger">*</span>&nbsp;New password</label>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text fs-3"><i className="bi bi-shield-lock-fill"></i></span>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="newpasswordc" placeholder="Confirm new password" required={true}/>
                            <label htmlFor="newpasswordc"><span className="text-danger">*</span>&nbsp;Confirm new password</label>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <button type={'submit'} id="forgetBtn" className={"btn btn-outline-success w-100 fs-5"}><i className={"bi bi-send-fill"}></i>&nbsp;Forget password</button>
                    </div>
                    <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick={true} rtl={false} pauseOnFocusLoss={true} draggable={false} pauseOnHover={true} theme={"colored"}/>
                </form>
            </div>
        );
    }

    forgetPassword(event) {
        event.preventDefault()

        try {
            const pass = document.getElementById('newpassword');
            const passc = document.getElementById('newpasswordc');

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

            if (pass === passc) {
                if (passvalid.length === 0 && passvalid2.length === 0) {
                    fetch(`/Api/forget_by_email`, {
                            method: 'POST',
                            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                email: this.props.getForgetEmail,
                                password: pass.value,
                                state: 'resetpassword'
                            }),
                        },
                    ).then(async res => {
                        let data = await res.json();
                        if (data.retcode === -1) {
                            toast.error(`${data.message}`, {
                                position: toast.POSITION.BOTTOM_RIGHT
                            });
                        } else {
                            toast.success("Password has been reset, you can close this window.", {
                                position: toast.POSITION.BOTTOM_RIGHT
                            });
                        }
                    }).catch(() => {
                        toast.error("Unexpected error occurred!", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    })
                } else {
                    toast.error("Passwords do not match!", {
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