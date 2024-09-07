import React, {useEffect, useState} from "react";
import Header from "./common/Header";
import {loadScript} from "./utils";
import {useNavigate} from "react-router-dom";


export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false    );
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {

        const links = [
            // { rel: "stylesheet", type: "text/css", href: "assets/css/as-alert-message.min.css" },
            { rel: "stylesheet", type: "text/css", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" },
            { rel: "stylesheet", type: "text/css", href: "assets/css/style-starter.css" },
            // { rel: "stylesheet", type: "text/css", href: "assets/css/sign-inn.css" },
            // { rel: "script", type: "text/javascript", href: "assets/js/as-alert-message.min.js" }, // Thêm dòng này
        ];
        links.forEach((link) => {
            const element = document.createElement(link.rel === "script" ? "script" : "link");
            if (link.rel === "script") {
                element.src = link.href;
            } else {
                element.rel = link.rel;
                element.type = link.type;
                element.href = link.href;
            }
            document.head.appendChild(element);
        });
        const loadAssets = async () => {
            await loadScript('../assets/js/as-alert-message.min.js');
            const signUpButton = document.getElementById('signUp');
            const signInButton = document.getElementById('signIn');
            const container = document.getElementById('container_signup_signin');
            signUpButton.addEventListener('click', () => {
                container.classList.add("right-panel-active");
            });
            signInButton.addEventListener('click', () => {
                container.classList.remove("right-panel-active");
            });
        };
        loadAssets();


    }, []);

    function showErrorMessage(title, message) {
        alert(`${title}: ${message}`);
    }
    const handleSignIn = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:80/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,  // Assuming email is used as the username
                    password: password,
                }),
            });

            const data = await response.json();
            console.log(data.data);
            if (response.status === 200) {
                const token = data.data;
                //đưa token vào sessionStorage
                sessionStorage.setItem('token', token);

                // Call the function to get user info
                const userInfo = await fetchUserInfo(token);

                if (userInfo) {
                    // Save user info to sessionStorage or set it in state
                    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                    setSuccessMessage('Đăng nhập thành công!');
                    console.log(userInfo);
                    window.location.href = '/user';  // Redirect to user page
                } else {
                    setErrorMessage('Đăng nhập thất bại!');
                }
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            setErrorMessage('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };
//lấy thông tin người dùng để lưu vào sessionStorage
    const fetchUserInfo = async (token) => {
        try {
            const response = await fetch('http://localhost:80/user/info', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    console.log("rp:" , response);
            if (response.status === 200) {
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to fetch user info:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            return null;
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        navigate('/signin');
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        if (!regName) {
            setErrorMessage('Tên không thể trống');
            setLoading(false);
            return;
        }

        if (!regEmail) {
            setErrorMessage('Email không thể trống');
            setLoading(false);
            return;
        }

        if (!regPassword) {
            setErrorMessage('Mật khẩu không thể trống');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:80/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: regName, userEmail: regEmail, password: regPassword }),
            });

            const data = await response.json();

            if (data.status === 'OK') {
                setSuccessMessage('Đăng ký thành công!');
                window.location.href = '/signin';
            } else {
                setErrorMessage(data.msg);
            }
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error);
            setErrorMessage('Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };


    const css = `
/* CSS cho các thiết bị di động */
@media only screen and (max-width: 400px) {
    .form-container {
        width: 90%;
        padding: 10px;
        box-sizing: border-box;
    }

    .social-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-bottom: 10px;
    }

    .social-container .social {
        font-size: 16px;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"],
    button {
        width: 90%;
        margin-bottom: 8px;
    }

    a {
        text-align: center;
        margin-bottom: 8px;
    }
}
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
\tbox-sizing: border-box;
}

body {
\tbackground: var(--theme-bg);
\t/* #f6f5f7; */
\tdisplay: flex;
\tjustify-content: center;
\talign-items: center;
\tflex-direction: column;
\tfont-family: 'Montserrat', sans-serif;
\theight: 100vh;
\tmargin: -20px 0 50px;
}

h1 {
\tfont-weight: bold;
\tmargin: 0;
}

h2 {
\ttext-align: center;
}

p {
\tfont-size: 14px;
\tfont-weight: 100;
\tline-height: 20px;
\tletter-spacing: 0.5px;
\tmargin: 20px 0 30px;
}

span {
\tfont-size: 12px;
}

a {
\tcolor: #333;
\tfont-size: 14px;
\ttext-decoration: none;
\tmargin: 15px 0;
}

button {
\tborder-radius: 20px;
\tborder: 1px solid #FF4B2B;
\tbackground-color: #FF4B2B;
\tcolor: #FFFFFF;
\tfont-size: 12px;
\tfont-weight: bold;
\tpadding: 12px 45px;
\tletter-spacing: 1px;
\ttext-transform: uppercase;
\ttransition: transform 80ms ease-in;
}

button:active {
\ttransform: scale(0.95);
}

button:focus {
\toutline: none;
}

button.ghost {
\tbackground-color: transparent;
\tborder-color: #FFFFFF;
}

form {
\tbackground-color: var(--theme-bg);
\t/* #FFFFFF; */
\tdisplay: flex;
\talign-items: center;
\tjustify-content: center;
\tflex-direction: column;
\tpadding: 0 50px;
\theight: 100%;
\ttext-align: center;
}

input {
\tbackground-color: var(--theme-bg);
\tcolor: var(--theme-text);
\t/* #eee; */
\tborder: none;
\tpadding: 12px 15px;
\tmargin: 8px 0;
\twidth: 100%;
}

.container_signup_signin {
\tbackground: var(--theme-bg);
\tcolor: var(--theme-text);
\tborder-radius: 10px;
\tbox-shadow: 0 14px 28px var(--theme-border),
\t\t0 10px 10px var(--theme-border);
\tposition: relative;
\toverflow: hidden;
\twidth: 768px;
\tmax-width: 100%;
\tmin-height: 480px;
\tmargin-top: 45px;
}

.form-container {
\tposition: absolute;
\ttop: 0;
\theight: 100%;
\ttransition: all 0.6s ease-in-out;
}

.sign-in-container {
\tleft: 0;
\twidth: 50%;
\tz-index: 2;
}

.container.right-panel-active .sign-in-container {
\ttransform: translateX(100%);
}

.sign-up-container {
\tleft: 0;
\twidth: 50%;
\topacity: 0;
\tz-index: 1;
}

.container_signup_signin.right-panel-active .sign-up-container {
\ttransform: translateX(100%);
\topacity: 1;
\tz-index: 5;
\tanimation: show 0.6s;
}

@keyframes show {

\t0%,
\t49.99% {
\t\topacity: 0;
\t\tz-index: 1;
\t}

\t50%,
\t100% {
\t\topacity: 1;
\t\tz-index: 5;
\t}
}

.overlay-container {
\tposition: absolute;
\ttop: 0;
\tleft: 50%;
\twidth: 50%;
\theight: 100%;
\toverflow: hidden;
\ttransition: transform 0.6s ease-in-out;
\tz-index: 100;
}

.container_signup_signin.right-panel-active .overlay-container {
\ttransform: translateX(-100%);
}

.overlay {
\tbackground: #FF416C;
\tbackground: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
\tbackground: linear-gradient(to right, #FF4B2B, #FF416C);
\tbackground-repeat: no-repeat;
\tbackground-size: cover;
\tbackground-position: 0 0;
\tcolor: #FFFFFF;
\tposition: relative;
\tleft: -100%;
\theight: 100%;
\twidth: 200%;
\ttransform: translateX(0);
\ttransition: transform 0.6s ease-in-out;
}

.container_signup_signin.right-panel-active .overlay {
\ttransform: translateX(50%);
}

.overlay-panel {
\tposition: absolute;
\tdisplay: flex;
\talign-items: center;
\tjustify-content: center;
\tflex-direction: column;
\tpadding: 0 40px;
\ttext-align: center;
\ttop: 0;
\theight: 100%;
\twidth: 50%;
\ttransform: translateX(0);
\ttransition: transform 0.6s ease-in-out;
}

.overlay-left {
\ttransform: translateX(-20%);
}

.container_signup_signin.right-panel-active .overlay-left {
\ttransform: translateX(0);
}

.overlay-right {
\tright: 0;
\ttransform: translateX(0);
}

.container_signup_signin.right-panel-active .overlay-right {
\ttransform: translateX(20%);
}

.social-container {
\tmargin: 20px 0;
}

.social-container a {
\tborder: 1px solid #DDDDDD;
\tborder-radius: 50%;
\tdisplay: inline-flex;
\tjustify-content: center;
\talign-items: center;
\tmargin: 0 5px;
\theight: 40px;
\twidth: 40px;
}

footer {
\tbackground-color: #222;
\tcolor: #fff;
\tfont-size: 14px;
\tbottom: 0;
\tposition: fixed;
\tleft: 0;
\tright: 0;
\ttext-align: center;
\tz-index: 999;
}

footer p {
\tmargin: 10px 0;
}

footer i {
\tcolor: red;
}

footer a {
\tcolor: #3c97bf;
\ttext-decoration: none;
}

.fa-user-circle-o {
\tfont-size: 2rem;
\tdisplay: inline-block;
\tposition: relative;
\tcolor: var(--theme-nav);
}

/* .fa-user-circle-o:hover{
\tcolor: var(--theme-rose);
} */

    `;




    return (
        <div>
            <title>Đăng nhập - Đăng ký</title>
            <style>{css}</style>
            <Header></Header>
            <div className="container_signup_signin" id="container_signup_signin">
                <div className="form-container sign-up-container">
                    <form name="sign-up-form" action="#" onSubmit={handleSignUp}>
                        <h1>Tạo tài khoản</h1>
                        <div className="social-container">
                            <a href="https://www.facebook.com/" className="social"><i
                                className="fab fa-facebook-f"></i></a>
                            <a href="https://www.facebook.com/" className="social"><i
                                className="fab fa-google-plus-g"></i></a>
                            <a href="https://www.google.com/" className="social"><i
                                className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>hoặc sử dụng email để đăng ký</span>
                        <input name="sign-up-name" type="text" placeholder="Tên" value={regName} onChange={(e) => setRegName(e.target.value)} />
                        <input name="sign-up-email" type="email" placeholder="Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
                        <input name="sign-up-passwd" type="password" placeholder="Mật khẩu" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Đăng kí'}</button>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form
                        name="sign-in-form"
                        style={{color: 'var(--theme-title)'}}
                        action="#"
                        onSubmit={handleSignIn}
                    >
                        <h1>Đăng nhập</h1>
                        <div className="social-container">
                            <a href="https://www.google.com/" className="social"
                               style={{color: 'var(--theme-title)'}}><i
                                className="fab fa-facebook-f"></i></a>
                            <a href="https://www.google.com/" className="social"
                               style={{color: 'var(--theme-title)'}}><i
                                className="fab fa-google-plus-g"></i></a>
                            <a href="https://www.google.com/" className="social"
                               style={{color: 'var(--theme-title)'}}><i
                                className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>hoặc đăng nhập bằng</span>
                        <input name="sign-in-email" type="text" placeholder="Email" value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required/>
                        <input name="sign-in-passwd" type="password" placeholder="Mật khẩu" value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required/>
                        <a href="https://www.google.com/">Quên mật khẩu?</a>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Đăng nhập'}
                        </button>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Chào bạn!</h1>
                            <p>Đã có tài khoản, hãy đăng nhập để tiếp tục!!!</p>
                            <button className="ghost" id="signIn">Đăng nhập</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Chào bạn!</h1>
                            <p>Chưa có tài khoản, hãy đăng ký!!!</p>
                            <button className="ghost" id="signUp">Đăng ký</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;