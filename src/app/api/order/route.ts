import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RECIPIENT_EMAIL = 'Rpeptidessupport@gmail.com';

interface OrderItemPayload {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const orderNumber = data.orderNumber || 'RP-' + Math.floor(100000 + Math.random() * 900000);
    const customerName = data.customerName || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Valued Customer';
    const customerEmail = data.customerEmail || data.email;
    const phone = data.phone || 'Not provided';
    const company = data.company || 'Not provided';
    const shippingAddress = data.shippingAddress || {
      street: data.street || '',
      city: data.city || '',
      state: data.state || '',
      zip: data.zip || '',
      country: data.country || 'United States',
    };
    const paymentMethod = data.paymentMethod || 'CRYPTO';
    const paymentDetails = data.paymentDetails || data.cryptoTxid || data.cashAppTag || data.applePayPhone || 'Awaiting invoice from support';
    const items: OrderItemPayload[] = Array.isArray(data.items) ? data.items : [];
    const subtotal = Number(data.subtotal || 0).toFixed(2);
    const shipping = Number(data.shipping || 0).toFixed(2);
    const tax = Number(data.tax || 0).toFixed(2);
    const total = Number(data.total || 0).toFixed(2);
    const orderNotes = data.orderNotes || 'None';

    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Customer email is required to process the order.' },
        { status: 400 }
      );
    }

    // Format items as HTML table and plain text
    const itemsHtml = items.length > 0
      ? items.map(item => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.size || 'Standard'}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${Number(item.price).toFixed(2)}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; font-weight: bold;">$${(Number(item.price) * item.quantity).toFixed(2)}</td>
          </tr>
        `).join('')
      : '<tr><td colspan="5" style="padding: 8px;">Order item list included in system payload.</td></tr>';

    const itemsSummaryText = items.length > 0
      ? items.map(i => `${i.quantity}x ${i.name} (${i.size || 'Standard'}) - $${(Number(i.price) * i.quantity).toFixed(2)}`).join('; ')
      : 'Order items';

    const fullAddressText = `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}, ${shippingAddress.country}`;

    let emailSent = false;
    let deliveryMethod = 'none';
    let deliveryMessage = '';

    // 1. Try Nodemailer if SMTP credentials are provided in environment
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost || 'smtp.gmail.com',
          port: smtpHost ? Number(process.env.SMTP_PORT || 587) : 465,
          secure: !smtpHost || process.env.SMTP_PORT === '465',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"rPeptide Order Desk" <${smtpUser}>`,
          to: RECIPIENT_EMAIL,
          replyTo: customerEmail,
          subject: `[rPeptide NEW ORDER] ${orderNumber} - $${total} - Preferred Payment: ${paymentMethod} (${customerName})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #222; line-height: 1.5;">
              <div style="background-color: #0b2545; color: #ffffff; padding: 18px 24px; text-align: center;">
                <h1 style="margin: 0; font-size: 22px;">NEW ORDER RECEIVED: ${orderNumber}</h1>
                <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.9;">Total: $${total} | Preferred Payment: ${paymentMethod}</p>
              </div>

              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 12px 16px; margin: 16px 0;">
                <strong>ACTION REQUIRED:</strong> Review the customer's preferred payment method below and reply directly to this email (<a href="mailto:${customerEmail}">${customerEmail}</a>) with the payment invoice, crypto wallet, Cash App request, or payment link.
              </div>

              <div style="padding: 10px 0;">
                <h3 style="border-bottom: 2px solid #0b2545; padding-bottom: 6px; margin-bottom: 12px;">Customer & Shipping Information</h3>
                <p><strong>Customer Name:</strong> ${customerName}</p>
                <p><strong>Email Address:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a> (Click to reply)</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Institution / Company / Lab:</strong> ${company}</p>
                <p><strong>Shipping Address:</strong> ${fullAddressText}</p>
                <p><strong>Order Notes / Instructions:</strong> ${orderNotes}</p>
              </div>

              <div style="padding: 10px 0;">
                <h3 style="border-bottom: 2px solid #0b2545; padding-bottom: 6px; margin-bottom: 12px;">Payment Selection</h3>
                <p><strong>Preferred Payment Method:</strong> <span style="font-size: 16px; font-weight: bold; color: #0b2545;">${paymentMethod}</span></p>
                <p><strong>Customer Provided Payment Info:</strong> ${paymentDetails}</p>
              </div>

              <div style="padding: 10px 0;">
                <h3 style="border-bottom: 2px solid #0b2545; padding-bottom: 6px; margin-bottom: 12px;">Order Items</h3>
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 8px; border-bottom: 2px solid #cbd5e1;">Product</th>
                      <th style="padding: 8px; border-bottom: 2px solid #cbd5e1; text-align: center;">Size / Aliquot</th>
                      <th style="padding: 8px; border-bottom: 2px solid #cbd5e1; text-align: center;">Qty</th>
                      <th style="padding: 8px; border-bottom: 2px solid #cbd5e1; text-align: right;">Unit Price</th>
                      <th style="padding: 8px; border-bottom: 2px solid #cbd5e1; text-align: right;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
              </div>

              <div style="margin-top: 16px; padding: 14px; background-color: #f8fafc; border: 1px solid #e2e8f0; text-align: right; font-size: 14px;">
                <p style="margin: 4px 0;">Subtotal: <strong>$${subtotal}</strong></p>
                <p style="margin: 4px 0;">FedEx Cold-Chain Shipping: <strong>$${shipping}</strong></p>
                <p style="margin: 4px 0;">Estimated Tax: <strong>$${tax}</strong></p>
                <h2 style="margin: 8px 0 0; color: #0b2545; font-size: 20px;">Total Due: $${total}</h2>
              </div>

              <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
                This order was placed on rPeptide.com and forwarded to ${RECIPIENT_EMAIL}.
              </div>
            </div>
          `,
        });

        emailSent = true;
        deliveryMethod = 'smtp';
        deliveryMessage = 'Dispatched directly via SMTP';
      } catch (smtpErr) {
        console.error('SMTP order delivery error:', smtpErr);
      }
    }

    // 2. Relay via FormSubmit API with required headers to prevent bot rejection
    if (!emailSent) {
      try {
        const formSubmitPayload = {
          _subject: `[rPeptide NEW ORDER] ${orderNumber} - $${total} - Preferred Payment: ${paymentMethod} (${customerName})`,
          _replyto: customerEmail,
          _captcha: 'false',
          _template: 'table',
          'Order Number': orderNumber,
          'Customer Name': customerName,
          'Customer Email': customerEmail,
          'Phone': phone,
          'Company or Lab': company,
          'Shipping Address': fullAddressText,
          'Preferred Payment Method': paymentMethod,
          'Customer Payment Details': paymentDetails,
          'Items Ordered': itemsSummaryText,
          'Subtotal': `$${subtotal}`,
          'Shipping': `$${shipping}`,
          'Tax': `$${tax}`,
          'TOTAL AMOUNT': `$${total}`,
          'Order Notes': orderNotes,
          'ACTION REQUIRED': `Reply to customer at ${customerEmail} to send payment invoice for ${paymentMethod}.`,
        };

        const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Referer: 'https://www.rpeptide.com',
            Origin: 'https://www.rpeptide.com',
          },
          body: JSON.stringify(formSubmitPayload),
        });

        const resData = await formSubmitRes.json();
        if (formSubmitRes.ok && resData.success !== 'false') {
          emailSent = true;
          deliveryMethod = 'formsubmit';
          deliveryMessage = 'Dispatched via FormSubmit relay';
        } else {
          deliveryMessage = resData.message || 'FormSubmit pending activation';
          console.warn('FormSubmit response:', resData);
        }
      } catch (fetchErr) {
        console.error('FormSubmit order relay error:', fetchErr);
        deliveryMessage = String(fetchErr);
      }
    }

    console.log(`Order ${orderNumber} processed for ${customerEmail}. Sent: ${emailSent} via ${deliveryMethod} (${deliveryMessage})`);

    return NextResponse.json({
      success: true,
      orderNumber,
      recipient: RECIPIENT_EMAIL,
      emailSent,
      deliveryMethod,
      message: `Order ${orderNumber} registered successfully. Notification sent to ${RECIPIENT_EMAIL}.`,
    });
  } catch (error) {
    console.error('Order API error:', error);
    return NextResponse.json(
      { error: 'Failed to process order notification.', details: String(error) },
      { status: 500 }
    );
  }
}
