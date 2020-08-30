import React from 'react';
import styles from './SinglePortfolio.module.scss';
import ContactCTA from '../ContactCTA';
import * as endpoints from '../../global/endpoints';



class SinglePortfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolio: false
        }
    }

    componentDidMount() {
        const slug = this.props.match.params.client;
        
    
        Promise.all([
          // portfolio data
          fetch(endpoints.POSTS_BY_SLUG(slug))
        ])
        .then(res => Promise.all(res.map(x => x.json())))
        .then((values) => {
            this.setState({portfolio: values[0][0]});
            document.title = this.state.portfolio.title.rendered + ' — ' +this.state.portfolio.acf.categories + ' by Vanessa Rusu';

        });
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
                    <div className={styles.portfolioInfoPanel} style={{background: portfolio.acf.custom_primary_color}}>
                        <div className={styles.container} style={{color: portfolio.acf.body_text_color || 'white'}}>
                            <div className={styles.infoPanelContent}>
                                <h1>{portfolio.title.rendered}</h1>
                                <h4>{portfolio.acf.categories}</h4>
                                <div dangerouslySetInnerHTML={{ __html: portfolio.acf.solution_overview }}></div>
                            </div>
                            <div className={styles.infoPanelAside}>
                                <p className={styles.label}>project description:</p>
                                <h4>{portfolio.acf.subtext}</h4>
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