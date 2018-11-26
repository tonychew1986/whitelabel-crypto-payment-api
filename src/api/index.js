import { Router } from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import merchant from './merchant'
import financial from './financial'
import transaction from './transaction'
import statistic from './statistic'
import settlement from './settlement'
import invoice from './invoice'
import key from './key'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/merchants', merchant)
router.use('/financials', financial)
router.use('/transactions', transaction)
router.use('/statistics', statistic)
router.use('/settlements', settlement)
router.use('/invoices', invoice)
router.use('/keys', key)

export default router
