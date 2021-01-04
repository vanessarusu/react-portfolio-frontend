import React from 'react';
import styles from './About.module.scss';
import squiggle from '../../img/squiggle.svg';
import * as endpoints from '../../global/endpoints';
import { Link } from "react-router-dom";
import SocialLinks from '../SocialLinks';
import ImageBlurOnLoad from '../../global/ImageBlurOnLoad';

// tood: refactor this to be reusable?
const BlurredUpImage = () => {
  const [src, { blur }] = ImageBlurOnLoad(
    "https://vanessarusu.com/vanessarusu21/wp-content/uploads/2019/01/about-vanessa-rusu-tiny.jpg",
    "https://vanessarusu.com/vanessarusu21/wp-content/uploads/2020/12/about-vanessa-rusu.jpg"
  );

  return (
    <img
      src={src}
      style={{
        filter: blur
          ? "blur(8px)"
          : "none",
        transition: blur
          ? "none"
          : "filter .5s ease-in-out"
      }}
      alt="portrait of studio owner Vanessa Rusu sitting on couch smiling at camera"
    />
  )
}


class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false
        }
    }

    componentDidMount() {   
      document.title = `${endpoints.ABOUT_PAGE_TITLE_PARTIAL + endpoints.PAGE_TITLE_CONSTANT}`;     
    
        Promise.all([
          fetch(endpoints.POSTS_BY_ID(endpoints.ABOUT_PAGE))
        ])
        .then(res => Promise.all(res.map(x => x.json())))
        .then((values) => {
            this.setState({data: values[0]});
        });
    }

    render() {
        const hasData = this.state.data;

        if (!hasData) {
            return null;
        }
        
        return (
            <article className={styles.aboutContainer}>
                <div className={styles.imageContainer}>
                    <BlurredUpImage />
                </div>
                <div className={styles.contentContainer}>
                    <h1>{this.state.data.title.rendered}</h1>
                    <img className={styles.squiggle} src={squiggle} alt="squiggle"></img>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: this.state.data.content.rendered}}></div>
                    <div className={styles.aboutCTA}>
                        <SocialLinks />
                        <Link to={endpoints.CONNECT_PAGE_LINK.link} className={styles.button}>Let's work together</Link>
                    </div>
                </div>
            </article>
        )
    }    
}

export default About;