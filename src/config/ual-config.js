import { Scatter } from 'ual-scatter'
import { Ledger } from 'ual-ledger'
import { Lynx } from 'ual-lynx'
import { TokenPocket } from 'ual-token-pocket'
import { MeetOne } from 'ual-meetone'
import { Anchor } from 'ual-anchor'

const appName = 'eoscrnotarize'
const network = {
  chainId: '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840',
  rpcEndpoints: [
    {
      blockchain: 'eos',
      protocol: 'https',
      host: 'jungle.eosio.cr',
      port: parseInt('443')
    }
  ]
}
const authenticators = [
  new Lynx([network]),
  new Ledger([network]),
  new Scatter([network], { appName }),
  new TokenPocket([network.chainId]),
  new MeetOne([network.chainId]),
  new Anchor([network], { appName })
]

export const ualConfig = {
  appName,
  network,
  authenticators
}
