import React from 'react';
import ScrollToTop from '../ScrollToTop';
import Header from '../Header';
import About from '../About';
import Footer from '../Footer';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import NotFound from './NotFound';
import App from '../../App';
import SinglePortfolio from '../SinglePortfolio';
import Work from '../Work';
import Services from '../Services';
import GetInTouch from '../GetInTouch';
import PrivacyPolicy from '../PrivacyPolicy';
import * as endpoints from '../../global/endpoints';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
ReactGA.initialize('UA-36420843-2');
ReactGA.pageview(window.location.pathname + window.location.search);
history.listen((location, action) => {
    ReactGA.pageview(location.location.pathname + location.search);
});


console.log("%c \xa9 2020 Vanessa Rusu. info@vanessarusu.com :) ", "font-size: 16px; color: #ffb100; padding: 20px;")

const RouterComponent = () => (
    <BrowserRouter forceRefresh={true}>
        <ScrollToTop>
        <Header />
        <div className="body-container">
            <Switch>
                {/* will try the first route, then the second, then fallback */}
                <Route exact path={endpoints.HOME_PAGE_LINK.link} component={ App } />
                <Route path={`${endpoints.WORK_PAGE_LINK.link +"/:client"}`} component={ SinglePortfolio } />
                <Route path={endpoints.ABOUT_PAGE_LINK.link} component={ About } />
                <Route path={endpoints.WORK_PAGE_LINK.link} component={ Work } />
                <Route path={endpoints.SERVICES_PAGE_LINK.link} component={ Services } />
                <Route path={endpoints.PRIVACY_POLICY_PAGE.link} component={ PrivacyPolicy } />
                <Route path={endpoints.CONNECT_PAGE_LINK.link} component={ GetInTouch } />
                {/* <Route component={ NotFound } /> */}
                <Route component={ App } />
            </Switch>
        </div>
        <Footer />
        </ScrollToTop>
    </BrowserRouter>
);

export default RouterComponent