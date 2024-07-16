
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.12.1
 * Query Engine version: b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b
 */
Prisma.prismaVersion = {
  client: "5.12.1",
  engine: "b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  cpf: 'cpf',
  phone: 'phone',
  password: 'password',
  created_at: 'created_at',
  modified_at: 'modified_at',
  is_admin: 'is_admin'
};

exports.Prisma.AddressScalarFieldEnum = {
  id: 'id',
  street: 'street',
  number: 'number',
  neighborhood: 'neighborhood',
  complement: 'complement',
  city: 'city',
  state: 'state',
  country: 'country',
  zipcode: 'zipcode',
  user_id: 'user_id',
  name: 'name'
};

exports.Prisma.CommentsScalarFieldEnum = {
  id: 'id',
  title: 'title',
  rating: 'rating',
  description: 'description',
  product_id: 'product_id',
  user_id: 'user_id',
  images: 'images'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  modified_at: 'modified_at'
};

exports.Prisma.BrandScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  image_url: 'image_url',
  created_at: 'created_at',
  modified_at: 'modified_at'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  price: 'price',
  description: 'description',
  created_at: 'created_at',
  modified_at: 'modified_at',
  brand_id: 'brand_id',
  banner: 'banner',
  SKU: 'SKU',
  stock: 'stock',
  media_rating: 'media_rating'
};

exports.Prisma.ProductCategoryScalarFieldEnum = {
  product_id: 'product_id',
  category_id: 'category_id'
};

exports.Prisma.ProductOnOrderScalarFieldEnum = {
  product_id: 'product_id',
  price: 'price',
  order_id: 'order_id',
  quantity: 'quantity'
};

exports.Prisma.CartScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  modified_at: 'modified_at',
  user_id: 'user_id',
  active: 'active',
  converted: 'converted'
};

exports.Prisma.CartItemScalarFieldEnum = {
  id: 'id',
  quantity: 'quantity',
  created_at: 'created_at',
  modified_at: 'modified_at',
  cart_id: 'cart_id',
  product_id: 'product_id'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  active: 'active',
  delivered: 'delivered',
  paid: 'paid',
  payment_date: 'payment_date',
  cancel: 'cancel',
  out_delivery: 'out_delivery',
  delivery_date: 'delivery_date',
  delivered_date: 'delivered_date',
  created_at: 'created_at',
  modified_at: 'modified_at',
  user_id: 'user_id',
  street: 'street',
  number: 'number',
  neighborhood: 'neighborhood',
  complement: 'complement',
  city: 'city',
  state: 'state',
  country: 'country',
  zipcode: 'zipcode',
  name: 'name',
  grand_total: 'grand_total'
};

exports.Prisma.PaymentMethodScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  created_at: 'created_at',
  modified_at: 'modified_at'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  order_id: 'order_id',
  payment_method_id: 'payment_method_id',
  amount: 'amount',
  currency: 'currency',
  status: 'status',
  created_at: 'created_at',
  modified_at: 'modified_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

exports.Prisma.ModelName = {
  User: 'User',
  Address: 'Address',
  Comments: 'Comments',
  Category: 'Category',
  Brand: 'Brand',
  Product: 'Product',
  ProductCategory: 'ProductCategory',
  ProductOnOrder: 'ProductOnOrder',
  Cart: 'Cart',
  CartItem: 'CartItem',
  Order: 'Order',
  PaymentMethod: 'PaymentMethod',
  Payment: 'Payment'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
