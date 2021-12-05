import React from "react";

import { PayPalButton } from "react-paypal-button-v2";

export default class Example extends React.Component {
  render() {
    const onSuccess = (payment) => {
      // Congratulation, it came here means everything's fine!
      console.log("Information about payment!", payment.payer);
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
      this.props.tranSuccess(payment.payer);
    };
    const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup!
      console.log("The payment was cancelled!", data);
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    };
    const onError = (err) => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log("Error!", err);
      // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    };
    //let env = "sandbox"; // you can set here to 'production' for production
    let currency = "USD"; // or you can set this value from your props or state
    let total = this.props.total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout

    //let vault = false;
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
      sandbox:
        "AXQWBLqGt1DTrG4Wt_gJMXBnrHg0aHmzBeIDpSGINAkJKtYGbtMZFByR4q7yh5CYyh1iNkN-zC9jjasQ",
      production: "YOUR-PRODUCTION-APP-ID",
    };
    let style = {
      size: "small",
      layout: "horizontal",
      color: "gold",
      shape: "pill",
      label: "checkout",
      tagline: "true",
      height: 27,
    };
    return (
      <PayPalButton
        //amount="0.01"
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        // onSuccess={(details, data) => {
        //   alert("Transaction completed by " + details.payer.name.given_name);

        //   // OPTIONAL: Call your server to save the transaction
        //   return fetch("/paypal-transaction-complete", {
        //     method: "post",
        //     body: JSON.stringify({
        //       orderId: data.orderID,
        //     }),
        //   });
        // }}

        //env={env}
        client={client}
        currency={currency}
        amount={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
        style={style}
        //vault={vault}
      />
    );
  }
}
