
export const postRequest = (path: string, body: any) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(body);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    return fetch(path, requestOptions);
}