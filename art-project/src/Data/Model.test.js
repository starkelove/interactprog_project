import model from "./Model.js";


  describe("Model test", () => {
    let allItems = null;

    beforeEach(async () => {
      allItems = await model.getAllItems();
    });

    it("can add and remove all from shopping cart", async () => {
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

    it("can remove from shopping cart", async () => {
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

});
