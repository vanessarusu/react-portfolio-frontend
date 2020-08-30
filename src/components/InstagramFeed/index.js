import React from 'react';
import styles from './InstagramFeed.module.scss';
// import squiggle from '../../img/squiggle.svg';
import * as endpoints from '../../global/endpoints';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInstagram, faDribbble, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
// import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// import { Link } from "react-router-dom";

class InstagramFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false
        }
    }

    componentDidMount() {        
        let accessToken = 'IGQVJWaDhHODJqZAEdtSTFONDRLRW9LZAFJiVHlxQlFQMV9GMHZABdWNzeDI4bGRhbkVoVHN5X3R0TzZAfQ195dy1jME5BSWZAzcktSTFJDcW1SN0I1U2JvTlZARUnlGWGVSTkF1RzRXMVF3';
        Promise.all([
          fetch('https://graph.instagram.com/me/media?fields=media_url,username&limit=5&access_token='+accessToken),
        //   fetch('https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=c5c02891640da029406a98e35577b374&access_token=IGQVJXTmYyN003UldLNERQNG1jbkRUX3VQNzJfY1ZAnQjBMMkRfQXgtM1NfNVN2alM3VllndVpTR2VoamRJUTAyWThudzNFU1dUMVBzbXgyVEkxNkgwYjdyNmFDWm5XODFGenNMLXpPMHJlN1ZAMdjBwYW5YVTN0WlRIVS1z')
        ])
        .then(res => Promise.all(res.map(x => x.json())))
        .then((values) => {
            // console.log(values);
            this.setState({data: values[0].data});
            // document.title = this.state.data.title.rendered + ' —  by Vanessa Rusu';
        });
    }

    render() {
        const hasData = this.state.data;
        if (!hasData) {
            return null;
        }
        const instagramData = this.state.data;
        return (
            <article className={styles.aboutContainer}>
                <ul className={styles.instagramContainer}>
                    <li className={styles.socialIntro}>
                        <div>
                            <h4>fresh off the artboard</h4>
                            <a href={endpoints.INSTAGRAM_HREF}>@{this.state.data[0].username || 'vanessarusu'}</a>
                        </div>
                    </li>
                    {Object.keys(instagramData).map((key) => (
                        <li key={key}><img src={instagramData[key].media_url} alt="instagram post" /></li>
                    )
                    )}
                </ul>
            </article>
        )
    }    
}

export default InstagramFeed;