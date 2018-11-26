import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, destroy } from './controller'
import { schema } from './model'
export Key, { schema } from './model'

const router = new Router()
const { merchantId, keyLabel, keyId } = schema.tree

/**
 * @api {post} /keys Create key
 * @apiName CreateKey
 * @apiGroup Key
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam merchantId Key's merchantId.
 * @apiParam keyLabel Key's keyLabel.
 * @apiParam keyId Key's keyId.
 * @apiSuccess {Object} key Key's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Key not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ merchantId, keyLabel, keyId }),
  create)

/**
 * @api {get} /keys Retrieve keys
 * @apiName RetrieveKeys
 * @apiGroup Key
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of keys.
 * @apiSuccess {Object[]} rows List of keys.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /keys/:id Retrieve key
 * @apiName RetrieveKey
 * @apiGroup Key
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} key Key's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Key not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {delete} /keys/:id Delete key
 * @apiName DeleteKey
 * @apiGroup Key
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Key not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
