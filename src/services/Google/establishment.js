import GoogleService from './google';

const EstablishmentService = {
  index: (place_id) => GoogleService.get(`/google_stores/${place_id}`),
}

export default EstablishmentService;