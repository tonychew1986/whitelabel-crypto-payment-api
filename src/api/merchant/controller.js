import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Merchant } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Merchant.create({ ...body, user })
    .then((merchant) => merchant.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Merchant.count(query)
    .then(count => Merchant.find(query, select, cursor)
      .populate('user')
      .then((merchants) => ({
        count,
        rows: merchants.map((merchant) => merchant.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Merchant.findOne({ 'merchantId': params.id })
    .populate('user')
    .then(notFound(res))
    .then((merchant) => merchant ? merchant.view() : null)
    .then(success(res))
    .catch(next)

export const showRegistry = ({ params }, res, next) =>
  Merchant.findOne({ 'ownerId': params.userId })
    .populate('user')
    .then(notFound(res))
    .then((merchant) => merchant ? merchant.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Merchant.findOne({ 'merchantId': params.id })
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((merchant) => merchant ? Object.assign(merchant, body).save() : null)
    .then((merchant) => merchant ? merchant.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Merchant.findOne({ 'merchantId': params.id })
    .then(notFound(res))
    .then((merchant) => merchant ? merchant.remove() : null)
    .then(success(res, 204))
    .catch(next)
