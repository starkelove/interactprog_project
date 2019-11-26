export class Transaction {
    constructor(details, tot_price, item_ids, num_items) {
        this.date = details.create_time;
        this.buyer = details.payer.name.given_name + " " + details.payer.name.surname;
        this.price = tot_price;
        this.item_ids = item_ids;
        this.num_items = num_items;
        this.id = details.id;
        this.email_address = details.payer.email_address;
    }
}