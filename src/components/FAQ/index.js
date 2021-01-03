import React from 'react';
import styles from './FAQ.module.scss';
import squiggle from '../../img/squiggle.svg';
import * as endpoints from '../../global/endpoints';
import Testimonial from '../Testimonial';
import InstagramFeed from '../InstagramFeed';

class FAQ extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            faqQuestions: false,
            testimonials: []
        }
    }

    componentDidMount() {
        document.title = `${endpoints.FAQ_PAGE_TITLE_PARTIAL + endpoints.PAGE_TITLE_CONSTANT}`;
        
        Promise.all([
          fetch(endpoints.POSTS_BY_CAT(endpoints.FAQ_QUESTION_CAT)),
          fetch(endpoints.POSTS_BY_CAT(endpoints.TESTIMONIALS_CAT)),
        ])
        .then(res => Promise.all(res.map(x => x.json())))
        .then((values) => {
            this.setState({
                faqQuestions: values[0],
                testimonials: values[1]
            });
        });
    }

    render() {
        // const hasData = this.state.postData && this.state.pageCopy;

        // if (!hasData) {
        //     return null;
        // }
        // const postData = this.state.postData;
        const questions = this.state.faqQuestions;
        return (
            <>
            <article>
                <div className={styles.headerPanel}>
                    <h1>Frequently Asked Questions</h1>
                    <img className={styles.squiggle} src={squiggle} alt="squiggle"></img>
                </div>
                <div className={styles.content}>
                    <div className={styles.container}>
                        {
                            Object.keys(questions).map((question) => {
                                return (
                                    <div key={question} className={styles.serviceItemContainer}>
                                        <h2>{questions[question].title.rendered}</h2>
                                        <div dangerouslySetInnerHTML={{ __html: questions[question].content.rendered }} />
                                    </div>)
                            })
                        }
                    </div>
                    <p className={styles.emailCTA}>Unable to find the answer you are looking for? <br/>Email <a href={`mailto:${endpoints.CONTACT_EMAIL}`}>{endpoints.CONTACT_EMAIL}</a> to chat directly!</p>
                </div>
            </article>
            <Testimonial data={this.state.testimonials[1]} />
            <InstagramFeed />
            </>
        )
    }    
}

export default FAQ;