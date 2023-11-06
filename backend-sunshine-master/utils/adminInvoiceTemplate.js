const moment = require("moment")
const jwt = require('jsonwebtoken');
const getToken = (orderId)=>{
    const token = jwt.sign({
        orderId
    }, process.env.ORDER_VIEW_SECRET);

    return token;
}



const getAdminInvoiceTempate = (order)=>{
    return  `<html>

    <body style="background-color:#e2e1e0;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">
      <table style="max-width:670px;margin:50px auto 10px;background-color:#fff;padding:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24); border-top: solid 10px green;">
        <thead>
          <tr>
            <th style="text-align:left;"><img style="max-width: 150px;" src="${process.env.FRONTEND_DOMAIN}" alt="Sunshine Joy"></th>
            <th style="text-align:right;font-weight:400;">${moment(order?.createdAt)?.format('MMMM DD, YYYY')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="height:35px;"></td>
          </tr>
          <tr>
            <td colspan="2" style="border: solid 1px #ddd; padding:10px 20px;">
              <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:150px">Order status</span><b style="color:green;font-weight:normal;margin:0">Success</b></p>
              <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Transaction ID</span> ${order?._id}</p>
              <p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Order amount</span> SGD. ${order?.total}</p>
            </td>
          </tr>
          <tr>
            <td style="height:35px;"></td>
          </tr>
          <tr>
            <td style="width:50%;padding:20px;vertical-align:top">
              <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px">Name</span> ${order?.customerFirstName} ${order?.customerLastName}</p>
              <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Email</span> ${order?.customerEmail}</p>
              <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Phone</span>${order?.customerPhoneNumber}</p>
              <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Shipping Date</span> ${order?.shippingDate}</p>
            </td>
            <td style="width:50%;padding:20px;vertical-align:top">
              <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Address</span> ${order?.customerAddress}</p>
              <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Number of People</span> ${order?.numberOfPeople}</p>
              <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Fast Service</span> ${order?.fastService}</p>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="font-size:20px;padding:30px 15px 0 15px;"><a href="${process.env.FRONTEND_DOMAIN}/admin-order?token=${getToken(order?._id)}">Order details</a></td>
          </tr>
        </tbody>
       
      </table>
    </body>
    
    </html>`
}

module.exports = getAdminInvoiceTempate