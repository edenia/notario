var expect = require('chai').expect

const { Api, JsonRpc } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig') // development only
const fetch = require('node-fetch') // node only
const { TextDecoder, TextEncoder } = require('util') // node only

const privateKeys = [process.env.PVK]

const signatureProvider = new JsSignatureProvider(privateKeys)
const rpc = new JsonRpc(process.env.EOSIO_API_ENDPOINT, { fetch })
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
})

describe('Global eos', () => {
  it('is an object', () => {
    expect(eos).to.be.an('object')
  })

  it(`can get chain info and chainId is ${process.env.EOSIO_CHAIN_ID}`, async () => {
    const chainInfo = await eos.rpc.get_info({})
    expect(chainInfo).to.be.an('object')
    expect(chainInfo.chain_id).to.equal(process.env.EOSIO_CHAIN_ID)
  })

  it('can get account "eosio"', async () => {
    const eosioAccount = await eos.rpc.get_account('eosio')
    expect(eosioAccount.account_name).to.equal('eosio')
  })
})

describe('notarioeoscr', () => {
  it(`can get rows`, async () => {
    const resp = await eos.rpc.get_table_rows({
      json: true, // Get the response as json
      code: 'notarioeoscr', // Contract that we target
      scope: 'notarioeoscr', // Account that owns the data
      table: 'libro', // Table name
      limit: 10, // Maximum number of rows that we want to get
      reverse: false, // Optional: Get reversed data
      show_payer: false, // Optional: Show ram payer
    })
    console.log(resp.rows)
    expect(resp.rows).to.be.an('array')
  })
  it(`can send action anotar`, async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: 'notarioeoscr',
              name: 'anotar',
              authorization: [
                {
                  actor: 'notariotest1',
                  permission: 'active',
                },
              ],
              data: {
                usuario: 'notariotest1',
                hash:
                  'a0ccb78ba8f1e4bb1e6ff48e1af2029275de2490cce96e3f73eebca009e5649b',
                guardar_en_tabla: true,
                titulo: '',
                contenido: '',
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
      console.log('result', result)
    } catch (error) {
      console.log('error', error)
    }
    // console.log(resp.rows)
    // expect(resp.rows).to.be.an('array')
  })
})
