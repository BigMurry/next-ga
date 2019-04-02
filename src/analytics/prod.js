import ReactGA from "react-ga";

const IS_BROWSER = typeof window !== "undefined";

const QS_KEY = {
  'utm_source': 'campaignSource',
  'utm_medium': 'campaignMedium',
  'utm_campaign': 'campaignName',
  'utm_term': 'campaignKeyword',
  'utm_content': 'campaignContent'
};

const UTM_KEY_NAME = 'utmKeys';

export function init(code) {
  if (IS_BROWSER && !window.GA_INITIALIZED && code) {
    ReactGA.initialize(code);
  }
}

export function pageview() {
  let campStr = '';
  window.location.search
    .replace(/^\?/, '')
    .split('&')
    .map(item => {
      const [key, value] = item.split('=');
      if (QS_KEY.hasOwnProperty(key)) {
        const newKey = QS_KEY[key];
        ReactGA.set({[newKey]: value});
        campStr += `${newKey}=${value}&`;
      }
    });
  campStr = campStr.replace(/&$/, '');
  if (campStr) {
    try {
      window.sessionStorage.setItem(UTM_KEY_NAME, campStr);
    } catch (e) {}
  }
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export function event(category = "", action = "", label = '', value = '') {
  if (category && action) {
    ReactGA.event({ category, action, label, value });
  }
}

export function exception(description = "", fatal = false) {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
}
