import mongoose, { Schema } from 'mongoose'

const settlementSchema = new Schema({
  invoiceId: {
    type: String
  },
  merchantId: {
    type: String
  },
  cryptocurrencyType: {
    type: String
  },
  cryptocurrencyPaid: {
    type: String
  },
  cryptocurrencyPriceQuoted: {
    type: String
  },
  paymentCurrency: {
    type: String
  },
  paymentAmount: {
    type: String
  },
  cryptocurrencyPriceSettled: {
    type: String
  },
  exchangeSettled: {
    type: String
  },
  paymentAmountReleased: {
    type: String
  },
  feeCharged: {
    type: String
  },
  network: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

settlementSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      invoiceId: this.invoiceId,
      merchantId: this.merchantId,
      cryptocurrencyType: this.cryptocurrencyType,
      cryptocurrencyPaid: this.cryptocurrencyPaid,
      cryptocurrencyPriceQuoted: this.cryptocurrencyPriceQuoted,
      paymentCurrency: this.paymentCurrency,
      paymentAmount: this.paymentAmount,
      cryptocurrencyPriceSettled: this.cryptocurrencyPriceSettled,
      exchangeSettled: this.exchangeSettled,
      paymentAmountReleased: this.paymentAmountReleased,
      feeCharged: this.feeCharged,
      network: this.network,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Settlement', settlementSchema)

export const schema = model.schema
export default model
