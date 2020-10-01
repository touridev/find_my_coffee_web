import Api from './api';

const StoreService = {
  index: (latitude, longitude) => Api.get('/stores', {params: {latitude: latitude, longitude: longitude}}),
}

export default StoreService;