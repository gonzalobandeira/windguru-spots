// Location model to represent a sailing/surf spot
import { DEFAULT_WINDGURU_PARAMS } from '../constants/Models';

export default class Location {
  constructor(id, name, spotId, modelId = '100', params = DEFAULT_WINDGURU_PARAMS, groupId = null) {
    this.id = id;
    this.name = name;
    this.spotId = spotId;
    this.modelId = modelId;
    this.params = params;
    this.groupId = groupId;
    this.createdAt = new Date().toISOString();
  }
}
