import { base } from '../base'

class Model {
  constructor() {
    this._observers = [];
    this._currentItem = null;
    this._items = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers.splice(this._observers.indexOf(observer));
  }

  notifyObservers(){
    for(var i = 0; i < this._observers.length; i++) {
      this._observers[i].update();
    }
  }

  // Item or id or something else as input here?
  setCurrentItem(Item) {
    this._currentItem = Item;
  }

  getCurrentItem() {
    return this._currentItem;
  }

  async getAllItems() {
    // Idk, go through database and fetch all items and add to this._items
    let result = await base.fetch('products', {
      context: this,
      asArray: true
    }).then(data => {
      return data;
    }).catch(error => {
      //handle error
    })

    this.items = await result;
    console.log(this.items);

    return this.items;
  }

  getItem(Item) {
    // use this._items to get Item
  }


  assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
  }
}

// Export an instance of Model
const model = new Model();
export default model;
