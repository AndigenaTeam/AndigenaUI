import React from "react";
import {toast, ToastContainer} from "react-toastify";
import $ from "jquery";

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
            const pass = document.getElementById('newpassword').value;
            const passc = document.getElementById('newpasswordc').value;

            if (pass === passc && pass.length >= 8 && passc.length >= 8) {

            $.ajax({
                url: `/Api/forget_by_email`,
                method: 'POST',
                dataType: 'json',
                crossOrigin: false,
                data: {
                    email: this.props.getForgetEmail,
                    password: pass,
                    state: 'resetpassword'
                }
            }).done(function () {
                window.location.href = `uniwebview://close`
                toast.success("Password has been reset, you can close this window.", {
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