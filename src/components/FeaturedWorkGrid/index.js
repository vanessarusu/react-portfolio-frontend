import React from 'react';
import FeaturedWorkItem from '../FeaturedWorkItem';
import styles from './FeaturedWorkGrid.module.scss';



const FeaturedWorkGrid = (props) => {
const columns = props.columns ? props.columns : '3';
    
    if (props.data.length === 0) {
        return null;
    }
    const data = props.data;

    return (
        <div>
            <ul className={`${styles.gridContainer}`}>
                {Object.keys(data).map(key => {
                    return (
                        <FeaturedWorkItem key={key} id={key} data={data[key]} columns={columns} />
                    )
                })}
            </ul>
        </div>
    )
}

export default FeaturedWorkGrid;