import { Api, JsonRpc } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import { TextEncoder, TextDecoder } from 'text-encoding'

const signatureProvider = new JsSignatureProvider([])

const rpc = new JsonRpc(
  process.env.REACT_APP_EOS_API || 'https://jungle.eosn.io'
)
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
})

export { api, rpc }
