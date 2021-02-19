import React from 'react';
import styles from './Flyout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';


class Flyout extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            visible: false,
            mobileExpanded: false
        };
    }

    clickHandler = () => {
        let newVal = !this.state.mobileExpanded;
        this.setState({
            mobileExpanded: newVal
        })
    }

    render() {

        if (this.props.data.length === 0) {
            return null;
        }

        const title = this.props.data.title.rendered;
        const content = this.props.data.content.rendered;

        const hoverHandler = (e) => {
            const currentState = this.state.visible;
            this.setState({visible: !currentState});
        }

        return (
            <div 
            className={`${this.state.visible ? styles.isVisible : ''} ${styles.flyoutContainer} ${this.state.mobileExpanded ? styles.mobileExpanded : styles.mobileCollapsed}`} 
            onFocus={hoverHandler} 
            onBlur={hoverHandler} 
            onMouseEnter={hoverHandler} 
            onMouseLeave={hoverHandler}
            tabIndex="0">
                <div className={styles.flyoutContent}>
                    <h3 onClick={this.clickHandler}>{title}</h3>
                    <div className={`${styles.listContainer} ${styles.flyoutContent}`} dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
                <FontAwesomeIcon className={styles.indicator} icon={faAngleDoubleRight} />
            </div>
        )
    }
};

export default Flyout;