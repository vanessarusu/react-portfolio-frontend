import React from 'react';
import styles from './Services.module.scss';
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
        document.title = `${endpoints.SERVICES_PAGE_TITLE_PARTIAL + endpoints.PAGE_TITLE_CONSTANT}`;

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
                        <h1>{this.state.pageCopy.title.rendered}</h1>
                        <img className={styles.squiggle} src={squiggle} alt="squiggle"></img>
                        <p dangerouslySetInnerHTML={{ __html: this.state.pageCopy.content.rendered}}></p>
                    </div>
                    <div className={styles.nav}>
                        <p>Jump to a service</p>
                    { 
                        Object.keys(postData).map((key) => {
                            return(
                                <ScrollLink key={key} data-key={'0'+`${parseInt(key)+1}`} activeClass="active" className="test-1" to={`${"test-"+key}`} spy={true} smooth={true} duration={500} dangerouslySetInnerHTML={{ __html: postData[key].acf.supporting_callout }} style={{'--color': postData[key].acf.service_colour}}></ScrollLink>
                            )                        
                        })
                    }
                    </div>
                </div>

                {
                    Object.keys(postData).map((key) => {
                        const serviceDetails = postData[key].acf.service_includes_callouts;
                        return (
                            <div key={key} className={styles.serviceItemContainer} name={`${"test-"+key}`} style={{'--bg': postData[key].acf.service_colour}}>
                                <div className={`${styles.imageContainer}`}>
                                    <img src={postData[key].acf.service_image_banner} alt={`${postData[key].title.rendered}`} />

                                    </div>
                                <div className={styles.container}>
                                    <img src={postData[key]._embedded['wp:featuredmedia']['0'].source_url} alt={postData[key]._embedded['wp:featuredmedia']['0'].alt_text} className={styles.introImg}/>
                                    <div className={styles.serviceMainContent}>
                                        <h3 className={styles.title} dangerouslySetInnerHTML={{ __html: postData[key].acf.supporting_callout }}></h3>
                                        
                                        <div dangerouslySetInnerHTML={{ __html: postData[key].content.rendered }} className={styles.primaryContent} />
                                        <div className={styles.includes}>
                                            { serviceDetails && <h3>this service includes</h3>}
                                            { serviceDetails && 
                                                Object.keys(serviceDetails).map((key) => {
                                                    return(
                                                    <li key={key}>
                                                        <h4>{serviceDetails[key].post_title}</h4>
                                                        <p>{serviceDetails[key].post_content}</p>
                                                    </li>
                                                )})
                                            
                                              }
                                        </div>
                                        <Link to={endpoints.CONNECT_PAGE_LINK.link} className={styles.CTALink}>Get in Touch</Link>
                                    </div>
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