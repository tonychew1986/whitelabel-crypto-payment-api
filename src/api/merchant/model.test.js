import { Merchant } from '.'
import { User } from '../user'

let user, merchant

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  merchant = await Merchant.create({ user, name: 'test', country: 'test', accountTier: 'test', accountStatus: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = merchant.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(merchant.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(merchant.name)
    expect(view.country).toBe(merchant.country)
    expect(view.accountTier).toBe(merchant.accountTier)
    expect(view.accountStatus).toBe(merchant.accountStatus)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = merchant.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(merchant.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(merchant.name)
    expect(view.country).toBe(merchant.country)
    expect(view.accountTier).toBe(merchant.accountTier)
    expect(view.accountStatus).toBe(merchant.accountStatus)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
