import React from 'react';
import styles from './Work.module.scss';
import ContactCTA from '../ContactCTA';
import squiggle from '../../img/squiggle.svg';
import FeaturedWorkGrid from '../FeaturedWorkGrid';
import ClientList from '../ClientList';
import * as endpoints from '../../global/endpoints';
import CategoryFilters from '../CategoryFilters';


class Work extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioGrid: false,
            workPageCopy: false,
            activeFilter: false
        }
    }

    handleSelection = (categoryId) => {
        this.setState({
            activeFilter: categoryId
        })
    }


    componentDidMount() {
        
        document.title = `${endpoints.WORK_PAGE_TITLE_PARTIAL + endpoints.PAGE_TITLE_CONSTANT}`;

    
        Promise.all([
          // portfolio data
          fetch(endpoints.POSTS_BY_CAT(endpoints.ALL_WORK)),
          fetch(endpoints.POSTS_BY_SLUG(endpoints.WORK_PAGE_COPY)),

        ])
        .then(res => Promise.all(res.map(x => x.json())))
        .then((values) => {
            this.setState(
                    {
                        portfolioGrid: values[0],
                        workPageCopy: values[1][0],
                    }
                );
        });
      }


    render() {
        const hasData = this.state.workPageCopy;
        if (!hasData) {
            return null;
        }
        
        return (
            <>
                <article className={styles.workContainer}>
                    <div className={styles.headerPanel}>
                        <h1>{this.state.workPageCopy.title.rendered}</h1>
                        <img className={styles.squiggle} src={squiggle} alt="squiggle"></img>
                        <p dangerouslySetInnerHTML={{ __html: this.state.workPageCopy.content.rendered}}></p>
                        <div className={styles.filters}>
                            <h3 className={styles.categoryHeadline}>Filter projects by area of support</h3>
                            <div className={styles.filterWrapper}>
                                <CategoryFilters handleSelection={this.handleSelection}/>
                            </div>
                        </div>
                    </div>
                    <FeaturedWorkGrid 
                        data={this.state.portfolioGrid} 
                        columns={2} 
                        activefilter={this.state.activeFilter}/>
                </article>
                <ClientList />
                <ContactCTA />
            </>
            
        )
    }    
}

export default Work;