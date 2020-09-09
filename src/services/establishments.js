import GoogleService from './google';

const EstablishmentsService = {
  index: (latitude, longitude) => GoogleService.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=cafeteria&location=-${latitude},${longitude}&key=AIzaSyAriO9z5tX1tht7YomsgWyC9BNpWMT599w`),
}

export default EstablishmentsService;