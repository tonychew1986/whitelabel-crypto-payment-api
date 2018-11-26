import mongoose, { Schema } from 'mongoose'

const financialSchema = new Schema({
  accountType: {
    type: String
  },
  accountId: {
    type: String
  },
  accountName: {
    type: String
  },
  balanceBTC: {
    type: String
  },
  balanceETH: {
    type: String
  },
  balanceLTC: {
    type: String
  },
  balanceUSD: {
    type: String
  },
  balanceSGD: {
    type: String
  },
  balanceTestnetBTC: {
    type: String
  },
  balanceTestnetETH: {
    type: String
  },
  balanceTestnetLTC: {
    type: String
  },
  balanceTestnetUSD: {
    type: String
  },
  balanceTestnetSGD: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

financialSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      accountType: this.accountType,
      accountId: this.accountId,
      accountName: this.accountName,
      balanceBTC: this.balanceBTC,
      balanceETH: this.balanceETH,
      balanceLTC: this.balanceLTC,
      balanceUSD: this.balanceUSD,
      balanceSGD: this.balanceSGD,
      balanceTestnetBTC: this.balanceTestnetBTC,
      balanceTestnetETH: this.balanceTestnetETH,
      balanceTestnetLTC: this.balanceTestnetLTC,
      balanceTestnetUSD: this.balanceTestnetUSD,
      balanceTestnetSGD: this.balanceTestnetSGD,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Financial', financialSchema)

export const schema = model.schema
export default model
