import GoogleService from './google';

const EstablishmentsService = {
  index: (latitude, longitude) => GoogleService.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee+shop&location=-${latitude},${longitude}&radius=5000&key=AIzaSyAriO9z5tX1tht7YomsgWyC9BNpWMT599w`),
}

export default EstablishmentsService;