import React from 'react';
import styles from './FeaturedWorkItem.module.scss';
import { Link } from 'react-router-dom';

class FeaturedWorkItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            columns: props.columns
        }
    }
    hoverFunction = (e) => {
        let currentState = this.state.hover;
        currentState = !currentState;

        this.setState({
            hover: currentState
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
        
        return (
                <div className={`${this.state.hover ? styles.hoverActive : ''} ${styles.gridItem} ${className}`} onMouseEnter={this.hoverFunction} onMouseLeave={this.hoverFunction}>
                    <h3 className="sr-only">{data.title.rendered}</h3>
                    <Link to={{pathname: urlString}}>
                        <figure>
                            <div className={styles.imageContainer}>
                                <img src={data._embedded['wp:featuredmedia']['0'].source_url} alt={`${data.title.rendered} - ${data.acf.categories}`} />
                            </div>
                            <figcaption className={styles.itemCaptionContainer}>
                                <div className={`${styles.itemCaption} ${data.acf.dark_hover_title ? styles.darkHover : '' }`}>
                                    <p className={styles.itemTitle}>{data.title.rendered}</p>
                                    <p className={styles.itemCategories}>{data.acf.categories}</p>
                                    <p className={styles.itemSubtext} style={{color: `${data.acf.light_hover_description ? 'white' : themeBlackColorRef }`}}>{data.acf.subtext}</p>
                                </div>
                                <span className={styles.itemHoverBackground}
                                    style={{background: data.acf.custom_primary_color, opacity: this.state.hover ? hoverOpacity : 0}}></span>
                            </figcaption>
                        </figure>
                    </Link>
                </div>
            
        )
    }    
}

export default FeaturedWorkItem;