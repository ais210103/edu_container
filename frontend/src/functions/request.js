function request(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const fetchData = await fetch(url);
      const datajson = await fetchData.json();
      resolve(datajson);
    } catch (error) {
      reject(error);
    }
  });
}

export default request;
