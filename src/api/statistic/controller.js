import { success, notFound } from '../../services/response/'
import { Statistic } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Statistic.create(body)
    .then((statistic) => statistic.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Statistic.count(query)
    .then(count => Statistic.find(query, select, cursor)
      .then((statistics) => ({
        count,
        rows: statistics.map((statistic) => statistic.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Statistic.findById(params.id)
    .then(notFound(res))
    .then((statistic) => statistic ? statistic.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Statistic.findById(params.id)
    .then(notFound(res))
    .then((statistic) => statistic ? Object.assign(statistic, body).save() : null)
    .then((statistic) => statistic ? statistic.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Statistic.findById(params.id)
    .then(notFound(res))
    .then((statistic) => statistic ? statistic.remove() : null)
    .then(success(res, 204))
    .catch(next)
