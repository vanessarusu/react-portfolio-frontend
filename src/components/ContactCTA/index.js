import React from 'react';
import styles from './ContactCTA.module.scss';
import * as endpoints from '../../global/endpoints';
import { Link } from 'react-router-dom';

class ContactCTA extends React.Component {
    postId = 535;

    constructor(props) {
        super(props);
        this.state = {
            postData: false
        }   
    }

    componentDidMount() {
        Promise.all([
            fetch(endpoints.POSTS_BY_ID(this.postId))
        ])
        .then(res => Promise.all(res.map(x => x.json())))
        .then((values) => {
        
            this.setState({
                postData: values[0]
            })
        });
    }

    render() {
        const hasData = this.state.postData.id;

        if(hasData) {
            return (
                <section className={styles.ctaPanel}>
                    <h3 className={styles.headline}>{this.state.postData.acf.heading}</h3>
                    <p>{this.state.postData.acf.copy}</p>
                    <Link to={endpoints.CONNECT_PAGE_LINK.link} className={styles.button}>let's collaborate</Link>
                </section>
            )
        }

        return false;
    }
}

export default ContactCTA;