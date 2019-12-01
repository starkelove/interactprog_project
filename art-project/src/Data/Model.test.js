import model from "./Model.js";
import { base } from '../base'


  describe("Model test", () => {
    let allItems = null;

    beforeEach(async () => {
      allItems = await model.getAllItems();
    });

    it("can add items and remove all items from shopping cart", async () => {
        model.addToCart(allItems[9]);
        model.addToCart(allItems[9]);
        model.addToCart(allItems[6]);
        model.assert(model._cart[allItems[9].id].amount == 2);
        model.assert(model._cart[allItems[6].id].amount == 1);
        model.removeAll(allItems[6]);
        model.removeAll(allItems[9]);
        model.assert(model._cart[allItems[9].id].amount == 0);
        model.assert(model._cart[allItems[6].id].amount == 0);
    });

    it("can remove specific item from shopping cart", async () => {
      model.assert(model._cart[allItems[9].id].amount == 0);
      model.assert(model._cart[allItems[6].id].amount == 0);
      model.addToCart(allItems[9]);
      model.addToCart(allItems[6]);
      model.assert(model._cart[allItems[9].id].amount == 1);
      model.assert(model._cart[allItems[6].id].amount == 1);
      model.removeFromCart(allItems[9]);
      model.removeFromCart(allItems[6]);
      model.assert(model._cart[allItems[9].id].amount == 0);
      model.assert(model._cart[allItems[6].id].amount == 0);
    });

    it("can update database", async () => {
      let prevQuant = allItems[0].quant;
      // add 2 items in cart
      model.addToCart(allItems[0]);
      model.addToCart(allItems[0]);
      // add 2 items in database
      await  model.updateDatabase();
      // fetch items in database
      allItems = await model.getAllItems();
      model.emptyCart();
      // assert that there are 2 less of that item in database
      model.assert(allItems[0].quant == prevQuant - 2);
      // reset database
      base.update(`products/${allItems[0].id}`, {
        data: {
        quant: prevQuant
        }
      }).catch(err => {
        console.log("could not reset database");
      });
    });

});
