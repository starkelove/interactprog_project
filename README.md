# For peer-reviewers
Peer-reviewers should send an email to lovest@kth.se to get PayPal credentials (if they want to test that functionality in the app).

# Art by Maria Fällström
Repository for Project group 3 in the Interactive Programming course (DH2642). This project is a website made for Love's fiancee Maria who will sell her art-prints through it. It will include list of items, detailview of every item, an ability to put items in a shopping cart, a view of the shopping cart and finally a checkout of the items through PayPal.

# What we have done
We have set up the base design for the site with its corresponding links and flow. Firebase database is created but not utilized yet. Paypal checkout in sandbox mode is implemented. A basic model is created which will be used to handle the various items and if they are in stock or not.

# What we still plan to do
Configure firebase so that information of the items can be retrieved from there. Items should include descriptions, pictures and how many are left in stock. Paypal needs to be setup so the transaction is based on what is in the shopping cart and that the quantity of the item is updated in firebase. We need to set up the shopping cart model.

# Project file structure (short description/purpose of each file)
    .
    ├── _src
    |   ├── About
    |   |   ├── Code for the about page
    |   ├── Data
    |   |   ├── Where all data models will reside
    |   ├── Details
    |   |   ├── Code for the detailview
    |   ├── imgs
    |   |   ├── Folder for the images
    |   ├── ItemView
    |   |   ├── Code for the page featuring all items
    |   ├── Main
    |   |   ├── Code for the main page (includes itemview and topview in one)
    |   ├── Shoppingcart
    |   |   ├── Code for the shopping cart and PayPal button
    |   ├── Topview
    |   |   ├── Code for the topview which is present on all pages except the Welcome screen
    |   ├── Welcome
    |   |   ├── Code for the Welcome page
    |   ├── app.js
    |   ├── base.js
    └── └── index.js
