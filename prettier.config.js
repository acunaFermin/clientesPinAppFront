import config from '../../.prettierrc.json' with { type: 'json' };

export default {
  ...config,
  tailwindStylesheet: './src/styles.scss',
};