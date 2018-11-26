import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy, destroyByOid } from './controller'
import { schema } from './model'
export Settlement, { schema } from './model'

const router = new Router()
const { invoiceId, merchantId, cryptocurrencyType, cryptocurrencyPaid, cryptocurrencyPriceQuoted, paymentCurrency, paymentAmount, cryptocurrencyPriceSettled, exchangeSettled, paymentAmountReleased, feeCharged, network } = schema.tree

/**
 * @api {post} /settlements Create settlement
 * @apiName CreateSettlement
 * @apiGroup Settlement
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam invoiceId Settlement's invoiceId.
 * @apiParam merchantId Settlement's merchantId.
 * @apiParam cryptocurrencyType Settlement's cryptocurrencyType.
 * @apiParam cryptocurrencyPaid Settlement's cryptocurrencyPaid.
 * @apiParam cryptocurrencyPriceQuoted Settlement's cryptocurrencyPriceQuoted.
 * @apiParam paymentCurrency Settlement's paymentCurrency.
 * @apiParam paymentAmount Settlement's paymentAmount.
 * @apiParam cryptocurrencyPriceSettled Settlement's cryptocurrencyPriceSettled.
 * @apiParam exchangeSettled Settlement's exchangeSettled.
 * @apiSuccess {Object} settlement Settlement's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Settlement not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  master(),
  body({ invoiceId, merchantId, cryptocurrencyType, cryptocurrencyPaid, cryptocurrencyPriceQuoted, paymentCurrency, paymentAmount, cryptocurrencyPriceSettled, exchangeSettled, paymentAmountReleased, feeCharged, network }),
  create)

/**
 * @api {get} /settlements Retrieve settlements
 * @apiName RetrieveSettlements
 * @apiGroup Settlement
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of settlements.
 * @apiSuccess {Object[]} rows List of settlements.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /settlements/:id Retrieve settlement
 * @apiName RetrieveSettlement
 * @apiGroup Settlement
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} settlement Settlement's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Settlement not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /settlements/:id Update settlement
 * @apiName UpdateSettlement
 * @apiGroup Settlement
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam invoiceId Settlement's invoiceId.
 * @apiParam merchantId Settlement's merchantId.
 * @apiParam cryptocurrencyType Settlement's cryptocurrencyType.
 * @apiParam cryptocurrencyPaid Settlement's cryptocurrencyPaid.
 * @apiParam cryptocurrencyPriceQuoted Settlement's cryptocurrencyPriceQuoted.
 * @apiParam paymentCurrency Settlement's paymentCurrency.
 * @apiParam paymentAmount Settlement's paymentAmount.
 * @apiParam cryptocurrencyPriceSettled Settlement's cryptocurrencyPriceSettled.
 * @apiParam exchangeSettled Settlement's exchangeSettled.
 * @apiSuccess {Object} settlement Settlement's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Settlement not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ invoiceId, merchantId, cryptocurrencyType, cryptocurrencyPaid, cryptocurrencyPriceQuoted, paymentCurrency, paymentAmount, cryptocurrencyPriceSettled, exchangeSettled, network }),
  update)


/**
 * @api {delete} /settlements/:id Delete settlement
 * @apiName DeleteSettlement
 * @apiGroup Settlement
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Settlement not found.
 * @apiError 401 master access only.
 */
router.delete('/oid/:id',
  token({ required: true, roles: ['admin'] }),
  destroyByOid)

/**
 * @api {delete} /settlements/:id Delete settlement
 * @apiName DeleteSettlement
 * @apiGroup Settlement
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Settlement not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
