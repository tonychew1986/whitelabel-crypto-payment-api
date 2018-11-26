import mongoose, { Schema } from 'mongoose'

const keySchema = new Schema({
  merchantId: {
    type: String
  },
  keyLabel: {
    type: String
  },
  keyId: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

keySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      merchantId: this.merchantId,
      keyLabel: this.keyLabel,
      keyId: this.keyId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Key', keySchema)

export const schema = model.schema
export default model
