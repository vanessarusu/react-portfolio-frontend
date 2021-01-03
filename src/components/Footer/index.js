import React from 'react';
import styles from './Footer.module.scss';
import * as endpoints from '../../global/endpoints';
import logo from '../../img/vanessarusu-logo-black.svg';
import { Link } from "react-router-dom";
import SocialLinks from './../SocialLinks';




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
                            <figcaption>
                                <p>
                                    &copy; {this.copyrightDate} vanessa rusu &nbsp; &#8212; &nbsp; 
                                    <Link to={endpoints.PRIVACY_POLICY_PAGE.link}>{endpoints.PRIVACY_POLICY_PAGE.name}
                                    </Link>
                                </p>
                            </figcaption>
                        </figure>
                        <div className={styles.footerSocials}>
                            <SocialLinks />
                        </div>
                        <div className={styles.copyrightContainer}>
                            <p className={styles.social}></p>
                            <p dangerouslySetInnerHTML={{__html: endpoints.FOOTER_LOCATION_INFO}}></p>
                            <p>
                                <a href={`mailto:${endpoints.CONTACT_EMAIL}`}>{endpoints.CONTACT_EMAIL}</a>
                                </p>
                        </div>
                    </div>
                </footer>
            </>
        )
    }    
}

export default Footer;