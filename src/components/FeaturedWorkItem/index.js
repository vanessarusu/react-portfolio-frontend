import React from 'react';
import styles from './FeaturedWorkItem.module.scss';
import { Link } from 'react-router-dom';

class FeaturedWorkItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            columns: props.columns,
            mounted: false,
        }
    }

    componentWillReceiveProps(nextprops) {
        this.setState({mounted: false});
        setTimeout(() => {
            this.setState({
                mounted: true,
               })
       }, 50)
    }

    componentDidMount() {
        setTimeout(() => {
             this.setState({
                 mounted: true,
                })
        }, 50)
       
    }

    hoverFunction = (e) => {
        let currentState = this.state.hover;
        currentState = !currentState;

        this.setState({
            hover: currentState,
        })
    }

    render() {

        const className = styles['columns-'+this.props.columns];

        if (this.props.data.length === 0) {
            return null;
        }

        const data = this.props.data;
        const themeBlackColorRef = window.getComputedStyle(document.documentElement).getPropertyValue("--brand-black");
        const hoverOpacity = 0.95;
        const urlString = `/work/${data.slug}`;
        const colorTernary = `${data.acf.project_light_hover_description ? 'white' : themeBlackColorRef }`;
        
        return (     
            <div 
            className={`${this.state.hover ? styles.hoverActive : ''} ${styles.gridItem} ${className} ${this.state.mounted ? styles.mounted : styles.unmounted}`} 
            onMouseEnter={this.hoverFunction} 
            onFocus={this.hoverFunction} 
            onBlur={this.hoverFunction} 
            onMouseLeave={this.hoverFunction}>
                <Link to={{pathname: urlString}}>
                    <h3 className="sr-only">{data.title.rendered}</h3>
                    <figure>
                        <div className={styles.imageContainer}>
                            <img src={data._embedded['wp:featuredmedia']['0'].source_url} alt={data._embedded['wp:featuredmedia']['0'].alt_text} />
                        </div>
                        <figcaption className={styles.itemCaptionContainer}>
                            <div className={`${styles.itemCaption} ${data.acf.project_dark_hover_title ? styles.darkHover : '' }`}>
                                <p className={styles.itemTitle} aria-hidden="true">{data.title.rendered}</p>
                                <p className={styles.itemCategories}>{data.acf.project_categories}</p>
                                <p className={styles.itemSubtext} style={{color: `${data.acf.project_light_hover_description ? 'white' : themeBlackColorRef }`}}>{data.acf.project_excerpt}</p>
                                <p role="button" className={styles.button} style={{color: colorTernary, borderColor: colorTernary, '--hover': colorTernary}}>View Project</p>
                            </div>
                            <span className={styles.itemHoverBackground}
                                style={{background: data.acf.project_primary_color, opacity: this.state.hover ? hoverOpacity : 0}}></span>
                        </figcaption>
                    </figure>
                </Link>
            </div>
        )
    }    
}

export default FeaturedWorkItem;