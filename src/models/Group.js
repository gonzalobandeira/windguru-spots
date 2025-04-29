// Group model to represent a collection of spots
export default class Group {
  constructor(id, name, order = 0) {
    this.id = id;
    this.name = name;
    this.order = order;
    this.createdAt = new Date().toISOString();
  }
} 