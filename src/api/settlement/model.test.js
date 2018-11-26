import { Settlement } from '.'

let settlement

beforeEach(async () => {
  settlement = await Settlement.create({ transactionId: 'test', merchantId: 'test', cryptocurrencyType: 'test', cryptocurrencyPaid: 'test', cryptocurrencyPriceQuoted: 'test', paymentCurrency: 'test', paymentAmount: 'test', cryptocurrencyPriceSettled: 'test', exchangeSettled: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = settlement.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(settlement.id)
    expect(view.transactionId).toBe(settlement.transactionId)
    expect(view.merchantId).toBe(settlement.merchantId)
    expect(view.cryptocurrencyType).toBe(settlement.cryptocurrencyType)
    expect(view.cryptocurrencyPaid).toBe(settlement.cryptocurrencyPaid)
    expect(view.cryptocurrencyPriceQuoted).toBe(settlement.cryptocurrencyPriceQuoted)
    expect(view.paymentCurrency).toBe(settlement.paymentCurrency)
    expect(view.paymentAmount).toBe(settlement.paymentAmount)
    expect(view.cryptocurrencyPriceSettled).toBe(settlement.cryptocurrencyPriceSettled)
    expect(view.exchangeSettled).toBe(settlement.exchangeSettled)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = settlement.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(settlement.id)
    expect(view.transactionId).toBe(settlement.transactionId)
    expect(view.merchantId).toBe(settlement.merchantId)
    expect(view.cryptocurrencyType).toBe(settlement.cryptocurrencyType)
    expect(view.cryptocurrencyPaid).toBe(settlement.cryptocurrencyPaid)
    expect(view.cryptocurrencyPriceQuoted).toBe(settlement.cryptocurrencyPriceQuoted)
    expect(view.paymentCurrency).toBe(settlement.paymentCurrency)
    expect(view.paymentAmount).toBe(settlement.paymentAmount)
    expect(view.cryptocurrencyPriceSettled).toBe(settlement.cryptocurrencyPriceSettled)
    expect(view.exchangeSettled).toBe(settlement.exchangeSettled)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
