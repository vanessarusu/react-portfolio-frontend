import React from 'react';
import MailChimpForm from '../MailChimpForm';
import styles from './OptinCTAPanel.module.scss';


const OptinCTAPanel = (props) => {

    if (props.data.length === 0) {
        return null;
    }
    
    const {content, acf} = props.data;

    return (
        <section className={styles.ctaPanel}>
            <div className={styles.wrapper}>
                <h3>{acf.cta_heading_title}</h3>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: content.rendered }}></div>
                <p className={styles.smallText}>{acf.cta_additional_content}</p>
                {/* <a className={styles.ctaLink} href={acf.cta_link}>{acf.cta_link_text}</a> */}
                <MailChimpForm />
            </div>
        </section>
    )
}

export default OptinCTAPanel;