import mongoose, { Schema } from 'mongoose'

const merchantSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  merchantId: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  addressBTC: {
    type: String
  },
  addressETH: {
    type: String
  },
  addressLTC: {
    type: String
  },
  addressTestnetBTC: {
    type: String
  },
  addressTestnetETH: {
    type: String
  },
  addressTestnetLTC: {
    type: String
  },
  walletSet: {
    type: Number
  },
  walletKeyNum: {
    type: Number
  },
  ownerId: {
    type: String
  },
  ownerName: {
    type: String
  },
  address: {
    type: String
  },
  mobile: {
    type: String
  },
  country: {
    type: String
  },
  accountTier: {
    type: String
  },
  accountStatus: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

merchantSchema.methods = {
  view (full) {

    let view = {}
    let fields = ['id', 'merchantId', 'name', 'addressBTC', 'addressETH', 'addressLTC', 'addressTestnetBTC', 'addressTestnetETH', 'addressTestnetLTC', 'walletSet', 'walletKeyNum', 'ownerId', 'ownerName','address', 'mobile', 'country', 'accountTier', 'accountStatus', 'createdAt']

    if (full) {
      fields = [...fields, 'createdAt']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  }
}

const model = mongoose.model('Merchant', merchantSchema)

export const schema = model.schema
export default model
