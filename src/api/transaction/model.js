import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const transactionSchema = new Schema({
  transactionStatus: {
    type: String,
    unique: true,
    trim: true
  },
  paymentDollarValue: {
    type: String,
    trim: true
  },
  merchantId: {
    type: String,
    index: true,
    trim: true
  },
  merchantName: {
    type: String,
    trim: true
  },
  cryptocurrencyType: {
    type: String,
    trim: true
  },
  cryptocurrencyPaid: {
    type: String,
    trim: true
  },
  paymentCurrency: {
    type: String,
    trim: true
  },
  productReference: {
    type: String,
    trim: true
  },
  network: {
    type: String,
    trim: true
  },
  addressReceiver: {
    type: String,
    trim: true
  },
  addressSender: {
    type: String,
    trim: true
  },
  paymentType: {
    type: String,
    trim: true
  },
  cryptocurrencyPrice: {
    type: String,
    trim: true
  },
  transactionId: {
    type: String,
    trim: true
  },
  shippingName: {
    type: String,
    trim: true
  },
  shippingEmail: {
    type: String,
    trim: true
  },
  shippingMobile: {
    type: String,
    trim: true
  },
  shippingCountry: {
    type: String,
    trim: true
  },
  shippingAddress: {
    type: String,
    trim: true
  },
  shippingPostal: {
    type: String,
    trim: true
  },
  transactionHash: {
    type: String,
    trim: true
  },
  rewardAwarded: {
    type: String,
    trim: true
  },
  userId: {
    type: String,
    trim: true
  },
  merchantType: {
    type: String,
    trim: true
  },
  transactionMeta: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

transactionSchema.methods = {
  // view (full) {
  //   let view = {}
  //   let fields = ['id', 'transactionStatus', 'paymentDollarValue', 'merchantId', 'cryptocurrencyType', 'cryptocurrencyPaid', 'paymentCurrency', 'network', 'addressReceiver', 'addressSender', 'paymentType', 'cryptocurrencyPrice', 'transactionId', 'shippingName', 'shippingEmail', 'shippingMobile', 'shippingCountry', 'shippingAddress', 'shippingPostal', 'transactionHash', 'rewardAwarded', 'userId', 'merchantType']
  //
  //   if (full) {
  //     fields = [...fields, 'createdAt']
  //   }
  //
  //   fields.forEach((field) => { view[field] = this[field] })
  //
  //   return view
  // }
  view (full) {
    const view = {
      // simple view
      id: this.id,
      transactionStatus: this.transactionStatus,
      paymentDollarValue: this.paymentDollarValue,
      merchantId: this.merchantId,
      merchantName: this.merchantName,
      cryptocurrencyType: this.cryptocurrencyType,
      cryptocurrencyPaid: this.cryptocurrencyPaid,
      paymentCurrency: this.paymentCurrency,
      productReference: this.productReference,
      network: this.network,
      addressReceiver: this.addressReceiver,
      addressSender: this.addressSender,
      paymentType: this.paymentType,
      cryptocurrencyPrice: this.cryptocurrencyPrice,
      transactionId: this.transactionId,
      shippingName: this.shippingName,
      shippingEmail: this.shippingEmail,
      shippingMobile: this.shippingMobile,
      shippingCountry: this.shippingCountry,
      shippingAddress: this.shippingAddress,
      shippingPostal: this.shippingPostal,
      transactionHash: this.transactionHash,
      rewardAwarded: this.rewardAwarded,
      userId: this.userId,
      merchantType: this.merchantType,
      transactionMeta: this.transactionMeta,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

transactionSchema.plugin(mongooseKeywords, { paths: ['transactionStatus', 'merchantId'] })

const model = mongoose.model('Transaction', transactionSchema)

export const schema = model.schema
export default model
