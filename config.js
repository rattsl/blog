'use strict';

module.exports = {
  url: 'https://rattsl.netlify.com',
  pathPrefix: '/',
  title: 'rattsl',
  subtitle:
    'rattslのブログです。',
  copyright: '© 2020 All rights reserved.',
  disqusShortname: '',
  postsPerPage: 4,
  googleAnalyticsId: 'UA-73379983-2',
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
      label: 'Contact me',
      path: '/pages/contacts'
    }
  ],
  author: {
    name: 'Hayato Kakiuchi',
    photo: '/myIcon.jpg',
    bio: '駆け出しのエンジニアです。感じたことなどをまとめて投稿します。',
    contacts: {
      email: 'uw.nobtotayah@gmail.com',
      twitter: 'rattsl',
      github: 'rattsl',
      facebook: 'rattsl'
    }
  }
};
