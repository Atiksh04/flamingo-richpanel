import { getCLS, getFID, getLCP, getTTFB } from 'web-vitals';

const logMetric = (metric) => {
  console.log(`${metric.name}: ${metric.value}`);
};

export const reportWebVitals = () => {
  getCLS(logMetric);
  getFID(logMetric);
  getLCP(logMetric);
  getTTFB(logMetric);
};
