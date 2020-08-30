import React from 'react';
import styles from './GetInTouch.module.scss';
import ContactForm from './../ContactForm';
import SocialLinks from './../SocialLinks';

class GetInTouch extends React.Component {
    componentDidMount() {
        document.title = 'Get in Touch  —  by Vanessa Rusu';
    }

    render() {
        return (
            <>
            <section className={styles.getInTouchContainer}>
                <div className={styles.formComponent}>
                    <h2 className={styles.title}>Let's connect</h2>
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