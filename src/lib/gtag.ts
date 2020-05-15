export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID as string;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  name,
  category,
  label,
  value,
}: {
  name: string;
  category?: string;
  label?: string;
  value?: number;
}): void => {
  window.gtag('event', name, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    event_category: category,
    // eslint-disable-next-line @typescript-eslint/camelcase
    event_label: label,
    value: value,
  });
};
