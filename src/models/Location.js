// Location model to represent a sailing/surf spot
export default class Location {
  constructor(id, name, spotId, modelId = '100', params = "WINDSPD,GUST,SMER,TMPE,FLHGT,CDC,APCP1s,RATING") {
    this.id = id;
    this.name = name;
    this.spotId = spotId;
    this.modelId = modelId;
    this.params = params;
    this.createdAt = new Date().toISOString();
  }
}
