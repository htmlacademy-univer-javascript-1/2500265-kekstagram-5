import { makeAllPictures } from './draw-miniatures.js';
import {getData} from './api.js';
import { showingAlert } from './utils.js';

getData()
  .then((pictures) => makeAllPictures(pictures))
  .catch((error) => showingAlert(error.message));
