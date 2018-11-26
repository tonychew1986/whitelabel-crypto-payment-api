import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, showRegistry, update, destroy } from './controller'
import { schema } from './model'
export Merchant, { schema } from './model'

const router = new Router()
const { name, merchantId, addressBTC, addressETH, addressLTC, addressTestnetBTC, addressTestnetETH, addressTestnetLTC, ownerId, ownerName, address, mobile, country, accountTier, accountStatus, walletSet, walletKeyNum } = schema.tree

/**
 * @api {post} /merchants Create merchant
 * @apiName CreateMerchant
 * @apiGroup Merchant
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Merchant's name.
 * @apiParam addressBTC Merchant's BTC address.
 * @apiParam addressETH Merchant's ETH address.
 * @apiParam addressLTC Merchant's LTC address.
 * @apiParam ownerId Merchant's owner Id.
 * @apiParam ownerName Merchant's owner Name.
 * @apiParam address Merchant's address.
 * @apiParam mobile Merchant's mobile.
 * @apiParam country Merchant's country.
 * @apiParam accountTier Merchant's accountTier.
 * @apiParam accountStatus Merchant's accountStatus.
 * @apiSuccess {Object} merchant Merchant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Merchant not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, merchantId, addressBTC, addressETH, addressLTC, addressTestnetBTC, addressTestnetETH, addressTestnetLTC, ownerId, ownerName, address, mobile, country, accountTier, accountStatus }),
  create)

/**
 * @api {get} /merchants Retrieve merchants
 * @apiName RetrieveMerchants
 * @apiGroup Merchant
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of merchants.
 * @apiSuccess {Object[]} rows List of merchants.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /merchants/:id Retrieve merchant
 * @apiName RetrieveMerchant
 * @apiGroup Merchant
 * @apiPermission user
 * @apiSuccess {Object} merchant Merchant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Merchant not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: false }),
  show)

/**
 * @api {get} /merchants/registry/:userId Retrieve merchant based on User Id ( Merchant Registry )
 * @apiName RetrieveMerchant
 * @apiGroup Merchant
 * @apiPermission user
 * @apiSuccess {Object} merchant Merchant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Merchant not found.
 * @apiError 401 user access only.
 */
router.get('/registry/:userId',
  token({ required: false }),
  showRegistry)

/**
 * @api {put} /merchants/:id/address Update merchant crypto address
 * @apiName UpdateMerchantCryptoAdress
 * @apiGroup Merchant
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam addressBTC Merchant's BTC address.
 * @apiParam addressLTC Merchant's LTC address.
 * @apiParam addressETH Merchant's ETH address.
 * @apiParam addressTestnetBTC Merchant's BTC Testnet address.
 * @apiParam addressTestnetLTC Merchant's LTC Testnet address.
 * @apiParam addressTestnetETH Merchant's ETH Testnet address.
 * @apiParam walletSet Merchant's Wallet Set.
 * @apiParam walletKeyNum Merchant's Wallet Generation Number.
 * @apiSuccess {Object} merchant Merchant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Merchant not found.
 * @apiError 401 user access only.
 */
router.put('/:id/address',
  token({ required: true }),
  body({ addressBTC, addressLTC, addressETH, addressTestnetBTC, addressTestnetETH, addressTestnetLTC, walletSet, walletKeyNum }),
  update)

/**
 * @api {put} /merchants/:id/btc Update merchant BTC address
 * @apiName UpdateMerchantBTC
 * @apiGroup Merchant
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam addressBTC Merchant's BTC address.
 * @apiSuccess {Object} merchant Merchant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Merchant not found.
 * @apiError 401 user access only.
 */
router.put('/:id/btc',
  token({ required: true }),
  body({ addressBTC }),
  update)

/**
 * @api {put} /merchants/:id/eth Update merchant ETH address
 * @apiName UpdateMerchantETH
 * @apiGroup Merchant
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam addressETH Merchant's ETH address.
 * @apiSuccess {Object} merchant Merchant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Merchant not found.
 * @apiError 401 user access only.
 */
router.put('/:id/eth',
  token({ required: true }),
  body({ addressETH }),
  update)

/**
 * @api {put} /merchants/:id/ltc Update merchant LTC address
 * @apiName UpdateMerchantLTC
 * @apiGroup Merchant
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam addressLTC Merchant's LTC address.
 * @apiSuccess {Object} merchant Merchant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Merchant not found.
 * @apiError 401 user access only.
 */
router.put('/:id/ltc',
  token({ required: true }),
  body({ addressLTC }),
  update)

/**
 * @api {put} /merchants/:id Update merchant
 * @apiName UpdateMerchant
 * @apiGroup Merchant
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Merchant's name.
 * @apiParam ownerId Merchant's owner Id.
 * @apiParam ownerName Merchant's owner Name.
 * @apiParam address Merchant's address.
 * @apiParam mobile Merchant's mobile.
 * @apiParam country Merchant's country.
 * @apiSuccess {Object} merchant Merchant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Merchant not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, ownerId, ownerName, address, mobile, country }),
  update)

/**
 * @api {put} /merchants/:id/status Update merchant status
 * @apiName UpdateMerchant
 * @apiGroup Merchant
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam accountTier Merchant's accountTier.
 * @apiParam accountStatus Merchant's accountStatus.
 * @apiSuccess {Object} merchant Merchant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Merchant not found.
 * @apiError 401 user access only.
 */
router.put('/:id/status',
  token({ required: true }),
  body({ accountTier, accountStatus }),
  update)

/**
 * @api {delete} /merchants/:id Delete merchant
 * @apiName DeleteMerchant
 * @apiGroup Merchant
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Merchant not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
