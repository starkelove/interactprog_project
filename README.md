# Art by Maria Fällström
Repository for Project group 3 in the Interactive Programming course (DH2642). This project is a website made for Love's fiancee Maria who will sell her art-prints through it. It will include list of items, detailview of every item, an ability to put items in a shopping cart, a view of the shopping cart and finally a checkout of the items through PayPal.

# What we have done
List of features present:
* Firebase database with info about all the items and corresponding pictures
* Fetching all items from our firebase database and presentiing them on our mainpage
* The items on the mainpage are sorted by popularity and this popularity is updated each time items are bought
* Detailed view of every item featuring a picture gallery, description, price and an ability to put the item in your cart
* Items can only be put in cart if they are in stock, otherwise they will be shown as sold out
* On the the item pages there is also a row showing of the three latest purchases made to the store
* Shopping cart which can add or remove items easily (depending on how many are in stock)
* PayPal checkout which checks out the items that were bought (in Paypal sandbox so no money is transferred)
* The stock of items is checked one last time before check-out and then the quantity of the item is updated in the database
* Transaction history which shows the history of purchases made on the site with data from both the database and PayPal included

# For teachers/peer-reviewers
Teachers and/or peer-reviewers should send an email to lovest@kth.se to get PayPal credentials (if they want to test that functionality in the app).

# How to setup
* Clone project
* Run npm install
* Run npm start

# Project file structure (short description/purpose of each file)
    .
    ├── _src
    |   ├── About
    |   |   ├── Code for the about page
    |   ├── Data
    |   |   ├── Where all data models will reside
    |   ├── Details
    |   |   ├── Code for the detailview
    |   ├── Itemview
    |   |   ├── Code for the page featuring all items
    |   ├── Main
    |   |   ├── Code for the main page (includes itemview and topview in one)
    |   ├── Shoppingcart
    |   |   ├── Code for the shopping cart and PayPal button
    |   ├── Topview
    |   |   ├── Code for the topview which is present on all pages except the Welcome screen
    |   ├── Transactionview
    |   |   ├── Code for the transactionview which shows the transaction history in order
    |   ├── Welcome
    |   |   ├── Code for the Welcome page
    |   ├── app.js
    |   ├── base.js
    └── └── index.js
