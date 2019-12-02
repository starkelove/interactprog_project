import { base } from '../base'
import ObservableModel from "./ObservableModel";

class Model extends ObservableModel{
  constructor() {
    super();
    this._observers = [];
    this._items = [];
    this._cart = this.setCart();
    this._num_items = this.setNumItems();
  }

  setCart() {
    console.log("setCart");
    let cart = window.localStorage.getItem('cart');
    console.log(cart);
    if(cart != undefined && cart != null && cart != []) {
      console.log("not undefined, null or []", cart)
      return JSON.parse(cart);
    }
    else {
      return {};
    }
  }

  emptyCart() {
    window.localStorage.removeItem('cart');
    this._cart = {};
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

  returnRecentlyBought(items, selectedProduct) {
    let recently_bought = [];
    let i = 0;

    console.log("in recently bought ", selectedProduct)

    //Go through object and add to array
    Object.keys(items).forEach(key => {
      recently_bought[i] = items[key];
      i++;
    });

    //Sort array so that top results are present
    recently_bought.sort(function(a, b) {
      return b.boughttime - a.boughttime;
    })

    return recently_bought;
  } 

  enoughInStorage(item) {
    if(((item.id in this._cart) && (item.quant > this._cart[item.id].amount)) || (!(item.id in this._cart) && item.quant > 0)) {
        return true;
    }
  }

  enoughItemsInStorage() {
    let outOfStock = [];
    Object.keys(this._cart).forEach(key => {
      console.log("quantity: " + this._cart[key].item.quant + ", amount: " + this._cart[key].amount);
      if(key == "hokusaiprint") {
        this._cart[key].item.quant = 1;
      }
      if(this._cart[key].item.quant < this._cart[key].amount) {
        this._cart[key].amount = this._cart[key].item.quant;
        outOfStock.push(this._cart[key].item);
      }
    });
    return outOfStock;
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
    });
  }

  async updateBoughtTime() {
    Object.keys(this._cart).forEach(key => {
      let object = this._cart[key]
      if(object.amount > 0) {
        let bought_time = new Date().getTime();
        console.log("boughttime " + bought_time + " for item " + object.item.id);
        base.update(`products/${object.item.id}`, {
          data: {
          boughttime: bought_time
          }
        })
      }
    });
  }

  removeAll(item) {
    if(item.id in this._cart) {
      this._num_items -=  this._cart[item.id].amount;
      this._cart[item.id].amount = 0;
    }
    else {
      console.log("error, this item is not in the cart");
    }
    window.localStorage.setItem('cart', JSON.stringify(this._cart));
    this.notifyObservers();
    this.printDatabase();
  }

  addToCart(item) {
    this.assert(item != undefined);
    let approved = this.enoughInStorage(item);
    if(approved) {
      this.add(item);
    //  alert(item.name + " is added to the cart");
      console.log(this._cart);
    }
    else {
    //  alert(item.name + " could not be added to the cart");
    }
    this.printDatabase();
  }

  removeFromCart(item) {
    this.assert(item != undefined);
    if(this._cart[item.id].amount == 0) {
      return;
    }
    this.remove(item);
    console.log(this._cart);
    this.printDatabase();
    }

    async updateDatabase() {
      Object.keys(this._cart).forEach(key => {

        console.log("quantity: " + this._cart[key].item.quant + ", amount: " + this._cart[key].amount);
        this.assert((this._cart[key].item.quant - this._cart[key].amount) >= 0)
        base.update(`products/${key}`, {
          data: {
          quant: this._cart[key].item.quant - this._cart[key].amount
          }
        }).catch(err => {
          console.log("error");
        });

    });
    console.log("after:");
    this.printDatabase();

    }

    printDatabase() {
      this.getAllItems()
      .then((items) => {
        items.forEach(item => {
          console.log("id: " + item.id + " quant: " + item.quant);
        });
      })
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

  assert(condition, message) {
    if (!condition) {
        throw message || "condition is " + condition;
    }
  }
}

// Export an instance of Model
const model = new Model();
export default model;
