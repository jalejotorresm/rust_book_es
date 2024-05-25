// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "El Libro de Rust (version Compacta)",
  tagline:
    "Traduccion al español del libro The Rust Book (Abridged), escrito por Jason Walton.",
  favicon: "img/ferris.png",

  // Set the production url of your site here
  url: "https://jalejotorresm.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/rust_book_es/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "jalejotorresm", // Usually your GitHub org/user name.
  projectName: "rust_book_es", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/proyecto-social-card.png",
      navbar: {
        title: "El Libro de Rust (version Compacta)",
        logo: {
          alt: "My Site Logo",
          src: "img/ferris.png",
        },
        items: [
          {
            href: "https://github.com/jalejotorresm/rust_book_es",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            label: "Discord",
            href: "https://discordapp.com/users/jalejotorresm",
          },
          {
            label: "X",
            href: "https://x.com/jalejotorresm",
          },
          {
            label: "GitHub",
            href: "https://github.com/jalejotorresm",
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Julian Alejandro Torres Morales. Hecho con Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["rust"],
      },
    }),
};

export default config;
