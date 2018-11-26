import { Financial } from '.'

let financial

beforeEach(async () => {
  financial = await Financial.create({ accountType: 'test', accountOwner: 'test', balance: 'test', transactionHistory: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = financial.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(financial.id)
    expect(view.accountType).toBe(financial.accountType)
    expect(view.accountOwner).toBe(financial.accountOwner)
    expect(view.balance).toBe(financial.balance)
    expect(view.transactionHistory).toBe(financial.transactionHistory)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = financial.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(financial.id)
    expect(view.accountType).toBe(financial.accountType)
    expect(view.accountOwner).toBe(financial.accountOwner)
    expect(view.balance).toBe(financial.balance)
    expect(view.transactionHistory).toBe(financial.transactionHistory)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
