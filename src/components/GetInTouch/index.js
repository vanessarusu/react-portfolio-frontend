import React from 'react';
import styles from './GetInTouch.module.scss';
import ContactForm from './../ContactForm';
import SocialLinks from './../SocialLinks';
import * as endpoints from '../../global/endpoints';

class GetInTouch extends React.Component {
    componentDidMount() {
        document.title = `${endpoints.CONNECT_PAGE_TITLE_PARTIAL + endpoints.PAGE_TITLE_CONSTANT}`;
    }

    render() {
        return (
            <>
            <section className={styles.getInTouchContainer}>
                <div className={styles.formComponent}>
                    <h1 className={styles.title}>let's connect</h1>
                    <ContactForm />
                    <p className={styles.disclaimer}>This is just a way to reach out, and will not opt you into any mailing lists :)</p>
                    <SocialLinks />
                </div>
            </section>
            </>
        )
    }    
}

export default GetInTouch;