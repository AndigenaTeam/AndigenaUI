import React from "react";
import {toast, ToastContainer} from "react-toastify";
import $ from "jquery";

export default class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.forgetPassword = this.forgetPassword.bind(this)
        this.requestCode = this.requestCode.bind(this)
    }

    render() {
        return (
            <div className={"row col-3"}>
                <form onSubmit={event => this.forgetPassword(event)}>

                    <div className="input-group mb-3">
                        <span className="input-group-text fs-3"><i className="bi bi-envelope-at-fill"></i></span>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="emailf" placeholder="Email" required={true}/>
                            <label htmlFor="emailf"><span className="text-danger">*</span>&nbsp;Email</label>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text fs-3"><i className="bi bi-shield-lock-fill"></i></span>
                        <div className="form-floating">
                            <input type="number" min={0} className="form-control" id="emailcode" placeholder="Verification code" required={true}/>
                            <label htmlFor="emailcode"><span className="text-danger">*</span>&nbsp;Verification code</label>
                        </div>
                        <button type={'button'} onClick={event => this.requestCode(event)} id="forgetBtnCode" className={"btn btn-outline-success fs-5 d-inline"}><i className={"bi bi-send-fill"}></i></button>
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
            const eml = document.getElementById('emailf').value;
            const ec = document.getElementById('emailcode').value;

            fetch(`/Api/forget_by_email`, {
                    method: 'POST',
                    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: eml,
                        code: ec,
                        state: "verifycoderesp"
                    }),
                },
            ).then(async res => {
                let data = await res.json()
                console.log(data)
                if (data.code === -1) {
                    toast.error(`${data.message}`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                } else {
                    this.props.setForgetEmail(eml)
                    this.props.navigation('forgetPassword2');
                    toast.success("Please check your email to reset your password.", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            }).catch(e => {
                toast.error(`${e}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
        } catch (e) {
            console.log(e)
            toast.error("Unexpected error occurred!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    requestCode(event) {
        event.preventDefault()

        try {
            const eml = document.getElementById('emailf').value;

            if (eml) {
                $.ajax({
                    url: `/Api/forget_by_email`,
                    method: 'POST',
                    dataType: 'json',
                    crossOrigin: false,
                    data: {
                        email: eml,
                        state: "verifycodereq"
                    }
                }).done(function (resp) {
                    if (resp.code === -1) {
                        toast.error(`${resp.message}`, {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    } else {
                        toast.success("Please check your email to reset your password.", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    }
                }).fail(function () {
                    toast.error("Unexpected error occurred!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                })
            } else {
                toast.error("Email field is required!", {
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