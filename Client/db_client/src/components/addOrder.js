import React from "react";

const AddOrder = (props) => {
  const { handleAddOrder, orderFormData, handleFormChange } = props;

  return (
    <div className="addOrder">
      <h2>Add Order</h2>
      <form onSubmit={handleAddOrder}>
        <div className="form-row">
          <input
            type="text"
            name="p_order_number"
            className="order"
            placeholder="Order Number"
            value={orderFormData.p_order_number}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="p_date"
            className="order"
            placeholder="Date"
            value={orderFormData.p_date}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="p_total_price"
            className="order"
            placeholder="Total Price"
            value={orderFormData.p_total_price}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="p_ordering_phone"
            className="order"
            placeholder="Ordering Phone Number"
            value={orderFormData.p_ordering_phone}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="p_time"
            className="order"
            placeholder="Time"
            value={orderFormData.p_time}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="p_seller_id"
            className="order"
            placeholder="Seller ID"
            value={orderFormData.p_seller_id}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="p_cinema_id"
            className="order"
            placeholder="Cinema ID"
            value={orderFormData.p_cinema_id}
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddOrder;
