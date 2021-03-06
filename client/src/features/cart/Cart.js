import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import ListCart from "./listcart/ListCart";
import Bill from "./bill/Bill";
import Footers from "../../components/footers/Footers";
import Shipping from "../../components/shipping/Shipping";
import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root"));
const customStyles3 = {
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    border: "none",
    zIndex: "999",
  },
  content: {
    top: "375px",
    overflow: "unset",
    border: "none",
    background: "transparent",
    height: "auto",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Cart() {
  const state = useContext(GlobalState);
  const [infor] = state.userApi.infor;
  const [onEdit, setOnEdit] = useState(false);
  const [orderOwner, setOrderOwner] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setOrderOwner({ ...orderOwner, [name]: value });
  };
  console.log(orderOwner);

  const [cart] = state.userApi.cart;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f000";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const changeInfoShip = (e) => {
    e.preventDefault();
    setOnEdit(true);
    closeModal();
  };

  if (cart.length === 0)
    return (
      <div className="cart_empty">
        <h2>
          You don't have any books in your shopping cart yet. Try back select
          it.
        </h2>
      </div>
    );

  return (
    <>
      <div className="cart-shopping">
        <h3 className="title-cart">You have {cart.length} products shopping</h3>
        <div className="cart_container">
          <div>
            <div className="info_checkout">
              <div className="infcheckout_wrapper">
                <p className="address_title">Shipping Address</p>
                <p className="address_detail" onClick={openModal}>
                  Edit
                </p>
              </div>
              <div className="infcheckout_inner">
                <div>
                  <div className="address_title_container">
                    <span className="email_title">Customer: {infor.email}</span>
                    <span className="name_title">
                      Receiver:{" "}
                      {onEdit && orderOwner.name ? orderOwner.name : infor.name}
                    </span>
                    <span className="phone_title">
                      Phone:{" "}
                      {onEdit && orderOwner.phone
                        ? orderOwner.phone
                        : infor.phone}
                    </span>
                  </div>
                </div>
                <div className="address_info_item">
                  <span>
                    Address:{" "}
                    {onEdit && orderOwner.address
                      ? orderOwner.address
                      : infor.address}
                  </span>
                </div>
              </div>
            </div>
            <ListCart />
          </div>

          <div className="bill_container">
            <Bill orderOwner={orderOwner} />
          </div>
        </div>
        <Shipping />
        <Footers />
      </div>
      <div className="form-orderowner-modal">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles3}
          //portalClassName="modal"
          contentLabel="Example Modal"
        >
          <button className="btnclose-modal" onClick={closeModal}>
            X
          </button>
          <div className="verify-infomation-ship">
            <div className="verify-title">
              <h2>Change Information</h2>
            </div>

            <form onSubmit={changeInfoShip}>
              <div className="form-verify">
                <div className="form-left">
                  <label htmlFor="orderowner">Reveive Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={orderOwner.name ? orderOwner.name : infor.name}
                    value={orderOwner.name}
                    onChange={onChangeInput}
                  />
                  <label htmlFor="orderowner">Reveive Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder={
                      orderOwner.phone ? orderOwner.phone : infor.phone
                    }
                    value={orderOwner.phone}
                    onChange={onChangeInput}
                  />
                  <label htmlFor="orderowner">Reveive Address</label>

                  <textarea
                    type="text"
                    name="address"
                    placeholder={
                      orderOwner.address ? orderOwner.address : infor.address
                    }
                    value={orderOwner.address}
                    onChange={onChangeInput}
                    row="3"
                  />
                </div>
                <div className="form-right">
                  <label htmlFor="orderowner">Account Email</label>
                  <input
                    type="text"
                    placeholder={infor.email}
                    value={infor.email}
                    disabled
                  />
                  <label htmlFor="orderowner">Account Name</label>
                  <input
                    type="text"
                    placeholder={infor.name}
                    value={infor.name}
                    disabled
                  />
                  <label htmlFor="orderowner">Account Phone</label>
                  <input
                    type="text"
                    placeholder={infor.phone}
                    value={infor.phone}
                    disabled
                  />
                  <label htmlFor="orderowner">Account Address</label>

                  <textarea
                    type="text"
                    placeholder={infor.address}
                    value={infor.address}
                    disabled
                    row="2"
                  />
                </div>
              </div>
              <div className="submit-change-infor">
                <button type="submit">Change information</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Cart;
