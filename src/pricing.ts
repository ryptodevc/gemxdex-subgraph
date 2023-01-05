import { Token, Bundle } from '../generated/schema'
import { BigDecimal, Address, BigInt } from '@graphprotocol/graph-ts/index'
import { ZERO_BD, ONE_BD, factoryContract, ADDRESS_ZERO } from './helpers'
import { Pair as PairContract } from '../generated/templates/Pair/Pair'

const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
const USDC_WETH_PAIR = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc' // created 10008355
const DAI_WETH_PAIR = '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11' // created block 10042267
const USDT_WETH_PAIR = '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852' // created block 10093341

export function getEthPriceInUSD(): BigDecimal {
  // fetch eth prices for each stablecoin
  let daiPair = PairContract.bind(Address.fromString(DAI_WETH_PAIR)) // dai is token0
  let usdcPair = PairContract.bind(Address.fromString(USDC_WETH_PAIR)) // usdc is token0
  let usdtPair = PairContract.bind(Address.fromString(USDT_WETH_PAIR)) // usdt is token1

  // all 3 have been created
  if (daiPair !== null && usdcPair !== null && usdtPair !== null) {
    let totalLiquidityETH = daiPair.getReserves().get_reserve1().plus(usdcPair.getReserves().get_reserve1()).plus(usdtPair.getReserves().get_reserve0())
    let daiWeight = daiPair.getReserves().get_reserve1().div(totalLiquidityETH)
    let usdcWeight = usdcPair.getReserves().get_reserve1().div(totalLiquidityETH)
    let usdtWeight = usdtPair.getReserves().get_reserve0().div(totalLiquidityETH)

    return daiWeight.plus(usdcWeight).plus(usdtWeight).toBigDecimal()
    // dai and USDC have been created
  } else if (daiPair !== null && usdcPair !== null) {
    let totalLiquidityETH = daiPair.getReserves().get_reserve1().plus(usdcPair.getReserves().get_reserve1())
    let daiWeight = daiPair.getReserves().get_reserve1().div(totalLiquidityETH)
    let usdcWeight = usdcPair.getReserves().get_reserve1().div(totalLiquidityETH)
    return daiWeight.plus(usdcWeight).toBigDecimal()
    // USDC is the only pair so far
  } else {
    return ZERO_BD
  }
}

// minimum liquidity for price to get tracked
let MINIMUM_LIQUIDITY_THRESHOLD_ETH = BigInt.fromString('2')

export function findEthPerToken(token: Token): BigDecimal {
  if (token.id == WETH_ADDRESS) {
      return ONE_BD
  }

  let pairAddress = factoryContract.getPair(Address.fromString(token.id), Address.fromString(WETH_ADDRESS))

  if (pairAddress.toHexString() != ADDRESS_ZERO) {
      let pair = PairContract.bind(Address.fromString(pairAddress.toHexString()))
      if (pair.token0().toHexString() == token.id && pair.getReserves().get_reserve1().gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
          let token1 = Token.load(pair.token1().toHexString())
          return pair.getReserves().get_reserve1().toBigDecimal().div(pair.getReserves().get_reserve0().toBigDecimal()) // return token1 per our token * Eth per token 1
      }
      if (pair.token1().toHexString() == token.id && pair.getReserves().get_reserve0().gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
          let token0 = Token.load(pair.token0().toHexString())
          return pair.getReserves().get_reserve0().toBigDecimal().div(pair.getReserves().get_reserve1().toBigDecimal()) // return token1 per our token * Eth per token 1
      }
  }

  return ZERO_BD // nothing was found return 0
}