import mongoose, { Schema } from 'mongoose'

const statisticSchema = new Schema({
  walletGenerationNumber: {
    type: Number
  },
  masterPublicKeyBTC: {
    type: String
  },
  masterPublicKeyLTC: {
    type: String
  },
  masterPublicKeyETH: {
    type: String
  },
  masterPublicKeyTestnetBTC: {
    type: String
  },
  masterPublicKeyTestnetLTC: {
    type: String
  },
  masterPublicKeyTestnetETH: {
    type: String
  },
  masterPublicKeyDASH: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

statisticSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      walletGenerationNumber: this.walletGenerationNumber,
      masterPublicKeyBTC: this.masterPublicKeyBTC,
      masterPublicKeyLTC: this.masterPublicKeyLTC,
      masterPublicKeyETH: this.masterPublicKeyETH,
      masterPublicKeyTestnetBTC: this.masterPublicKeyTestnetBTC,
      masterPublicKeyTestnetLTC: this.masterPublicKeyTestnetLTC,
      masterPublicKeyTestnetETH: this.masterPublicKeyTestnetETH,
      masterPublicKeyDASH: this.masterPublicKeyDASH,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Statistic', statisticSchema)

export const schema = model.schema
export default model
