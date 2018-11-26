import { success, notFound } from '../../services/response/'
import { sendMail } from '../../services/sendgrid'
import { Transaction } from '.'

export const confirmation = ({ bodymen: { body: { transactionId } } }, res, next) =>
  Transaction.findOne({ 'transactionId': transactionId })
    .then(notFound(res))
    .then((transaction) => {
      const data = {
        transactionId: transactionId,
        merchantId: transaction.merchantId,
        merchantName: transaction.merchantName,
        productCode: transaction.productReference,
        date: transaction.createdAt,
        addressReceiver: transaction.addressReceiver,
        cryptocurrencyPaid: transaction.cryptocurrencyPaid,
        cryptocurrencyType: transaction.cryptocurrencyType,
        currencyPaid: transaction.paymentDollarValue,
        currencyType: transaction.paymentCurrency,
        shippingName: transaction.shippingName,
        shippingEmail: transaction.shippingEmail,
        shippingMobile: transaction.shippingMobile,
        shippingCountry: transaction.shippingCountry,
        shippingAddress: transaction.shippingAddress,
        shippingPostal: transaction.shippingPostal,
        templateId: "8ece54b1-503d-4c99-a90e-1f161d59ed65"
      }
      const content = `
        Hey, xxx.<br><br>
        You requested a new password for your Aditus Private API account.<br>
        Please use the following link to set a new password. It will expire in 1 hour.<br><br>
        If you didn't make this request then you can safely ignore this email. :)<br><br>
        &mdash; Aditus Private API Team
      `
      return sendMail({ toEmail: transaction.shippingEmail, subject: 'Aditus Purchase Confirmation', content, data })
    })
    .then(success(res))
    .then((response) => response ? res.status(response.statusCode).end() : null)
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) =>
  Transaction.create(body)
    .then((transaction) => transaction.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Transaction.count(query)
    .then(count => Transaction.find(query, select, cursor)
      .then((transactions) => ({
        count,
        rows: transactions.map((transaction) => transaction.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const indexByStatus = ({ querymen: { query, select, cursor } }, res, next) =>
  Transaction.count(query)
    .then(count => Transaction.find(query, select, cursor)
      .then((transactions) => ({
        count,
        rows: transactions.map((transaction) => transaction.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const indexByMerchant = ({ querymen: { query, select, cursor } }, res, next) =>
  Transaction.count(query)
    .then(count => Transaction.find(query, select, cursor)
      .then((transactions) => ({
        count,
        rows: transactions.map((transaction) => transaction.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Transaction.findOne({ 'transactionId': params.id })
    .then(notFound(res))
    .then((transaction) => transaction ? transaction.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Transaction.findOne({ 'transactionId': params.id })
    .then(notFound(res))
    .then((transaction) => transaction ? Object.assign(transaction, body).save() : null)
    .then((transaction) => transaction ? transaction.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Transaction.findOne({ 'transactionId': params.id })
    .then(notFound(res))
    .then((transaction) => transaction ? transaction.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const destroyByOid = ({ params }, res, next) =>
  Transaction.findById(params.id)
    .then(notFound(res))
    .then((transaction) => transaction ? transaction.remove() : null)
    .then(success(res, 204))
    .catch(next)
