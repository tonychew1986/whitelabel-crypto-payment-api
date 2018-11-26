import mongoose, { Schema } from 'mongoose'

const invoiceSchema = new Schema({
  // user: {
  //   type: Schema.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  status: {
    type: String
  },
  merchantId: {
    index: true,
    type: String
  },
  merchantName: {
    type: String
  },
  amount: {
    type: String
  },
  currency: {
    type: String
  },
  productReference: {
    type: String
  },
  priceBTC: {
    type: String
  },
  priceETH: {
    type: String
  },
  priceLTC: {
    type: String
  },
  amountBTC: {
    type: String
  },
  amountETH: {
    type: String
  },
  amountLTC: {
    type: String
  },
  USDSGD: {
    type: String
  },
  network: {
    type: String
  },
  urlCallback: {
    type: String
  },
  urlCancel: {
    type: String
  },
  urlComplete: {
    type: String
  },
  customerName: {
    type: String
  },
  customerEmail: {
    type: String
  },
  customerMobile: {
    type: String
  },
  customerCountry: {
    type: String
  },
  customerAddress: {
    type: String
  },
  customerCity: {
    type: String
  },
  customerState: {
    type: String
  },
  customerPostal: {
    type: String
  },
  invoiceId: {
    type: String
  },
  description: {
    type: String
  },
  paidCryptocurrency: {
    type: String
  },
  blockchainHash: {
    type: String
  },
  cryptoAddress: {
    type: String
  },
  paymentType: {
    type: String
  },
  platform: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

invoiceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      //user: this.user.view(full),
      status: this.status,
      merchantId: this.merchantId,
      merchantName: this.merchantName,
      amount: this.amount,
      currency: this.currency,
      productReference: this.productReference,
      priceBTC: this.priceBTC,
      priceETH: this.priceETH,
      priceLTC: this.priceLTC,
      amountBTC: this.amountBTC,
      amountETH: this.amountETH,
      amountLTC: this.amountLTC,
      USDSGD: this.USDSGD,
      network: this.network,
      urlCallback: this.urlCallback,
      urlCancel: this.urlCancel,
      urlComplete: this.urlComplete,
      customerName: this.customerName,
      customerEmail: this.customerEmail,
      customerMobile: this.customerMobile,
      customerCountry: this.customerCountry,
      customerAddress: this.customerAddress,
      customerCity: this.customerCity,
      customerState: this.customerState,
      customerPostal: this.customerPostal,
      invoiceId: this.invoiceId,
      description: this.description,
      paidCryptocurrency: this.paidCryptocurrency,
      blockchainHash: this.blockchainHash,
      cryptoAddress: this.cryptoAddress,
      paymentType: this.paymentType,
      platform: this.platform,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Invoice', invoiceSchema)

export const schema = model.schema
export default model
