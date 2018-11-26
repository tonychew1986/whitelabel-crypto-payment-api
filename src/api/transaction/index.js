import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, confirmation, index, indexByStatus, indexByMerchant, show, update, destroy, destroyByOid } from './controller'
import { schema } from './model'
export Transaction, { schema } from './model'

const router = new Router()
const { transactionStatus, paymentDollarValue, merchantId, merchantName, cryptocurrencyType, cryptocurrencyPaid, paymentCurrency, network, addressReceiver, addressSender, paymentType, cryptocurrencyPrice, transactionId, shippingName, shippingEmail, shippingMobile, shippingCountry, shippingAddress, shippingPostal, transactionHash, rewardAwarded, userId, merchantType, transactionMeta, productReference } = schema.tree

/**
 * @api {post} /purchase-confirmation Send email when purchase confirms
 * @apiName TransactionConfirmation
 * @apiGroup Transaction
 * @apiPermission master
 * @apiParam {String} transactionId Transaction's transactionId.
 * @apiSuccess (Success 202) 202 Accepted.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.post('/purchase-confirmation',
  master(),
  body({ transactionId }),
  confirmation)

/**
 * @api {post} /transactions Create transaction
 * @apiName CreateTransaction
 * @apiGroup Transaction
 * @apiParam {String} transactionStatus Transaction's transactionStatus.
 * @apiParam {String} paymentDollarValue Transaction's paymentDollarValue.
 * @apiParam {String} merchantId Transaction's merchantId.
 * @apiParam {String} merchantName Transaction's merchantName.
 * @apiParam {String} cryptocurrencyType Transaction's cryptocurrencyType.
 * @apiParam {String} cryptocurrencyPaid Transaction's cryptocurrencyPaid.
 * @apiParam {String} paymentCurrency Transaction's paymentCurrency.
 * @apiParam {String} network Transaction's network.
 * @apiParam {String} addressReceiver Transaction's addressReceiver.
 * @apiParam {String} addressSender Transaction's addressSender.
 * @apiParam {String} paymentType Transaction's paymentType.
 * @apiParam {String} cryptocurrencyPrice Transaction's cryptocurrencyPrice.
 * @apiParam {String} transactionId Transaction's transactionId.
 * @apiParam {String} shippingName Transaction's shippingName.
 * @apiParam {String} shippingEmail Transaction's shippingEmail.
 * @apiParam {String} shippingMobile Transaction's shippingMobile.
 * @apiParam {String} shippingCountry Transaction's shippingCountry.
 * @apiParam {String} shippingAddress Transaction's shippingAddress.
 * @apiParam {String} shippingPostal Transaction's shippingPostal.
 * @apiParam {String} transactionHash Transaction's transactionHash.
 * @apiParam {String} rewardAwarded Transaction's rewardAwarded.
 * @apiParam {String} userId Transaction's userId.
 * @apiParam {String} merchantType Transaction's merchantType.
 * @apiParam {String} [transactionMeta] transactionMeta Transaction's meta data.
 * @apiParam {String} productReference Transaction's product reference code.
 * @apiSuccess {Object} transaction Transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaction not found.
 */
router.post('/',
  body({ transactionStatus, paymentDollarValue, merchantId, merchantName, cryptocurrencyType, cryptocurrencyPaid, paymentCurrency, network, addressReceiver, addressSender, paymentType, cryptocurrencyPrice, transactionId, shippingName, shippingEmail, shippingMobile, shippingCountry, shippingAddress, shippingPostal, transactionHash, rewardAwarded, userId, merchantType, transactionMeta, productReference }),
  create)


/**
* @api {get} /transactions Retrieve transactions
* @apiName RetrieveTransactions
* @apiGroup Transaction
* @apiPermission user
* @apiParam {String} access_token user access token.
* @apiUse listParams
* @apiSuccess {Number} count Total amount of transactions.
* @apiSuccess {Object[]} rows List of transactions.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 401 user access only.
*/
router.get('/status',
token({ required: true }),
query({ q: { paths: ['transactionStatus'] } }),
indexByStatus)


/**
* @api {get} /transactions/merchant Retrieve transactions
* @apiName RetrieveTransactions
* @apiGroup Transaction
* @apiPermission user
* @apiParam {String} access_token user access token.
* @apiUse listParams
* @apiSuccess {Number} count Total amount of transactions.
* @apiSuccess {Object[]} rows List of transactions.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 401 user access only.
*/
router.get('/merchant',
token({ required: true }),
query({ q: { paths: ['merchantId'] } }),
indexByMerchant)

/**
 * @api {get} /transactions Retrieve transactions
 * @apiName RetrieveTransactions
 * @apiGroup Transaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of transactions.
 * @apiSuccess {Object[]} rows List of transactions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /transactions/:id Retrieve transaction
 * @apiName RetrieveTransaction
 * @apiGroup Transaction
 * @apiPermission user
 * @apiSuccess {Object} transaction Transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaction not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  //token({ required: true }),
  show)

/**
 * @api {put} /transactions/:id Update transaction
 * @apiName UpdateTransaction
 * @apiGroup Transaction
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} [transactionStatus] transactionStatus Transaction's transactionStatus.
 * @apiParam {String} [paymentDollarValue] paymentDollarValue Transaction's paymentDollarValue.
 * @apiParam {String} [merchantId] merchantId Transaction's merchantId.
 * @apiParam {String} [cryptocurrencyType] cryptocurrencyType Transaction's cryptocurrencyType.
 * @apiParam {String} [cryptocurrencyPaid] cryptocurrencyPaid Transaction's cryptocurrencyPaid.
 * @apiParam {String} [paymentCurrency] paymentCurrency Transaction's paymentCurrency.
 * @apiParam {String} [network] network Transaction's network.
 * @apiParam {String} [addressReceiver] addressReceiver Transaction's addressReceiver.
 * @apiParam {String} [addressSender] addressSender Transaction's addressSender.
 * @apiParam {String} [paymentType] paymentType Transaction's paymentType.
 * @apiParam {String} [cryptocurrencyPrice] cryptocurrencyPrice Transaction's cryptocurrencyPrice.
 * @apiParam {String} [transactionId] transactionId Transaction's transactionId.
 * @apiParam {String} [shippingName] shippingName Transaction's shippingName.
 * @apiParam {String} [shippingEmail] shippingEmail Transaction's shippingEmail.
 * @apiParam {String} [shippingMobile] shippingMobile Transaction's shippingMobile.
 * @apiParam {String} [shippingCountry] shippingCountry Transaction's shippingCountry.
 * @apiParam {String} [shippingAddress] shippingAddress Transaction's shippingAddress.
 * @apiParam {String} [shippingPostal] shippingPostal Transaction's shippingPostal.
 * @apiParam {String} [transactionHash] transactionHash Transaction's transactionHash.
 * @apiParam {String} [rewardAwarded] rewardAwarded Transaction's rewardAwarded.
 * @apiParam {String} [userId] userId Transaction's userId.
 * @apiParam {String} [merchantType] merchantType Transaction's merchantType.
 * @apiParam {String} [transactionMeta] transactionMeta Transaction's meta data.
 * @apiParam {String} [productReference] productReference Transaction's product reference code.
 * @apiSuccess {Object} transaction Transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaction not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ transactionStatus, paymentDollarValue, merchantId, merchantName, cryptocurrencyType, cryptocurrencyPaid, paymentCurrency, network, addressReceiver, addressSender, paymentType, cryptocurrencyPrice, transactionId, shippingName, shippingEmail, shippingMobile, shippingCountry, shippingAddress, shippingPostal, transactionHash, rewardAwarded, userId, merchantType, transactionMeta, productReference }),
  update)

/**
 * @api {put} /transactions/:id/details Update transaction details
 * @apiName UpdateTransactionDetails
 * @apiGroup Transaction
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} [transactionStatus] transactionStatus Transaction's transactionStatus.
 * @apiParam {String} [addressSender] addressSender Transaction's addressSender.
 * @apiParam {String} [transactionHash] transactionHash Transaction's transactionHash.
 * @apiParam {String} [rewardAwarded] rewardAwarded Transaction's rewardAwarded.
 * @apiSuccess {Object} transaction Transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaction not found.
 * @apiError 401 admin access only.
 */
router.put('/:id/details',
  token({ required: true, roles: ['admin'] }),
  body({ transactionStatus, addressSender, transactionHash, rewardAwarded }),
  update)

/**
 * @api {put} /transactions/:id/settled Update transaction details
 * @apiName UpdateTransactionDetails
 * @apiGroup Transaction
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} [transactionStatus] transactionStatus Transaction's transactionStatus.
 * @apiSuccess {Object} transaction Transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaction not found.
 * @apiError 401 admin access only.
 */
router.put('/:id/settled',
  master(),
  body({ transactionStatus }),
  update)

/**
 * @api {delete} /transactions/oid/:id Delete transaction
 * @apiName DeleteTransaction
 * @apiGroup Transaction
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Transaction not found.
 * @apiError 401 admin access only.
 */
router.delete('/oid/:id',
  token({ required: true, roles: ['admin'] }),
  destroyByOid)

/**
 * @api {delete} /transactions/:id Delete transaction
 * @apiName DeleteTransaction
 * @apiGroup Transaction
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Transaction not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
