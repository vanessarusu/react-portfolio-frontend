import React from 'react';
import styles from './CategoryFilters.module.scss';
import * as endpoints from '../../global/endpoints';
import ProjectTag from '../ProjectTag';



class CategoryFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: false,
            currentFilter: this.clearFiltersKey
        }
    }

    clearFiltersKey = 999;

    clearFilters = () => {
        this.setState({
            currentFilter: this.clearFiltersKey
        })
        this.props.handleSelection(false);
    }

    handleClick = (key) => {
        // if the current filter was clicked again
        if(this.state.currentFilter === key) {
            this.clearFilters();
        }

        else {
            this.setState({
                currentFilter: key
            })
            this.props.handleSelection(this.state.filters[key].id);
        }
    }

    componentDidMount() {
        Promise.all([
            fetch(endpoints.ALL_SUB_CATEGORIES(endpoints.ALL_WORK))

            ])
            .then(res => Promise.all(res.map(x => x.json())))
            .then((values) => {
                this.setState(
                        {
                            filters: values[0],
                        }
                    );
            });
        }

    render() {
        const hasData = this.state.filters;

        if (!hasData) {
            return null;
        }
        
        return (
            <ul className={styles.filterContainer}>
                <ProjectTag 
                    handleClick={() => this.clearFilters()} 
                    tagid={this.clearFiltersKey} 
                    data={{name: 'All Work'}} 
                    active={this.state.currentFilter === this.clearFiltersKey}
                    activeClass={styles.active} />
                    {
                        Object.keys(this.state.filters).map((key) => {
                            if(this.state.filters[key].count !== 0) {
                                return (
                                    <ProjectTag 
                                        key={key} 
                                        handleClick={() => this.handleClick(key)} 
                                        tagid={this.state.filters[key].id} 
                                        data={this.state.filters[key]} 
                                        active={this.state.currentFilter === key}
                                        activeClass={styles.active}/>
                                )
                            }
                            else {
                                return null;
                            }
                        })
                    }
                </ul>
        )
    }    
}

export default CategoryFilters;