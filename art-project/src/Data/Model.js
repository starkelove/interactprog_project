import { base } from '../base'

class Model {
  constructor() {
    this._observers = [];
    this._items = [];
    this._cart = this.setCart();
  }

  setCart() {
    console.log("setCart");
    let cart = window.localStorage.getItem('cart');
    console.log(cart);
    if(cart != undefined) {
      return JSON.parse(cart);
    }
    else {
      return {};
    }
  }
  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers.splice(this._observers.indexOf(observer));
  }

  notifyObservers(){
    console.log("notifyObservers");
    for(var i = 0; i < this._observers.length; i++) {
      this._observers[i].update();
    }
  }

  enoughInStorage(item) {
    if(item.quant > 0) {
      return true;
    }

}
  add(item) {
    if(item.id in this._cart) {
      this._cart[item.id].item = item;
      this._cart[item.id].amount++;
    }
    else {
      this._cart[item.id] = {item: item, amount: 1};
    }
    window.localStorage.setItem('cart', JSON.stringify(this._cart));
    this.notifyObservers();
  }

  remove(item) {
    if(item.id in this._cart) {
      this._cart[item.id].item = item;
      this._cart[item.id].amount--;
    }
    else {
      console.log("no such item in cart");
    }
    window.localStorage.setItem('cart', JSON.stringify(this._cart));
    this.notifyObservers();
  }

  removeAll(item) {

    base.update(`products/${item.id}`, {
      data: {
      quant: item.quant + this._cart[item.id].amount
      }
    }).then(() => {
      if(item.id in this._cart) {
        this._cart[item.id].amount = 0;
      }
      else {
        console.log("error, this item is not in the cart");
      }
      window.localStorage.setItem('cart', JSON.stringify(this._cart));
      this.notifyObservers();

    }).catch(err => {
      console.log("error");
    });
    this.printDatabase();
  }

  adjustAmount(type, id) {
    if(id in this._cart) {
      switch (type) {
        case "add":
          let item = this.getItem(id)
          .then((item) => {
            this.addToCart(item);
          })
          .err(console.log);

          break;
        case "remove":
          if(this._cart[id].amount == 0) {
            break;
          }
          this._cart[id].amount--;
          break;
        default:
        console.log("didn't pass add or remove as parameter");
      }
    }
    else {
      console.log("error, this item is not in the cart");
    }
    window.localStorage.setItem('cart', JSON.stringify(this._cart));
    this.notifyObservers();
  }

  addToCart(item) {
    this.assert(item != undefined);
    let approved = this.enoughInStorage(item);
    if(approved) {
      base.update(`products/${item.id}`, {
        data: {
        quant: item.quant - 1
        }
      }
      ).then(() => {
        this.add(item);
        console.log(this._cart);
      }).catch(err => {
        console.log("error");
      });
    }
    this.printDatabase();
  }

  removeFromCart(item) {
    this.assert(item != undefined);
    base.update(`products/${item.id}`, {
      data: {
      quant: item.quant + 1
      }
    }).then(() => {
      this.remove(item);

      console.log(this._cart);
    }).catch(err => {
      console.log("error");
    });
    this.printDatabase();
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

  printDatabase() {
    this.getAllItems()
    .then((items) => {
      items.forEach(item => {
        console.log("id: " + item.id + " quant: " + item.quant);
      });
    })
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
