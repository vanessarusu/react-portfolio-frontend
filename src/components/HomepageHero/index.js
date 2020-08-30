import React from 'react';
import styles from './HomepageHero.module.scss';
import { Link } from "react-router-dom";
import * as endpoints from '../../global/endpoints';


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
                        <p><span>a studio dedicated to helping</span></p>
                        <p><span>startups, small businesses &amp;</span></p>
                        <p><span>entrepreneurs level up their brand</span></p>
                        <p><span>so they can <strong>grow their business.</strong></span></p>
                    </h1>
                    <Link to={endpoints.SERVICES_PAGE_LINK.link} className={styles.heroCTA}>browse services</Link>
                </div>
                
            </section>
        )
    }
}

export default HomepageHero;