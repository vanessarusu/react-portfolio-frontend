import React from 'react';
import styles from './SinglePortfolio.module.scss';
import ContactCTA from '../ContactCTA';
import * as endpoints from '../../global/endpoints';



class SinglePortfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolio: false,
            tags: false,
            categoryNames: false
        }
    }

    componentDidMount() {
        const slug = this.props.match.params.client;
        let tagIDs = [];
        let tagNames = [];
        let categoryIDS = [];
        let categoryNames = [];
        
    
        Promise.all([
          // portfolio data
          fetch(endpoints.POSTS_BY_SLUG(slug)),
        ])
        .then(res => Promise.all(res.map(x => x.json())))
        .then((values) => {
            this.setState({portfolio: values[0][0]});
            tagIDs = values[0][0].tags;
            categoryIDS = values[0][0].categories;
            document.title = this.state.portfolio.title.rendered + ' — ' +this.state.portfolio.acf.project_categories + endpoints.PAGE_TITLE_CONSTANT;
        })
        .then(() => {
            tagIDs.forEach((el) => {
                Promise.all([
                    fetch(endpoints.TAG_BY_ID(el))
                ])
                .then(res => Promise.all(res.map(x => x.json())))
                .then((values) => {
                    tagNames.push(values[0]);
                    this.setState({ tags: tagNames})
                })
                
            })
            categoryIDS.forEach((el) => {
                Promise.all([
                    fetch(endpoints.CATEGORY_BY_ID(el))
                ])
                .then(res => Promise.all(res.map(x => x.json())))
                .then((values) => {
                    if(values[0].parent == endpoints.ALL_WORK) {
                        categoryNames.push(values[0]);
                        this.setState({ categoryNames: categoryNames})
                    }
                    
                })
            })
        })
      }


    render() {
        const hasData = this.state.portfolio;
        const portfolio = this.state.portfolio;

        if (!hasData) {
            return null;
        }
        
        return (
            <>
                <article className={styles.portfolioContainer}>
                    <div className={styles.heroImageContainer}>
                    <img src={portfolio.acf.post_single_hero_image} alt={portfolio.title.rendered}/>
                    </div>
                    <div className={styles.portfolioInfoPanel} style={{background: portfolio.acf.project_primary_color}}>
                        <div className={styles.container} style={{color: portfolio.acf.body_text_color || 'white'}}>
                            <div className={styles.infoPanelContent}>
                                <h1>{portfolio.title.rendered}</h1>
                                { this.state.categoryNames ? 
                                    (<>
                                    <ul className={styles.categoryContainer}>
                                    {
                                        Object.keys(this.state.categoryNames).map((key) => {
                                            return (
                                                <li key={key} className={styles.category}>
                                                    {this.state.categoryNames[key].name}
                                                </li>)
                                        })
                                    }
                                </ul>
                                </>) : ''}
                                <div dangerouslySetInnerHTML={{ __html: portfolio.acf.solution_overview }}></div>
                            </div>
                            <div className={styles.infoPanelAside}>
                                <p className={styles.label}>project description:</p>
                                <p className={styles.callout}>{portfolio.acf.project_excerpt}</p>

                                { portfolio.tags.length ? 
                                    (<><p className={styles.label}>this project included:</p>
                                    <ul className={styles.tags}>
                                    {
                                        Object.keys(this.state.tags).map((key) => {
                                            return (
                                                <li key={key} className={styles.link}>
                                                    <span style={{color: portfolio.acf.link_color}}>{this.state.tags[key].name}, </span>
                                                </li>)
                                        })
                                    }
                                </ul>
                                </>) : ''}
                            

                                    { portfolio.acf.website.length ? 
                                    (<><p className={styles.label}>website:</p>
                                <a href={'https://'+portfolio.acf.website} target="blank" rel="noopener noreferrer" style={{color: portfolio.acf.link_color}}>{portfolio.acf.website}</a></>) : ''}
                            </div>
                        </div>
                    </div>
                    <div className={styles.portfolioContent} dangerouslySetInnerHTML={{ __html: portfolio.content.rendered }}></div>
                    <ContactCTA />
                </article>
            </>
        )
    }    
}

export default SinglePortfolio;