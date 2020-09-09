import GoogleService from './google';

const EstablishmentPhotoService = {
  index: (photo_reference) => GoogleService.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&sensor=false&key=AIzaSyAriO9z5tX1tht7YomsgWyC9BNpWMT599w`),
}

export default EstablishmentPhotoService;