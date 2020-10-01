import Api from './api';

const GoogleEstablishmentService = {
  index: (place_id) => Api.get(`/google_stores/${place_id}`),
}

export default GoogleEstablishmentService;