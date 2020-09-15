import Api from './api';

const RatingService = {
  show: (name) => Api.get(`/ratings/${name}`),
  create: (store, rating) => Api.post('/ratings', { store: store, rating: rating} ),
}

export default RatingService;