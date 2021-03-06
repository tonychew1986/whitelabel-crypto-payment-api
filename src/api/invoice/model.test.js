import { Invoice } from '.'
import { User } from '../user'

let user, invoice

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  invoice = await Invoice.create({ user, merchantId: 'test', merchantName: 'test', amount: 'test', currency: 'test', productReference: 'test', network: 'test', urlCallback: 'test', urlCancel: 'test', urlComplete: 'test', customerName: 'test', customerEmail: 'test', customerMobile: 'test', customerCountry: 'test', customerAddress: 'test', customerCity: 'test', customerState: 'test', customerPostal: 'test', invoiceId: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = invoice.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoice.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.merchantId).toBe(invoice.merchantId)
    expect(view.merchantName).toBe(invoice.merchantName)
    expect(view.amount).toBe(invoice.amount)
    expect(view.currency).toBe(invoice.currency)
    expect(view.productReference).toBe(invoice.productReference)
    expect(view.network).toBe(invoice.network)
    expect(view.urlCallback).toBe(invoice.urlCallback)
    expect(view.urlCancel).toBe(invoice.urlCancel)
    expect(view.urlComplete).toBe(invoice.urlComplete)
    expect(view.customerName).toBe(invoice.customerName)
    expect(view.customerEmail).toBe(invoice.customerEmail)
    expect(view.customerMobile).toBe(invoice.customerMobile)
    expect(view.customerCountry).toBe(invoice.customerCountry)
    expect(view.customerAddress).toBe(invoice.customerAddress)
    expect(view.customerCity).toBe(invoice.customerCity)
    expect(view.customerState).toBe(invoice.customerState)
    expect(view.customerPostal).toBe(invoice.customerPostal)
    expect(view.invoiceId).toBe(invoice.invoiceId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = invoice.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoice.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.merchantId).toBe(invoice.merchantId)
    expect(view.merchantName).toBe(invoice.merchantName)
    expect(view.amount).toBe(invoice.amount)
    expect(view.currency).toBe(invoice.currency)
    expect(view.productReference).toBe(invoice.productReference)
    expect(view.network).toBe(invoice.network)
    expect(view.urlCallback).toBe(invoice.urlCallback)
    expect(view.urlCancel).toBe(invoice.urlCancel)
    expect(view.urlComplete).toBe(invoice.urlComplete)
    expect(view.customerName).toBe(invoice.customerName)
    expect(view.customerEmail).toBe(invoice.customerEmail)
    expect(view.customerMobile).toBe(invoice.customerMobile)
    expect(view.customerCountry).toBe(invoice.customerCountry)
    expect(view.customerAddress).toBe(invoice.customerAddress)
    expect(view.customerCity).toBe(invoice.customerCity)
    expect(view.customerState).toBe(invoice.customerState)
    expect(view.customerPostal).toBe(invoice.customerPostal)
    expect(view.invoiceId).toBe(invoice.invoiceId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
