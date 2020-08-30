import React from 'react';
import './App.scss';
import * as endpoints from './global/endpoints';
import ThreeKings from './components/ThreeKings';
import FeaturedWorkGrid from './components/FeaturedWorkGrid';
import HomepageHero from './components/HomepageHero';
import Testimonial from './components/Testimonial';
import InstagramFeed from './components/InstagramFeed';

class App extends React.Component {

  static propTypes = {
  };
  state = {
    featuredWork: [], 
    threeKings: [],
    specifics: [],
    brandAuditOptin: [],
    testimonials: []
  };

  componentDidMount() {
    document.title = 'Vanessa Rusu — a boutique visual design and front end development studio dedicated to helping entrepreneurs grow their business';

    Promise.all([
      // notification bar
      fetch(endpoints.POSTS_BY_CAT(endpoints.NOTIFICATION_TOPBAR)),
      // three callouts
      fetch(endpoints.POSTS_BY_CAT(endpoints.THREE_KINGS)),
      // specifics flyout
      fetch(endpoints.POSTS_BY_ID(endpoints.SPECIFICS_LIST)),
      // featured work
      fetch(endpoints.POSTS_BY_CAT(endpoints.FEATURED_WORK)),
      //  brand audit optin
      fetch(endpoints.POSTS_BY_ID(endpoints.BRAND_AUDIT_OPTIN)),

      fetch(endpoints.POSTS_BY_CAT(endpoints.TESTIMONIALS_CAT)),
    ])
    .then(res => Promise.all(res.map(x => x.json())))
    .then((values) => {
      this.setState({threeKings : values[1]});
      this.setState({specifics : values[2]});
      this.setState({featuredWork : values[3]});
      this.setState({brandAuditOptin : values[4]});
      this.setState({testimonials : values[5]});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
            <HomepageHero />
            <ThreeKings data={this.state.threeKings} flyoutData={this.state.specifics}/>
            <FeaturedWorkGrid data={this.state.featuredWork}/>
            <Testimonial data={this.state.testimonials[2]}/>
            <InstagramFeed />
        </div>
      </div>
    );
  }
}

export default App;
