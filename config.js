'use strict';

module.exports = {
  url: 'https://rattsl.netlify.app',
  pathPrefix: '/',
  title: 'rattsl',
  subtitle:
    'rattslのブログです。',
  copyright: '© 2020 All rights reserved.',
  disqusShortname: '',
  postsPerPage: 4,
  googleAnalyticsId: "process.env.GOOGLE_ANALYTICS_TRACKING_ID",
  useKatex: false,
  menu: [
    {
      label: 'Articles',
      path: '/'
    },
    {
      label: 'About me',
      path: '/pages/about'
    },
    {
      label: 'Portfolio',
      path: '/pages/contacts'
    }
  ],
  author: {
    name: 'rattsl',
    photo: '/myIcon.jpg',
    bio: 'creator',
    contacts: {
      email: 'uw.nobtotayah@gmail.com',
      twitter: 'rattsl',
      github: 'rattsl',
      facebook: 'rattsl'
    }
  }
};
