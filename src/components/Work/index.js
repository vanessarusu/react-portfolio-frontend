import React from 'react';
import styles from './Work.module.scss';
import ContactCTA from '../ContactCTA';
import squiggle from '../../img/squiggle.svg';
import FeaturedWorkGrid from '../FeaturedWorkGrid';
import ClientList from '../ClientList';
import * as endpoints from '../../global/endpoints';


class Work extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioGrid: false,
            workPageCopy: false
        }
    }

    componentDidMount() {       
    
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
                        workPageCopy: values[1][0]
                    }
                );
            document.title = 'Branding, Design, and Web Development Work';

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
                        <h2>{this.state.workPageCopy.title.rendered}</h2>
                        <img className={styles.squiggle} src={squiggle} alt="squiggle"></img>
                        <p dangerouslySetInnerHTML={{ __html: this.state.workPageCopy.content.rendered}}></p>
                    </div>
                    <FeaturedWorkGrid data={this.state.portfolioGrid} columns={2}/>
                </article>
                <ClientList />
                <ContactCTA />
                
            </>
            
        )
    }    
}

export default Work;