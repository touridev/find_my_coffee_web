import axios from 'axios';

const GoogleService = axios.create({baseURL: "http://localhost:3001/api/v1"});

export default GoogleService;