import { Scatter } from 'ual-scatter'
import { Ledger } from 'ual-ledger'
import { Lynx } from 'ual-lynx'
import { TokenPocket } from 'ual-token-pocket'
import { MeetOne } from 'ual-meetone'
import { Anchor } from 'ual-anchor'

const appName = 'notarioeoscr'
const network = {
  chainId: '73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d',
  rpcEndpoints: [
    {
      blockchain: 'eos',
      protocol: 'https',
      host: 'jungle.eosusa.io',
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
