import { success, notFound } from '../../services/response/'
import { Financial } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Financial.create(body)
    .then((financial) => financial.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Financial.count(query)
    .then(count => Financial.find(query, select, cursor)
      .then((financials) => ({
        count,
        rows: financials.map((financial) => financial.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const indexByType = ({ querymen: { query, select, cursor } }, res, next) =>
  Financial.count(query)
    .then(count => Financial.find(query, select, cursor)
      .then((financials) => ({
        count,
        rows: financials.map((financial) => financial.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Financial.findOne({ 'accountId': params.id })
    .then(notFound(res))
    .then((financial) => financial ? financial.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Financial.findOne({ 'accountId': params.id })
    .then(notFound(res))
    .then((financial) => financial ? Object.assign(financial, body).save() : null)
    .then((financial) => financial ? financial.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Financial.findOne({ 'accountId': params.id })
    .then(notFound(res))
    .then((financial) => financial ? financial.remove() : null)
    .then(success(res, 204))
    .catch(next)


export const destroyByOid = ({ params }, res, next) =>
  Financial.findById(params.id)
    .then(notFound(res))
    .then((financial) => financial ? financial.remove() : null)
    .then(success(res, 204))
    .catch(next)
