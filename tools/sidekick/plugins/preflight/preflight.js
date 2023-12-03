/* eslint-disable no-undef, no-unused-vars */
import { Sa11y, Lang } from './lib/sa11y.js';
import Sa11yLangEn from './lib/sa11y.lang.en.js';
import { loadCSS } from '../../../../scripts/aem.js';

const initPreflightChecks = async (shouldActivateA11yMode) => {
  if (shouldActivateA11yMode) {
    await loadCSS(`${window.hlx.codeBasePath}/tools/sidekick/plugins/preflight/lib/sa11y.css`);

    Lang.addI18n(Sa11yLangEn.strings);

    const sa11y = new Sa11y({
      checkRoot: 'main',
      readabilityRoot: 'main',
    });

    sa11y.resetAll();
  } else {
    const html = document.querySelector('html');
    html.removeAttribute('data-sa11y-theme');
    html.removeAttribute('data-sa11y-active');
    const elementsToRemove = [
      'sa11y-control-panel',
      'sa11y-tooltips',
      'sa11y-dismiss-tooltip',
      '#sa11y-colour-filters',
      'sa11y-heading-label',
      'sa11y-heading-anchor',
      'sa11y-annotation',
    ];

    [...elementsToRemove].forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      [...elements].forEach((element) => {
        element.remove();
      });
    });

    const attributesToRemove = [
      'data-sa11y-error',
      'data-sa11y-warning-inline',
    ];
  }
};

export default initPreflightChecks;
