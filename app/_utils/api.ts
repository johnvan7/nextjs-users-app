
export const postRequest = (path: string, body: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(body);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(path, requestOptions)
      .then((res) => {
        res.json().then((json) => {
          if(res.ok){
            return resolve(json);
          } else {
            return reject(json);
          }
        })
        .catch(() => {
          return reject();
        });
      })
      .catch(() => {
        return reject();
      })
  });
}