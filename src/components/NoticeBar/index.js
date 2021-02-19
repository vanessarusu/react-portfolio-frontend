import React from 'react';
import styles from './NoticeBar.module.scss';
import * as endpoints from '../../global/endpoints';

class NoticeBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: false,
            barDismissed: false
        }
        this.dismissBar = this.dismissBar.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    dismissBar() {
        localStorage.setItem('barDismissed', true)
        this.setState({barDismissed: true});
    }

    handleKeyDown(e) {
        if(e.key === 'Enter') {
            this.dismissBar();
        }
    }

    componentDidMount() {

        if(localStorage.getItem('barDismissed')) {
            this.setState({barDismissed: true});
        }
        
        Promise.all([
            fetch(endpoints.POSTS_BY_CAT(endpoints.NOTIFICATION_TOPBAR))
        ])
        .then(res => Promise.all(res.map(x => x.json())))
        .then((values) => {
            this.setState({
                notifications: values[0]
            });
        });
    }

    render() {
        const notification = this.state.notifications[0];
        
        if (notification && notification.acf.show) {
            return (
                <>
                { !this.state.barDismissed && 
                <div className={styles.notificationBar} 
                style={{'--bar-color': notification.acf.bar_color, 
                '--bar-font-color': notification.acf.bar_font_color}}>
                    <p className={styles.barCopy}>
                        <span dangerouslySetInnerHTML={{__html: notification.content.rendered}}></span>
                        <a href={notification.acf.notification_bar_cta_url} dangerouslySetInnerHTML={{ __html: notification.acf.notification_bar_callout}} className={styles.link}></a>
                    </p>
                    <span className={styles.dismiss} onClick={this.dismissBar} onKeyDown={this.handleKeyDown} tabIndex='0'>
                        <span></span>
                        <span></span>
                    </span>
                </div>
                }
                </>
            )
        }

        else {
            return null
        }
    }    
}

export default NoticeBar;