import React from 'react';
import styles from './SocialLinks.module.scss';
import * as endpoints from '../../global/endpoints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faDribbble, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';



const SocialLinks = (props) => (
    <div className={styles.socialLinks}>
        <a href={endpoints.INSTAGRAM_HREF} target="blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href={endpoints.DRIBBLE_HREF} target="blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faDribbble} />
        </a>
        <a href={endpoints.LINKEDIN_HREF} target="blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
        <a href={endpoints.GITHUB_HREF} target="blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href={`mailto:${endpoints.CONTACT_EMAIL}`}>
            <FontAwesomeIcon icon={faEnvelope} />
        </a>
    </div>
)


export default SocialLinks;





