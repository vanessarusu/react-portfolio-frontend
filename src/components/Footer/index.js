import React from 'react';
import styles from './Footer.module.scss';
import * as endpoints from '../../global/endpoints';
import logo from '../../img/vanessarusu-logo-black.svg';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';




class Footer extends React.Component {
    links = endpoints.SITE_NAVIGATION;
    copyrightDate = new Date().getFullYear();

    render() {
        
        return (
            <>
                <footer className={styles.footerContainer}>
                    <div className={styles.container}>
                    <figure className={styles.logo}>
                        <img src={logo} alt="logo"/>
                    </figure>
                        <nav>
                            <ul>
                                {
                                    Object.keys(this.links).map((key) => {
                                        return (
                                            <li key={key} className={styles.link}>
                                                <Link to={this.links[key].link}>{this.links[key].name}</Link>
                                            </li>)
                                    })
                                }
                            </ul>
                        </nav>
                        <div className={styles.copyrightContainer}>
                            <span>&copy; {this.copyrightDate} vanessa rusu &nbsp; &bull; &nbsp;</span>
                            <span><Link to={endpoints.PRIVACY_POLICY_PAGE.link}>{endpoints.PRIVACY_POLICY_PAGE.name}</Link></span>
                            <span className={styles.social}>
                                <a href={endpoints.INSTAGRAM_HREF} target="blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} />
                                    <span className="sr-only">Instagram</span>
                                </a>
                            </span>
                        </div>
                    </div>
                </footer>
            </>
        )
    }    
}

export default Footer;