import React from 'react';
import { Link } from "react-router-dom";
import styles from './NotFound.module.scss';
import * as endpoints from '../../global/endpoints';

const NotFound = (props) => {
    
    document.title = `${endpoints.NOT_FOUND_PAGE_TITLE_PARTIAL + endpoints.PAGE_TITLE_CONSTANT}`;

    return(
        <div role="main" className={styles.notFoundContainer}>
            <div>
                <h1>oops<span> :(</span></h1>
                <p>This page seems to be out of office. <br/>For immediate inquiries please contact <a href={`mailto:${endpoints.CONTACT_EMAIL}`}>{endpoints.CONTACT_EMAIL}</a></p>
                <p className={styles.backButton}>
                    <Link to={'/'}>back home</Link>
                </p>
                
            </div>
        </div>
    )
}

export default NotFound;