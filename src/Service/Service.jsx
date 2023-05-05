import axios from "axios";

const API_KEY = '34376110-cefa88372a41c1ddd5a6e8bb5';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImage = async (query, page) => {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  };

  const response = await axios.get('/', { params })
  return response.data
}