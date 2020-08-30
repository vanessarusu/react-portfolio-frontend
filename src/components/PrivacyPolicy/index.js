
import React from 'react';
import styles from './PrivacyPolicy.module.scss';
import * as endpoints from '../../global/endpoints';


class PrivacyPolicy extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: false
        }
    }


    componentDidMount(){

        Promise.all([
            fetch(endpoints.POSTS_BY_ID(endpoints.PRIVACY_POLICY))
          ])
          .then(res => Promise.all(res.map(x => x.json())))
          .then((values) => {
            this.setState({data: values[0]});
          });
    }  

    render() {
        const hasData = this.state.data;

        if(!hasData) {
            return null;
        }

        return (
            <article className={styles.privacyPolicyContainer}>
                <h1 className={styles.headlineContainer}>{this.state.data.title.rendered}</h1>
                <div className={styles.contentContainer} dangerouslySetInnerHTML={{ __html: this.state.data.content.rendered }}></div>
            </article>
        )
    }
}

export default PrivacyPolicy;