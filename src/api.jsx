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

export const getCharacter = (page) => {
  return request(`/character/?page=${page}`);
}

export const getFiltredCharacter = (name, gender, status) => {
  return request(`/character/?name=${name}&gender=${gender}&status=${status}`);
}

export const getLocations = (page) => {
  return request(`/location/?page=${page}`);
}

export const getFiltredLocations = (name, type, dimension) => {
  return request(`/location/?name=${name}&type=${type}&dimension=${dimension}`);
}

export const getEpisodes = (page) => {
  return request(`/episode/?page=${page}`);
}

export const getFilteredEpisodes = (name) => {
  return request(`/episode/?name=${name}`);
}