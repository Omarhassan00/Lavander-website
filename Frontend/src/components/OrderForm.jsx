import { motion } from "framer-motion";

const OrderForm = (order) => {

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opatotalAmount: 0, y: 20 }}
      animate={{ opatotalAmount: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-purple-800">
        Order Details
      </h2>

      <form className="space-y-4">
        <tr>
          <td>
        <h1>Product Name </h1>
        </td>
          <td>
        <h1>: {order.order.productname}</h1>
        </td>
        </tr>
        <tr>
          <td>
        <h1>Product Image</h1>
        </td>
          <td>
        <img src={order.order.productimage} alt={order.order.productname}/>
        </td>
        </tr>
        <tr>
          <td>
        <h1>quantity</h1>
        </td>
          <td>
        <h1>: {order.order.quantity}</h1>
        </td>
        </tr>
        <tr>
          <td>
        <h1>Unit Price</h1>
        </td>
          <td>
        <h1>: ${order.order.price}</h1>
        </td>
        </tr>
        <tr>
          <td>
        <h1>Total Amount</h1>
        </td>
          <td>
        <h1>: ${order.order.totalAmount}</h1>
        </td>
        </tr>
        <tr>
          <td>
        <h1>Strip ID</h1>
        </td>
          <td>
        <h1>: {order.order.stripeSessionId}</h1>
        </td>
        </tr>
        <tr>
          <td>
        <h1>Order Time</h1>
        </td>
          <td>
        <h1>: {order.order.timestamps}</h1>
        </td>
        </tr>
      </form>
    </motion.div>
    
  );
};
export default OrderForm;
