import { base } from '../base'

class Model {
  constructor() {
    this._observers = [];
    this._items = [];
    this._cart = {};
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

  enoughInStorage(Item) {
    if(Item.quant > 0) {
      return true;
    }

}
  add(Item) {
    if(Item.id in this._cart) {
      this._cart[Item.id].amount++;
    }
    else {
      this._cart[Item.id] = {item: Item, amount: 1};
    }
  }

  addToCart(Item) {
    this.assert(Item != undefined);
    let approved = this.enoughInStorage(Item);
    if(approved) {
      base.update(`products/${Item.id}`, {
        data: {
        quant: Item.quant - 1
        }
      }
      ).then(() => {
        this.add(Item);
        console.log(this._cart);
      }).catch(err => {
        console.log("error");
      });
    }
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
  //  console.log(this.items);

    return this.items;
  }

  async getItem(id) {
    let result = await base.fetch(`products/${id}`, {
      context: this,
      asArray: false
    }).then(data => {
      return data;
    }).catch(error => {
      //handle error
    })
    return result;
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
