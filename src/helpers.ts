
import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { Token, TokenDayData, Bundle } from '../generated/schema'
import { Trade as TradeEvent } from '../generated/Exchange/Exchange'
import { Factory as FactoryContract } from '../generated/Exchange/Factory'
import { getEthPriceInUSD } from './pricing'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export let factoryContract = FactoryContract.bind(Address.fromString(FACTORY_ADDRESS))

export function updateTokenDayData(token: Token, event: TradeEvent): TokenDayData {
    let bundle = Bundle.load('1')
    if (bundle === null) {
      bundle = new Bundle("1")
    }
    bundle.ethPrice = getEthPriceInUSD()
    bundle.save()

    let timestamp = event.block.timestamp.toI32()
    let dayID = timestamp / 86400
    let dayStartTimestamp = dayID * 86400
    let tokenDayID = token.id
      .toString()
      .concat('-')
      .concat(BigInt.fromI32(dayID).toString())

    let tokenDayData = TokenDayData.load(tokenDayID)
    let token_derivedETH = token.derivedETH
    if(token_derivedETH === null) {
      token_derivedETH =  ZERO_BD
    }

    if (tokenDayData === null) {
      tokenDayData = new TokenDayData(tokenDayID)
      tokenDayData.date = dayStartTimestamp
      tokenDayData.token = token.id
      tokenDayData.priceUSD = token_derivedETH.times(bundle.ethPrice)
      tokenDayData.dailyVolumeToken = ZERO_BD
      tokenDayData.dailyVolumeUSD = ZERO_BD
      tokenDayData.dailyTxns = ZERO_BI
    }

    tokenDayData.priceUSD = token_derivedETH.times(bundle.ethPrice)
    tokenDayData.dailyVolumeToken = tokenDayData.dailyVolumeToken.plus(event.params.amountGive.toBigDecimal())
    tokenDayData.dailyVolumeUSD = tokenDayData.dailyVolumeUSD.plus(event.params.amountGet.toBigDecimal().times(bundle.ethPrice).times(token_derivedETH))

    tokenDayData.dailyTxns = tokenDayData.dailyTxns.plus(ONE_BI)
    tokenDayData.save()
  
    /**
     * @todo test if this speeds up sync
     */
    // updateStoredTokens(tokenDayData as TokenDayData, dayID)
    // updateStoredPairs(tokenDayData as TokenDayData, dayPairID)
  
    return tokenDayData as TokenDayData
  }
  