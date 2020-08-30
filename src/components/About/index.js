import React from 'react';
import styles from './About.module.scss';
import squiggle from '../../img/squiggle.svg';
import * as endpoints from '../../global/endpoints';
import { Link } from "react-router-dom";
import SocialLinks from '../SocialLinks';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false
        }
    }

    componentDidMount() {        
    
        Promise.all([
          fetch(endpoints.POSTS_BY_ID(endpoints.ABOUT_PAGE))
        ])
        .then(res => Promise.all(res.map(x => x.json())))
        .then((values) => {
            this.setState({data: values[0]});
            document.title = this.state.data.title.rendered + ' —  by Vanessa Rusu';
        });
    }

    render() {
        const hasData = this.state.data;

        if (!hasData) {
            return null;
        }
        
        return (
            <article className={styles.aboutContainer}>
                <div className={styles.imageContainer}>
                    <img src={this.state.data._embedded['wp:featuredmedia']['0'].source_url} alt="Vanessa Rusu" />
                </div>
                <div className={styles.contentContainer}>
                    <h3>{this.state.data.title.rendered}</h3>
                    <img className={styles.squiggle} src={squiggle} alt="squiggle"></img>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: this.state.data.content.rendered}}></div>
                    <div className={styles.aboutCTA}>
                        <SocialLinks />
                        <Link to={endpoints.CONNECT_PAGE_LINK.link} className={styles.button}>Let's work together</Link>
                    </div>
                </div>
            </article>
        )
    }    
}

export default About;