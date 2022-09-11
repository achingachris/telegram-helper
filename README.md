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

#### Get all Products - Public

/api/products

#### Get Product by ID - Public

/api/products/id

#### Get Top Top Products - Public

/api/products/top-products

#### Get a Product Review - Public

/api/products/id/reviews

### Orders

### Ulpoad

### Users

