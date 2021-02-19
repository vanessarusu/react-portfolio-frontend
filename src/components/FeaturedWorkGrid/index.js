import React from 'react';
import FeaturedWorkItem from '../FeaturedWorkItem';
import styles from './FeaturedWorkGrid.module.scss';
import * as endpoints from '../../global/endpoints';
import { Link } from "react-router-dom";

const FeaturedWorkGrid = (props) => {
    const columns = props.columns ? props.columns : '3';
    let filteredResults = false;
    let oddResults = false;
        
    if (props.data.length === 0) {
        return null;
    }
    
    if (props.activefilter) {
        
        filteredResults = props.data.filter((item) => {
            return item.categories.indexOf(props.activefilter) >= 0 
        });
    }

    let finalData = filteredResults ? filteredResults : props.data;
    if(finalData.length % 2 !== 0) {
        oddResults = true;
    }

    return(
        <div role="main" id="featuredWork" aria-labelledby="featuredWork">
            <h2 className="sr-only" aria-hidden="true">Featured Work</h2>
            <div className={`${styles.gridContainer}`}>
                
                {Object.keys(finalData).map(key => {
                    return (
                        <FeaturedWorkItem 
                            key={key} 
                            id={key} 
                            data={finalData[key]} 
                            activefilter={props.activefilter}
                            columns={columns} />
                    )
                })}
                {
                    oddResults && (
                        <div className={`${styles.gridItem} ${styles.lastItemCTA}`}>
                            <div>
                                <h2>I would love to feature your project here!</h2>
                                <Link to={endpoints.CONNECT_PAGE_LINK.link}>Let's Connect</Link>
                            </div>
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}

export default FeaturedWorkGrid;