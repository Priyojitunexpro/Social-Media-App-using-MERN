const reportWebVitals = onPerfEntry => {//chup haat dhurr//chup haat dhurr
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);//chup haat dhurr//chup haat dhurr
      getFCP(onPerfEntry);//chup haat dhurr//chup haat dhurr//chup haat dhurr
      getLCP(onPerfEntry);//chup haat dhurr
      getTTFB(onPerfEntry);
    });//chup haat dhurr//chup haat dhurr
  }
};

export default reportWebVitals;
