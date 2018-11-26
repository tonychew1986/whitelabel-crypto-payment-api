import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, updateStatistic, destroy } from './controller'
import { schema } from './model'
export Statistic, { schema } from './model'

const router = new Router()
const { walletGenerationNumber, masterPublicKeyBTC, masterPublicKeyLTC, masterPublicKeyETH, masterPublicKeyTestnetBTC, masterPublicKeyTestnetLTC, masterPublicKeyTestnetETH, masterPublicKeyDASH } = schema.tree

/**
 * @api {post} /statistics Create statistic
 * @apiName CreateStatistic
 * @apiGroup Statistic
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam walletGenerationNumber Statistic's walletGenerationNumber.
 * @apiSuccess {Object} statistic Statistic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Statistic not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ walletGenerationNumber }),
  create)

/**
 * @api {get} /statistics Retrieve statistics
 * @apiName RetrieveStatistics
 * @apiGroup Statistic
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of statistics.
 * @apiSuccess {Object[]} rows List of statistics.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /statistics/:id Retrieve statistic
 * @apiName RetrieveStatistic
 * @apiGroup Statistic
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} statistic Statistic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Statistic not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /statistics/:id/wallet Update statistic
 * @apiName UpdateStatistic
 * @apiGroup Statistic
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam walletGenerationNumber Statistic's walletGenerationNumber.
 * @apiSuccess {Object} statistic Statistic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Statistic not found.
 * @apiError 401 admin access only.
 */
router.put('/:id/wallet',
  token({ required: true, roles: ['admin'] }),
  body({ walletGenerationNumber }),
  update)

/**
* @api {put} /statistics/:id/masterpublickey/btc Update statistic
* @apiName UpdateStatistic
* @apiGroup Statistic
* @apiPermission admin
* @apiParam {String} access_token admin access token.
* @apiParam masterPublicKeyBTC Statistic's masterPublicKeyBTC.
* @apiSuccess {Object} statistic Statistic's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Statistic not found.
* @apiError 401 admin access only.
*/
router.put('/:id/masterpublickey/btc',
  token({ required: true, roles: ['admin'] }),
  body({ masterPublicKeyBTC }),
  update)

/**
* @api {put} /statistics/:id/masterpublickey/testnet/btc Update statistic
* @apiName UpdateStatistic
* @apiGroup Statistic
* @apiPermission admin
* @apiParam {String} access_token admin access token.
* @apiParam masterPublicKeyTestnetBTC Statistic's masterPublicKeyTestnetBTC.
* @apiSuccess {Object} statistic Statistic's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Statistic not found.
* @apiError 401 admin access only.
*/
router.put('/:id/masterpublickey/testnet/btc',
  token({ required: true, roles: ['admin'] }),
  body({ masterPublicKeyTestnetBTC }),
  update)

/**
 * @api {put} /statistics/:id/masterpublickey/ltc Update statistic
 * @apiName UpdateStatistic
 * @apiGroup Statistic
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam masterPublicKeyLTC Statistic's masterPublicKeyLTC.
 * @apiSuccess {Object} statistic Statistic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Statistic not found.
 * @apiError 401 admin access only.
 */
router.put('/:id/masterpublickey/ltc',
  token({ required: true, roles: ['admin'] }),
  body({ masterPublicKeyLTC }),
  update)

/**
* @api {put} /statistics/:id/masterpublickey/testnet/ltc Update statistic
* @apiName UpdateStatistic
* @apiGroup Statistic
* @apiPermission admin
* @apiParam {String} access_token admin access token.
* @apiParam masterPublicKeyTestnetLTC Statistic's masterPublicKeyTestnetLTC.
* @apiSuccess {Object} statistic Statistic's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Statistic not found.
* @apiError 401 admin access only.
*/
router.put('/:id/masterpublickey/testnet/ltc',
  token({ required: true, roles: ['admin'] }),
  body({ masterPublicKeyTestnetLTC }),
  update)

/**
 * @api {put} /statistics/:id/masterpublickey/eth Update statistic
 * @apiName UpdateStatistic
 * @apiGroup Statistic
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam masterPublicKeyETH Statistic's masterPublicKeyETH.
 * @apiSuccess {Object} statistic Statistic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Statistic not found.
 * @apiError 401 admin access only.
 */
router.put('/:id/masterpublickey/eth',
  token({ required: true, roles: ['admin'] }),
  body({ masterPublicKeyETH }),
  update)

/**
* @api {put} /statistics/:id/masterpublickey/testnet/eth Update statistic
* @apiName UpdateStatistic
* @apiGroup Statistic
* @apiPermission admin
* @apiParam {String} access_token admin access token.
* @apiParam masterPublicKeyTestnetETH Statistic's masterPublicKeyTestnetETH.
* @apiSuccess {Object} statistic Statistic's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Statistic not found.
* @apiError 401 admin access only.
*/
router.put('/:id/masterpublickey/testnet/eth',
  token({ required: true, roles: ['admin'] }),
  body({ masterPublicKeyTestnetETH }),
  update)

/**
 * @api {put} /statistics/:id/masterpublickey/dash Update statistic
 * @apiName UpdateStatistic
 * @apiGroup Statistic
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam masterPublicKeyETH Statistic's masterPublicKeyETH.
 * @apiSuccess {Object} statistic Statistic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Statistic not found.
 * @apiError 401 admin access only.
 */
router.put('/:id/masterpublickey/dash',
  token({ required: true, roles: ['admin'] }),
  body({ masterPublicKeyDASH }),
  update)

/**
 * @api {delete} /statistics/:id Delete statistic
 * @apiName DeleteStatistic
 * @apiGroup Statistic
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Statistic not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
