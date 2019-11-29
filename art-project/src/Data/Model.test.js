import model from "./Model.js";


  describe("Model test", () => {
    let modelboi = null;
    let allItems = null;

    beforeEach(async () => {
      modelboi = model;
      allItems = await modelboi.getAllItems();
    });

    it("can add to shopping cart", async () => {
        modelboi.addToCart(allItems[9]);
        modelboi.addToCart(allItems[6]);
        modelboi.assert(Object.keys(modelboi._cart).length == 2);
    });
});
