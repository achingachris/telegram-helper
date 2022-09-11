# Mern Shop Server

## Project Structure:

### Folder Hierarchy:

1. Models
2. Controllers
3. Routers
4. App.js

Generate jsonwebtokens
[utils/generateToken](utils/generateToken.js)

Connect to Mongo DB
[config/mongodb](config/mongodb.js)

User Model:
[user model](models/userModel.js)

User Controllers:
[user controllers](controllers/user/)

Product Model:
[product model](models/productModel.js)

Product Controllers:
[product controllers](controllers/products/)


Order Model:
[order model](models/orderModel.js)

Order Controller:
[order controller](controllers/orders/)

### Development Environment Setup:

```Environment
JWT_SECRET = ''
MONGO_URI = ''
NODE_ENV = ''
PAYPAL_CLIENT_ID = ''
PORT = 
```

## API Routes:

### Products

#### Get all Products

/api/products

#### Get Product by ID

/api/products/id

#### Get Top Top Products

/api/products/top-products

#### Get a Product Review

/api/products/id/reviews

### Orders

### Ulpoad

### Users

