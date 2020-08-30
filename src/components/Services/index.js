import React from 'react';
import styles from './Services.module.scss';
import lines from '../../img/lines.svg';
import squiggle from '../../img/squiggle.svg';
import * as endpoints from '../../global/endpoints';
import { Link } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll'
import InstagramFeed from '../InstagramFeed';
import Testimonial from '../Testimonial';


class Services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageCopy: false,
            postData: false,
            testimonials: []
        }
    }

    componentDidMount() {
        Promise.all([
          fetch(endpoints.POSTS_BY_CAT(endpoints.SERVICES_POSTS)),
          fetch(endpoints.POSTS_BY_CAT(endpoints.TESTIMONIALS_CAT))
        ])
        .then(res => Promise.all(res.map(x => x.json())))
        .then((values) => {
            this.setState({
                pageCopy: values[0][0],
                postData: values[0].slice(1).reverse(),
                testimonials: values[1]
            });

            document.title = 'Branding, Design and Web Development Services by Vanessa Rusu';
        });
    }

    render() {
        const hasData = this.state.postData && this.state.pageCopy;

        if (!hasData) {
            return null;
        }
        const postData = this.state.postData;
        
        return (
            <>
            <article>
                <div className={styles.headerContainer}>
                    <div className={styles.headerPanel}>
                        <h2>{this.state.pageCopy.title.rendered}</h2>
                        <img className={styles.squiggle} src={squiggle} alt="squiggle"></img>
                        <p dangerouslySetInnerHTML={{ __html: this.state.pageCopy.content.rendered}}></p>
                    </div>
                    <div className={styles.nav}>
                        <p>Jump to a service</p>
                    { 
                        Object.keys(postData).map((key) => {
                            return(
                                <ScrollLink key={key} data-key={'0'+`${parseInt(key)+1}`} activeClass="active" className="test-1" to={`${"test-"+key}`} spy={true} smooth={true} duration={500} dangerouslySetInnerHTML={{ __html: postData[key].acf.supporting_callout }} style={{'--color': postData[key].acf.custom_primary_color}}></ScrollLink>
                            )                        
                        })
                    }
                    </div>
                </div>

                {
                    Object.keys(postData).map((key) => {
                        return (
                            <div key={key} className={styles.serviceItemContainer} name={`${"test-"+key}`} style={{'--bg': postData[key].acf.custom_primary_color}}>
                                <div className={`${styles.imageContainer}`} dangerouslySetInnerHTML={{ __html: postData[key].acf.hero_images }}></div>
                                <div className={styles.container}>
                                    <img src={postData[key]._embedded['wp:featuredmedia']['0'].source_url} alt={postData[key]._embedded['wp:featuredmedia']['0'].alt_text} className={styles.introImg}/>
                                    <div className={styles.serviceMainContent}>
                                        <h2 dangerouslySetInnerHTML={{ __html: postData[key].acf.supporting_callout }} style={{color: postData[key].acf.custom_primary_color}}></h2>
                                        <img src={lines} alt="decorative lines" className={styles.lines}/>
                                        <div dangerouslySetInnerHTML={{ __html: postData[key].content.rendered }} />
                                        <Link to={endpoints.CONNECT_PAGE_LINK.link} className={styles.CTALink}>Get in Touch</Link>
                                    </div>
                                    <aside className={styles.sidebar}>
                                        <div dangerouslySetInnerHTML={{ __html: postData[key].acf.right_side_list }} />
                                    </aside>
                                </div>
                            </div>)
                    })
                }
            </article>
            <Testimonial data={this.state.testimonials[0]} />
            <InstagramFeed />
            </>
        )
    }    
}

export default Services;