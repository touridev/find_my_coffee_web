import Api from './api';

const RatingService = {
  show: (google_place_id) => Api.get(`/ratings/${google_place_id}`),
  create: (store, rating) => Api.post('/ratings', { store: store, rating: rating} ),
}

export default RatingService;