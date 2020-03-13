'use strict';

module.exports = {
  url: 'https://lumen.netlify.com',
  pathPrefix: '/',
  title: 'Blog by John Doe',
  subtitle:
    'Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu.',
  copyright: '© All rights reserved.',
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
    bio: 'Web,iOS Engineer',
    contacts: {
      email: 'uw.nobtotayah@gmail.com',
      twitter: 'rattsl',
      github: 'rattsl',
      facebook: 'rattsl'
    }
  }
};
