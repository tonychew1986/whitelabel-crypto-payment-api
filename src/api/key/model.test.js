import { Key } from '.'

let key

beforeEach(async () => {
  key = await Key.create({ merchantId: 'test', keyLabel: 'test', keyId: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = key.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(key.id)
    expect(view.merchantId).toBe(key.merchantId)
    expect(view.keyLabel).toBe(key.keyLabel)
    expect(view.keyId).toBe(key.keyId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = key.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(key.id)
    expect(view.merchantId).toBe(key.merchantId)
    expect(view.keyLabel).toBe(key.keyLabel)
    expect(view.keyId).toBe(key.keyId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
