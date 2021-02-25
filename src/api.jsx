const URL = 'https://rickandmortyapi.com/api';

export const request = url => fetch(`${URL}${url}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    // eslint-disable-next-line no-throw-literal
    throw `${response.status} - ${response.statusText}`;
    // throw new Error(
    //   console.log(`${response.status} ${response.statusText}`)
    // );
  });
