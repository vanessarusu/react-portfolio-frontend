import React from 'react';
import styles from './HomepageHero.module.scss';
import { Link } from "react-router-dom";
import * as endpoints from '../../global/endpoints';
import heroImage from '../../img/main-hero-working-base2.jpg';
import ipad from '../../img/main-hero-working-ipad.png';
import slide1 from '../../img/ipad-1.jpg';
import slide2 from '../../img/ipad-2.jpg';
import slide3 from '../../img/ipad-3.jpg';
import slide4 from '../../img/ipad-4.jpg';


class HomepageHero extends React.Component {
    constructor(props) {
        super(props);
        this.headline = React.createRef();

        this.state = {
            fadeInTrigger:false
        } 
    }

    componentDidMount() {
        setTimeout(()=> {
            this.updateState();
            
        }, 500);
        
    }

    updateState(){
        this.setState({
            fadeInTrigger: true
        });
    }

    render() {
        return(
            <section className={styles.heroContainer}>
                <div className={`${styles.copyContainer} ${this.state.fadeInTrigger ? styles.fadeIn : ''}`}>
                    <h1>
                        <p><span>design &amp; web development</span></p>
                        <p><span>solutions you can actually use</span></p>
                        <p><span><strong>to grow your business </strong></span></p>
                    </h1>
                    <Link to={endpoints.SERVICES_PAGE_LINK.link} className={styles.heroCTA}>browse services</Link>
                </div>
                <div className={styles.heroImageContainer}>
                    <img src={heroImage}/>
                </div>
                <div className={styles.ipadContainer}>
                    <img src={ipad} />
                    <div className={styles.sliderContainer}>
                        <div className={styles.imageContainer}>
                            <div><img src={slide2}/></div>
                            <div><img src={slide1}/></div>
                            <div><img src={slide3}/></div>
                            <div><img src={slide4}/></div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default HomepageHero;