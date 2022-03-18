const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  const html = `<h2 style="text-align: left;"><strong>Noova Glasses va multumeste!</strong></h2>
                <p>&nbsp;</p>
                <p>Comanda dumneavoastra a fost plasata si este in curs de procesare.</p>
                <p>Veti fi contactat de catre unul din operatorii nostri inainte de livrare pentru confirmare.</p>
                <p>Puteti urmari in timp real evolutia precum si modificarile aduse comenzii in sectiunea&nbsp;<a href="${
                  req.protocol
                }://${req.get("host")}/orders">Istoric comenzi</a>.</p>
                <p>&nbsp;</p>
                <p>Cu stima,</p>
                <p><img src="https://res.cloudinary.com/benayun/image/upload/v1646863773/products/rhkmuaop7ywznn0gugaf.png" alt="" width="123" height="36" /></p>
                <p><strong>NOOVA GLASSES</strong></p>
                <p><strong>_______________________</strong></p>
                <p>Telefon: <a href="tel:40769319920">0769 319 920</a></p>
                <p>Email: <a href="mailto:contact@noovaglasses.ro">contact@noovaglasses.ro</a></p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>`;

  const message = `Comanda dumneavoastra cu numarul: #${order.id} este in curs de procesare`;

  try {
    await sendEmail({
      email: req.user.email,
      subject: `NOVA GLASSES - Comanda confirmata #${order.id}`,
      message,
      html,
    });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(
      new ErrorHandler("You have already delivered this product", 400)
    );
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
