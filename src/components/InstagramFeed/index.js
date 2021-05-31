import React from 'react';
import styles from './InstagramFeed.module.scss';
import * as endpoints from '../../global/endpoints';

class InstagramFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false
        }
    }

    componentDidMount() {        
        let accessToken = 'IGQVJXOXd1OFVBWHRCNkxWTUJDSW1KM3VRcUg2eUZAoSVU1dkhKZAWF6QmhqSXlYRlk5N2tseXRWRnhZAa0dwZAFhPcDEyLUFHOHU2aDVVX3pNZAHZAieGdxWFdral84NXJyV1dHTUxaSEk2VkNDc2lsMTF2MgZDZD';

        Promise.all([
          fetch('https://graph.instagram.com/me/media?fields=media_url,username&limit=5&access_token='+accessToken),
        ])
        .then(res => Promise.all(res.map(x => x.json())))
        .then((values) => {
            this.setState({data: values[0].data});
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