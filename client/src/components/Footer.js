import { Link } from "react-router-dom";

function Footer() {
    return (
        <div>
            <footer className="footer">

                {/* Email and Contact Info */}
                <ul className="footer-left">
                    <strong>Code</strong>  
                    <li key={"email"}>
                        <Link to={"https://github.com/iamdanielyun"} target="_blank">
                            <i style={{fontSize: "23px"}} id="github" className="fa-brands fa-square-github"></i>
                        </Link>
                    </li>
                </ul>

                {/* Copyright */}
                <ul className="footer-right">
                    <li key={"about"}>
                        <Link to={"https://danielyun.onrender.com/"} target="_blank">
                            © 2024 Daniel Yun
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
      );
}

export default Footer;