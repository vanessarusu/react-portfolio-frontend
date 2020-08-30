// export const API_BASE = "http://localhost:8888/react-portfolio/wp/wp-json/wp/v2/";
export const DOMAIN = 'https://vanessasink.com/wp/';
export const API_BASE = DOMAIN + 'wp-json/wp/v2/';
export const ALL_POSTS = API_BASE+'posts/?per_page=100';


export const POSTS_BY_CAT = (ids) => {
    return `${API_BASE}posts/?categories=${[ids]}&_embed=true`;
};


export const POSTS_BY_ID = (id) => {
    return `${API_BASE}posts/${id}?&_embed=true`;
};

export const PAGE_BY_ID = (id) => {
    return `${API_BASE}pages/${id}?&_embed=true`;
};



export const POSTS_BY_SLUG = (slug) => {
    return `${API_BASE}posts?slug=${slug}`;
};

export const CONTACT_FORM = () => {
    return `${DOMAIN}wp-json/contact-form-7/v1/contact-forms/324/feedback`;
}
export const ALL_PAGES = API_BASE+'pages/?per_page=100';


// category ids

export const FEATURED_WORK = '4';
export const THREE_KINGS = '5';
export const ALL_WORK = '6';
export const SERVICES_POSTS = '7';
export const NOTIFICATION_TOPBAR = '8';
export const TESTIMONIALS_CAT = '11';

// posts
export const SPECIFICS_LIST = '143';
export const BRAND_AUDIT_OPTIN = '595';
export const PRIVACY_POLICY = '605';

export const ABOUT_PAGE = '245';
export const WORK_PAGE_COPY = 'the-work';
export const BRAND_GALLERY = '86';

export const SERVICES_PAGE = '352';



export const INSTAGRAM_HREF='https://www.instagram.com/vanessas.ink';
export const LINKEDIN_HREF = 'https://www.linkedin.com/in/vanessarusu/';
export const DRIBBLE_HREF = 'https://dribbble.com/vanessarusu';
export const GITHUB_HREF = 'https://github.com/vanessarusu';
export const CONTACT_EMAIL = 'vanessarusu@gmail.com';

// ROUTES AND NAVIGATION

export const PRIVACY_POLICY_PAGE = {
    name: 'Privacy Policy',
    link: '/privacy-policy'
}
export const HOME_PAGE_LINK = {
    name: 'Home',
    link: '/'
}
export const WORK_PAGE_LINK = {
    name: 'Work',
    link: '/work'
}

export const SERVICES_PAGE_LINK = {
    name: 'Services',
    link: '/services'
}

export const ABOUT_PAGE_LINK = {
    name: 'About',
    link: '/about'
}

export const CONNECT_PAGE_LINK = {
    name: 'Connect',
    link: '/get-in-touch'
}

export const SITE_NAVIGATION = [
    HOME_PAGE_LINK,
    WORK_PAGE_LINK,
    SERVICES_PAGE_LINK,
    ABOUT_PAGE_LINK,
    CONNECT_PAGE_LINK
];