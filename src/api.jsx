const URL = 'https://rickandmortyapi.com/api';

export const request = url => fetch(`${URL}${url}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(
      `${response.status} ${response.statusText}`,
    );
  });
