import { base } from '../base'
import { throwStatement } from '@babel/types';

class Model {
  constructor() {
    this._observers = [];
    this._items = [];
    this._cart = this.setCart();
    this._num_items = this.setNumItems();
  }

  setCart() {
    console.log("setCart");
    let cart = window.localStorage.getItem('cart');
    console.log(cart);
    if(cart != undefined || null) {
      console.log("null", cart)
      return JSON.parse(cart);
    }
    else {
      return {};
    }
  }

  emptyCart() {
    window.localStorage.removeItem('cart');
    this._cart = []
    this._num_items = 0;
    this.notifyObservers();
  }

  setNumItems() {
   let num_items = 0;
    if(this._cart !== undefined) {
      Object.keys(this._cart).forEach(key => {
        num_items += this._cart[key].amount;
        console.log(this._cart[key].amount)
      });
    } else {
      num_items = 0;
    }
    return num_items 
  }

  getNumItems() {
    return this._num_items;
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

  returnRelated(related){
    let arr = [];
    let i = 0;

    //Go through object and add to array
    Object.keys(related).forEach(key => {
      arr[i] = related[key];
      i++;
    });
    //Sort array so that top results are present
    arr.sort(function(a, b) { 
      return b.bought - a.bought;
    })

    //Only get the top three results
    if(arr.length > 3){
      arr = arr.slice(0,3);
    }
    return arr;
  }

  returnPopularity(poplist){

    poplist.sort(function(a, b) { 
      return b.popularity - a.popularity;
    })

    return poplist;
  }

  enoughInStorage(Item) {
    if(Item.quant > 0) {
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
    this._num_items++;
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
    this._num_items--;
    this.notifyObservers();
  }

  async updatePopularity() {
    let ogList = this.getAllItems().then((list)=>{
      list.map(item =>{
        

        let temp = item.id;

        if(this._cart[temp] != undefined){
          
          base.update(`products/${temp}`, {
            data: {
            popularity: item.popularity + 1
            }
          })
        }
      
      })
    }
    
    );

  }

  updateTransactions(transactions){
    base.push('transactions/',{
      data: {transactions},
    }
    )
  }

  async fetchTransactions(){
    let result = await base.fetch('transactions', {
      context: this,
      asArray: true
    }).then(data => {
      return data;
    }).catch(error => {
      //handle error
    })

    this.items = await result;

    return this.items;
  
  }

  removeAll(item) {

    base.update(`products/${item.id}`, {
      data: {
      quant: item.quant + this._cart[item.id].amount
      }
    }).then(() => {
      if(item.id in this._cart) {
        this._num_items -=  this._cart[item.id].amount;
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
    if(this._cart[item.id].amount == 0) {
      return;
    }
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
    let result = await base.fetch('products', {
      context: this,
      asArray: true
    }).then(data => {
      return data;
    }).catch(error => {
      //handle error
    })

    this.items = await result;

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
