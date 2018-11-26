import { success, notFound } from '../../services/response/'
import { Settlement } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Settlement.create(body)
    .then((settlement) => settlement.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Settlement.count(query)
    .then(count => Settlement.find(query, select, cursor)
      .then((settlements) => ({
        count,
        rows: settlements.map((settlement) => settlement.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Settlement.findOne({ 'invoiceId': params.id })
    .then(notFound(res))
    .then((settlement) => settlement ? settlement.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Settlement.findOne({ 'invoiceId': params.id })
    .then(notFound(res))
    .then((settlement) => settlement ? Object.assign(settlement, body).save() : null)
    .then((settlement) => settlement ? settlement.view(true) : null)
    .then(success(res))
    .catch(next)


export const destroy = ({ params }, res, next) =>
  Settlement.findOne({ 'invoiceId': params.id })
    .then(notFound(res))
    .then((settlement) => settlement ? settlement.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const destroyByOid = ({ params }, res, next) =>
  Settlement.findById(params.id)
    .then(notFound(res))
    .then((settlement) => settlement ? settlement.remove() : null)
    .then(success(res, 204))
    .catch(next)
