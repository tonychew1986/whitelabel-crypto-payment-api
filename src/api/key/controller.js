import { success, notFound } from '../../services/response/'
import { Key } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Key.create(body)
    .then((key) => key.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Key.count(query)
    .then(count => Key.find(query, select, cursor)
      .then((keys) => ({
        count,
        rows: keys.map((key) => key.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Key.findById(params.id)
    .then(notFound(res))
    .then((key) => key ? key.view() : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Key.findOne({ 'keyId': params.id })
    .then(notFound(res))
    .then((key) => key ? key.remove() : null)
    .then(success(res, 204))
    .catch(next)
