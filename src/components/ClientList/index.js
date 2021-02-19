import React from 'react';
import styles from './ClientList.module.scss';
import * as endpoints from '../../global/endpoints';


class ClientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brandGallery: false
        }
    }

    componentDidMount() {        
    
        Promise.all([
          // client logo gallery
          fetch(endpoints.PAGE_BY_ID(endpoints.BRAND_GALLERY)),
        ])
        .then(res => Promise.all(res.map(x => x.json())))
        .then((values) => {
            this.setState(
                {
                    brandGallery: values[0],
                }
            );
        });
      }


    render() {
        const hasData = this.state.brandGallery;
        if (!hasData) {
            return null;
        }
        
        return (
            <>
            <section className={styles.clientListContainer}>
                <h2 className="sr-only">Client List</h2>
                <span aria-hidden="true" className={styles.meta}>Client list</span>
                <div role="presentation" className={styles.galleryContainer} dangerouslySetInnerHTML={{__html: this.state.brandGallery.content.rendered}}></div>
            </section>
            </>
            
        )
    }    
}

export default ClientList;