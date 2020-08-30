import React from 'react';
import styles from './Testimonial.module.scss';
import squiggle from '../../img/squiggle.svg';


class Testimonial extends React.Component {
    postId = 535;

    constructor(props) {
        super(props);
        this.state = {
            postData: false
        }
    }

    componentDidMount() {
        this.setState({postData: this.props.data});
    }

    render() {
        const hasData = this.props.data;

        if(hasData) {
            return (
                <section className={styles.testimonialPanel}>
                    
                    <h3 className={styles.sectionHeading}>Client Feedback</h3>
                    
                    <div className={styles.testimonialContent} dangerouslySetInnerHTML={{ __html: this.props.data.content.rendered }}></div>
                    <img className={styles.squiggle} src={squiggle} alt="squiggle"></img>
                    <p className={styles.author} dangerouslySetInnerHTML={{ __html: this.props.data.title.rendered }}></p>
                </section>
            )
        }

        return false;
    }
}

export default Testimonial;