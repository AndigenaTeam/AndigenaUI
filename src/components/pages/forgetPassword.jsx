import React from "react";
import {toast, ToastContainer} from "react-toastify";
import $ from "jquery";

export default class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.forgetPassword = this.forgetPassword.bind(this)
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

            $.ajax({
                url: `/Api/forget_by_email`,
                method: 'POST',
                dataType: 'json',
                crossOrigin: false,
                data: {
                    email: eml,
                }
            }).done(function () {
                window.location.href = `uniwebview://close`
                toast.success("Please check your email to reset your password.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }).fail(function () {
                toast.error("Unexpected error occurred!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
        } catch (e) {
            toast.error("Unexpected error occurred!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

}