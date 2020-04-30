var expect = require('chai').expect

const { Api, JsonRpc, RpcError } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig') // development only
const fetch = require('node-fetch') // node only
const { TextDecoder, TextEncoder } = require('util') // node only
const SHA256 = require("crypto-js/sha256")

const privateKeys = [process.env.PVK]

const signatureProvider = new JsSignatureProvider(privateKeys)
const rpc = new JsonRpc(process.env.EOSIO_API_ENDPOINT, { fetch })
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
})

const contractName = 'notarioeoscr'
const testAccountName = 'notariotest1'

describe('notarioeoscr', () => {
  it(`can get rows`, async () => {
    const resp = await rpc.get_table_rows({
      json: true,
      code: contractName,
      scope: contractName,
      table: 'libro',
      limit: 10,
      reverse: false,
      show_payer: false
    })
    expect(resp.rows).to.be.an('array')
  })

  let content = `TEST + ${new Date().getTime()}`
  let testHash1 = SHA256(content).toString()
  it(`can send action anotar with content ${content} and hash ${testHash1}`, async () => {
    let error
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contractName,
              name: 'anotar',
              authorization: [
                {
                  actor: testAccountName,
                  permission: 'active',
                },
              ],
              data: {
                usuario: testAccountName,
                hash: testHash1,
                guardar_en_tabla: true,
                titulo: '',
                contenido: content,
                comentario: '',
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      )
      expect(result).to.be.an('object')
      expect(result).to.have.property('transaction_id');
    } catch (e) {
      error = e
    }
  })
  it(`get error action anotar if content ${content} and hash ${testHash1} is duplicated`, async () => {
    let error
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contractName,
              name: 'anotar',
              authorization: [
                {
                  actor: testAccountName,
                  permission: 'active',
                },
              ],
              data: {
                usuario: testAccountName,
                hash: testHash1,
                guardar_en_tabla: true,
                titulo: '',
                contenido: content,
                comentario: '',
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      )
    } catch (e) {
      error = e
    }
    expect(error).to.not.be.undefined
  })
})
