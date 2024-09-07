import Header from "./common/Header";
import Footer from "./common/Footer";
import React, {useEffect} from "react";
import {Helmet} from "react-helmet";

export function Contact() {
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "assets/css/contact_us.css";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = "/assets/js/contact-us.js";
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(link);
            // document.head.removeChild(script);
        };
    }, []);
    return(
        <div>
            <title>Liên hệ</title>
            <Helmet></Helmet>
            <Header></Header>
            <div className="container">
                <h4>Liên hệ với chúng tôi</h4>
                <h3>Hãy để lại lời nhắn và câu hỏi</h3>
                <p>Những ý kiến đóng góp và câu hỏi của bạn là động lực để chúng tôi phát triển và hoàn thiện hơn</p>

                <form name="contact-us-form" action="#" onSubmit="return validateForm()">
                    <div className="row100" id="fname-row100">
                        <div className="col">
                            <div className="inputBox" id="fname-inputBox">
                                <input type="text" name="fname"/>
                                <span className="text">First Name</span>
                                <span className="line" id="fname-line"></span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="inputBox" id="lname-inputBox">
                                <input type="text" name="lname"/>
                                <span className="text">Last Name</span>
                                <span className="line" id="lname-line"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row100" id="email-row100">
                        <div className="col">
                            <div className="inputBox" id="email-inputBox">
                                <input type="email" name="email" pattern="[^ @]*@[^ @]*"
                                />
                                <span className="text">Email ID</span>
                                <span className="line" id="email-line"></span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="inputBox" id="tel-inputBox">
                                <input type="tel" name="m-num"/>
                                <span className="text">Mobile Number</span>
                                <span className="line" id="tel-line"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row100">
                        <div className="col">
                            <div className="inputBox textarea">
                                <textarea name="tel"></textarea>
                                <span className="text">Type your message Here...</span>
                                <span className="line"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row100">
                        <div className="col">
                            <div className="submitbutton">
                                <button className="btn submitbtn" type="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;