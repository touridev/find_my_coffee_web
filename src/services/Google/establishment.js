import GoogleService from './google';

const EstablishmentService = {
  index: (place_id) => GoogleService.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=AIzaSyAriO9z5tX1tht7YomsgWyC9BNpWMT599w`),
}

export default EstablishmentService;