import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, showByMerchant, show, update, destroy } from './controller'
import { schema } from './model'
export Invoice, { schema } from './model'

const router = new Router()
const { status, merchantId, merchantName, amount, currency, productReference, priceBTC, priceETH, priceLTC, network, urlCallback, urlCancel, urlComplete, customerName, customerEmail, customerMobile, customerCountry, customerAddress, customerCity, customerState, customerPostal, invoiceId, description, USDSGD, amountBTC, amountETH, amountLTC, paidCryptocurrency, blockchainHash, cryptoAddress, paymentType, platform } = schema.tree

/**
 * @api {post} /invoices Create invoice
 * @apiName CreateInvoice
 * @apiGroup Invoice
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam merchantId Invoice's merchantId.
 * @apiParam merchantName Invoice's merchantName.
 * @apiParam amount Invoice's amount.
 * @apiParam currency Invoice's currency.
 * @apiParam productReference Invoice's productReference.
 * @apiParam network Invoice's network.
 * @apiParam urlCallback Invoice's urlCallback.
 * @apiParam urlCancel Invoice's urlCancel.
 * @apiParam urlComplete Invoice's urlComplete.
 * @apiParam customerName Invoice's customerName.
 * @apiParam customerEmail Invoice's customerEmail.
 * @apiParam customerMobile Invoice's customerMobile.
 * @apiParam customerCountry Invoice's customerCountry.
 * @apiParam customerAddress Invoice's customerAddress.
 * @apiParam customerCity Invoice's customerCity.
 * @apiParam customerState Invoice's customerState.
 * @apiParam customerPostal Invoice's customerPostal.
 * @apiParam invoiceId Invoice's invoiceId.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 user access only.
 */
router.post('/',
  //token({ required: true }),
  body({ status, merchantId, merchantName, amount, currency, productReference, priceBTC, priceETH, priceLTC, network, urlCallback, urlCancel, urlComplete, customerName, customerEmail, customerMobile, customerCountry, customerAddress, customerCity, customerState, customerPostal, invoiceId, description, USDSGD, amountBTC, amountETH, amountLTC, paidCryptocurrency, blockchainHash, cryptoAddress, paymentType, platform }),
  create)

/**
 * @api {get} /invoices Retrieve invoices
 * @apiName RetrieveInvoices
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of invoices.
 * @apiSuccess {Object[]} rows List of invoices.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  //token({ required: true, roles: ['admin'] }),
  query(),
  index)


/**
 * @api {get} /invoices/:id Retrieve invoice
 * @apiName RetrieveInvoice
 * @apiGroup Invoice
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  //token({ required: true }),
  show)

/**
 * @api {get} /invoices/merchant/:id Retrieve invoice
 * @apiName RetrieveInvoice
 * @apiGroup Invoice
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 user access only.
 */
router.get('/merchant/:id',
  //token({ required: true }),
  query(),
  showByMerchant)

/**
 * @api {put} /invoices/:id Update invoice
 * @apiName UpdateInvoice
 * @apiGroup Invoice
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Merchant's name.
 * @apiParam status Merchant's status.
 * @apiParam paidCryptocurrency Merchant's paidCryptocurrency.
 * @apiParam blockchainHash Merchant's blockchainHash.
 * @apiSuccess {Object} merchant Merchant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Merchant not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  //token({ required: true }),
  body({ status, paidCryptocurrency, blockchainHash, cryptoAddress, paymentType, platform }),
  update)

/**
 * @api {put} /invoices/:id/settled Update invoice details
 * @apiName UpdateInvoiceDetails
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} [transactionStatus] status Invoice's status.
 * @apiSuccess {Object} transaction Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 admin access only.
 */
router.put('/:id/settled',
  //master(),
  body({ status }),
  update)

/**
 * @api {delete} /invoices/:id Delete invoice
 * @apiName DeleteInvoice
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Invoice not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
