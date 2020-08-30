import React from 'react';
import styles from './Header.module.scss';
import * as endpoints from '../../global/endpoints';
import logo from '../../img/vanessarusu-logo.svg';
import { Link } from "react-router-dom";
import SocialLinks from './../SocialLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileActive: false,
            mobileNavOpen: false
        }
        this.mobileBreakpoint = 1024;
    }
    componentDidMount() {
        window.addEventListener('resize', this.debouncedHandleResize);
        if(window.innerWidth <= this.mobileBreakpoint) {
            this.setState({
                mobileActive: true
            })
        }
    }

    clickHandler = () => {
        if(this.state.mobileActive) {
            this.toggleNav();
        }
    }

    toggleNav = () => {
        let currentVal = this.state.mobileNavOpen;
            currentVal = !currentVal;

            currentVal 
            ? document.body.classList.add('modal-open') 
            : document.body.classList.remove('modal-open')

        this.setState({
            mobileNavOpen: currentVal
        })
    }

    debounce(fn, ms) {
        let timer;
        return _ => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            timer = null
            fn.apply(this, arguments)
          }, ms)
        };
    }

    isMobileActive() {
        return window.innerWidth <= this.mobileBreakpoint;
    }

    debouncedHandleResize = this.debounce(function handleResize() {
        this.setState({mobileActive: this.isMobileActive()});

        if(window.innerWidth >= this.mobileBreakpoint && document.body.classList.contains('modal-open')) {
            this.toggleNav();
        }
      }, 500)
    
    links = endpoints.SITE_NAVIGATION;
    render() {
        return (
            <header className={styles.header}>
                <div className={styles.container}>
                    <figure className={styles.logo}>
                        <Link to={'/'}>
                            <img src={logo} alt="vanessa rusu logo"/>
                        </Link>
                    </figure>
                    <div className={`${styles.mobileMenuIcon} ${this.state.mobileNavOpen ? styles.mobileOpen : ''}`} onClick={this.clickHandler}>
                            <div className={styles.menuContainer}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    <nav className={styles.nav}>
                        <ul>
                            {
                                Object.keys(this.links).map((key) => {
                                    return (
                                        <li key={key} className={styles.link}>
                                            <Link to={this.links[key].link} onClick={this.clickHandler}>{this.links[key].name}</Link>
                                        </li>)
                                })
                            }
                        </ul>
                        
                        <span className={styles.social}>
                            <a href={endpoints.INSTAGRAM_HREF} target="blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} />
                                <span className="sr-only">Instagram</span>
                            </a>
                        </span>
                        <div className={styles.mobileOnlyMenu}>
                            <h4>Get in touch</h4>
                            <p><a href={`mailto:${endpoints.CONTACT_EMAIL}`}>{endpoints.CONTACT_EMAIL}</a></p>
                            <p>Based in Burnaby, BC. Working with clients across North America</p>

                            <SocialLinks />
                        </div>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header;