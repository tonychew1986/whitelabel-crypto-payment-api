import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy, indexByType, destroyByOid } from './controller'
import { schema } from './model'
export Financial, { schema } from './model'

const router = new Router()
const { accountType, accountId, accountName, balanceBTC, balanceETH, balanceLTC, balanceUSD, balanceSGD, balanceTestnetBTC, balanceTestnetETH, balanceTestnetLTC, balanceTestnetUSD, balanceTestnetSGD } = schema.tree

/**
 * @api {post} /financials Create financial
 * @apiName CreateFinancial
 * @apiGroup Financial
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam accountType Financial's accountType.
 * @apiParam accountOwner Financial's accountOwner.
 * @apiParam balance Financial's balance.
 * @apiParam transactionHistory Financial's transactionHistory.
 * @apiSuccess {Object} financial Financial's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Financial not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ accountType, accountId, accountName, balanceBTC, balanceETH, balanceLTC, balanceUSD, balanceSGD, balanceTestnetBTC, balanceTestnetETH, balanceTestnetLTC, balanceTestnetUSD, balanceTestnetSGD }),
  create)

/**
 * @api {get} /financials Retrieve financials
 * @apiName RetrieveFinancials
 * @apiGroup Financial
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of financials.
 * @apiSuccess {Object[]} rows List of financials.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
* @api {get} /financials Retrieve financials
* @apiName RetrieveFinancials
* @apiGroup Financial
* @apiPermission user
* @apiParam {String} access_token user access token.
* @apiUse listParams
* @apiSuccess {Number} count Total amount of transactions.
* @apiSuccess {Object[]} rows List of transactions.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 401 user access only.
*/
router.get('/type',
token({ required: true }),
query({ q: { paths: ['accountType'] } }),
indexByType)

/**
 * @api {get} /financials/:id Retrieve financial
 * @apiName RetrieveFinancial
 * @apiGroup Financial
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} financial Financial's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Financial not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {get} /financials/:id Retrieve financial
 * @apiName RetrieveFinancial
 * @apiGroup Financial
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} financial Financial's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Financial not found.
 * @apiError 401 user access only.
 */
router.get('/:id/master',
  master(),
  show)

/**
 * @api {put} /financials/:id Update financial
 * @apiName UpdateFinancial
 * @apiGroup Financial
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam accountType Financial's accountType.
 * @apiParam accountOwner Financial's accountOwner.
 * @apiParam balance Financial's balance.
 * @apiParam transactionHistory Financial's transactionHistory.
 * @apiSuccess {Object} financial Financial's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Financial not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ accountType, accountId, accountName, balanceBTC, balanceETH, balanceLTC, balanceUSD, balanceSGD, balanceTestnetBTC, balanceTestnetETH, balanceTestnetLTC, balanceTestnetUSD, balanceTestnetSGD }),
  update)


/**
* @api {put} /financials/:id Update financial
* @apiName UpdateFinancial
* @apiGroup Financial
* @apiPermission admin
* @apiParam {String} access_token admin access token.
* @apiParam accountType Financial's accountType.
* @apiParam accountOwner Financial's accountOwner.
* @apiParam balance Financial's balance.
* @apiParam transactionHistory Financial's transactionHistory.
* @apiSuccess {Object} financial Financial's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Financial not found.
* @apiError 401 admin access only.
*/
router.put('/:id/name',
  token({ required: true, roles: ['admin'] }),
  body({ accountName }),
  update)

/**
 * @api {put} /financials/:id/sgd Update financial
 * @apiName UpdateFinancial
 * @apiGroup Financial
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam accountType Financial's accountType.
 * @apiParam accountOwner Financial's accountOwner.
 * @apiParam balance Financial's balance.
 * @apiParam transactionHistory Financial's transactionHistory.
 * @apiSuccess {Object} financial Financial's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Financial not found.
 * @apiError 401 admin access only.
 */
router.put('/:id/balance',
  master(),
  //token({ required: true, roles: ['admin'] }),
  body({ balanceSGD, balanceUSD }),
  update)

/**
 * @api {put} /financials/:id/sgd Update financial
 * @apiName UpdateFinancial
 * @apiGroup Financial
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam accountType Financial's accountType.
 * @apiParam accountOwner Financial's accountOwner.
 * @apiParam balance Financial's balance.
 * @apiParam transactionHistory Financial's transactionHistory.
 * @apiSuccess {Object} financial Financial's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Financial not found.
 * @apiError 401 admin access only.
 */
router.put('/:id/balanceTestnet',
  master(),
  //token({ required: true, roles: ['admin'] }),
  body({ balanceTestnetSGD, balanceTestnetUSD }),
  update)


/**
 * @api {delete} /financials/:id Delete financial
 * @apiName DeleteFinancial
 * @apiGroup Financial
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Financial not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

/**
 * @api {delete} /financials/oid/:id Delete financial
 * @apiName DeleteFinancial
 * @apiGroup Financial
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Financial not found.
 * @apiError 401 master access only.
 */
router.delete('/oid/:id',
  token({ required: true, roles: ['admin'] }),
  destroyByOid)

export default router
