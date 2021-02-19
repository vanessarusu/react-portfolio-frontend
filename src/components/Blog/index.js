import React from 'react';
import styles from './Blog.module.scss';
import squiggle from '../../img/squiggle.svg';
import * as endpoints from '../../global/endpoints';

import ImageBlurOnLoad from '../../global/ImageBlurOnLoad';

// tood: refactor this to be reusable?
const BlurredUpImage = () => {
  const [src, { blur }] = ImageBlurOnLoad(
    "https://vanessarusu.com/wvanessarusu21/wp-content/uploads/2020/12/vanessa-with-laptop-tiny.jpg",
    "https://vanessarusu.com/vanessarusu21/wp-content/uploads/2020/12/vanessa-with-laptop.jpg"
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


class Blog extends React.Component {

    componentDidMount() { 
      
      document.title = `${endpoints.BLOG_PAGE_TITLE_PARTIAL + endpoints.PAGE_TITLE_CONSTANT}`;
      
        // Promise.all([
        //   fetch(endpoints.BLOG_POSTS())
        // ])
        // .then(res => Promise.all(res.map(x => x.json())))
        // .then((values) => {
        // });
    }

    render() {
        return (
            <section className={styles.blog}>
                <div className={styles.container}>
                    <div className={styles.splashCopy}>
                        <h1>Coming soon</h1>
                        <img className={styles.squiggle} src={squiggle} alt="squiggle"></img>
                        <p>Stay tuned for my take on the <strong>fun side</strong> of css, html, &amp; WordPress</p>
                    </div>
                    <div className={styles.splashImage}>
                    <BlurredUpImage />
                    </div>
                </div>
            </section>
        )
    }    
}

export default Blog;