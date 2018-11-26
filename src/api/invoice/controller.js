import { success, notFound } from '../../services/response/'
import { Invoice } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Invoice.create({ ...body, user })
    .then((invoice) => invoice.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Invoice.count(query)
    .then(count => Invoice.find(query, select, cursor)
      .populate('user')
      .then((invoices) => ({
        count,
        rows: invoices.map((invoice) => invoice.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const showByMerchant = ({ params }, res, next) =>
  Invoice.count()
    .then(count => Invoice.find({ 'merchantId': params.id })
      .populate('user')
      .then((invoices) => ({
        count,
        rows: invoices.map((invoice) => invoice.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Invoice.findOne({ 'invoiceId': params.id })
    .populate('user')
    .then(notFound(res))
    .then((invoice) => invoice ? invoice.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Invoice.findOne({ 'invoiceId': params.id })
    .populate('user')
    .then(notFound(res))
    //.then(authorOrAdmin(res, user, 'user'))
    .then((invoice) => invoice ? Object.assign(invoice, body).save() : null)
    .then((invoice) => invoice ? invoice.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Invoice.findOne({ 'invoiceId': params.id })
    .then(notFound(res))
    .then((invoice) => invoice ? invoice.remove() : null)
    .then(success(res, 204))
    .catch(next)
