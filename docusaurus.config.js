// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Komashi Docs',
  tagline: 'Official documentation for the Komashi platform',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://komashi-com.github.io',
  baseUrl: '/komashi-docs/',
  trailingSlash: false,

  organizationName: 'komashi-com',
  projectName: 'komashi-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // docs legyen a root
          editUrl: 'https://github.com/komashi-com/komashi-docs/tree/main/',
        },
        blog: false, // kikapcsolva (doksi site)
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: { respectPrefersColorScheme: true },

    navbar: {
      title: 'Komashi',
      logo: {
        alt: 'Komashi Logo',
        src: 'img/favicon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/komashi-com/komashi-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{ label: 'Introduction', to: '/' }],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/komashi-com/komashi-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Komashi.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;