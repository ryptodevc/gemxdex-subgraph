import {
  Trade as TradeEvent,
} from "../generated/Exchange/Exchange"
import {
  Token,
  Trade,
  Bundle
} from "../generated/schema"
import {
  updateTokenDayData,
  ZERO_BD,
  ZERO_BI,
  ONE_BI
} from './helpers'
import { getEthPriceInUSD, findEthPerToken } from './pricing'

export function handleTrade(event: TradeEvent): void {
  let entity = new Trade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.idn = event.params.id

  let tokenGet = Token.load(event.params.tokenGet.toHexString())
  if (tokenGet === null) {
    tokenGet = new Token(event.params.tokenGet.toHexString())

    tokenGet.derivedETH = ZERO_BD
    tokenGet.tradeVolume = ZERO_BD
    tokenGet.tradeVolumeUSD = ZERO_BD
    tokenGet.txCount = ZERO_BI
  }

  let tokenGive = Token.load(event.params.tokenGive.toHexString())
  if (tokenGive === null) {
    tokenGive = new Token(event.params.tokenGive.toHexString())

    tokenGive.derivedETH = ZERO_BD
    tokenGive.tradeVolume = ZERO_BD
    tokenGive.tradeVolumeUSD = ZERO_BD
    tokenGive.txCount = ZERO_BI
  }

  let bundle = Bundle.load('1')
  bundle.ethPrice = getEthPriceInUSD()
  bundle.save()

  tokenGet.derivedETH = findEthPerToken(tokenGet as Token)
  tokenGet.tradeVolume = tokenGet.tradeVolume.plus(event.params.amountGet.toBigDecimal())
  tokenGet.tradeVolumeUSD = tokenGet.tradeVolumeUSD.plus(event.params.amountGet.toBigDecimal().times(bundle.ethPrice).times(tokenGet.derivedETH))
  tokenGet.txCount = tokenGet.txCount.plus(ONE_BI)

  tokenGive.derivedETH = findEthPerToken(tokenGive as Token)
  tokenGive.tradeVolume = tokenGive.tradeVolume.plus(event.params.amountGive.toBigDecimal())
  tokenGet.tradeVolumeUSD = tokenGive.tradeVolumeUSD.plus(event.params.amountGet.toBigDecimal().times(bundle.ethPrice).times(tokenGive.derivedETH))
  tokenGive.txCount = tokenGive.txCount.plus(ONE_BI)
  
  tokenGet.save()
  tokenGive.save()

  updateTokenDayData(tokenGet as Token, event)
  updateTokenDayData(tokenGive as Token, event)
  
  entity.user = event.params.user
  entity.tokenGet = event.params.tokenGet
  entity.amountGet = event.params.amountGet
  entity.tokenGive = event.params.tokenGive
  entity.amountGive = event.params.amountGive
  entity.userFill = event.params.userFill
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}