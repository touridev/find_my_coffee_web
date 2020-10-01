import GoogleService from './google';

const EstablishmentsService = {
  index: (latitude, longitude) => GoogleService.get(`/google_stores?latitude=${latitude}&longitude=${longitude}`),
}

export default EstablishmentsService;