import React from 'react';
import styles from './ThreeKings.module.scss';
import squiggle from '../../img/squiggle.svg';
import Flyout from './../Flyout';
import { Link } from "react-router-dom";
import * as endpoints from '../../global/endpoints';

const ThreeKings = (props) => (
    <div role="main" id="threeKings" className={styles.threeKings} aria-labelledby="threeKings">
        {Object.keys(props.data).map(key => {
            return (
            <div key={key} className={styles.container}>
                <span className={styles.meta}>{props.data[0].title.rendered}</span>
                <h2>{props.data[key].title.rendered}</h2>
                <img className={styles.squiggle} src={squiggle} alt="squiggle"></img>
                <div>
                    <div className={styles.gridContainer} dangerouslySetInnerHTML={{ __html: props.data[key].content.rendered }} />
                </div>
                <Link to={endpoints.CONNECT_PAGE_LINK.link} className={styles.panelCTA}>get in touch</Link>
            </div>
            )
        })}
        <Flyout data={props.flyoutData}/>
    </div>
);

export default ThreeKings;