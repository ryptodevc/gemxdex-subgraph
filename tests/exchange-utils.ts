import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Cancel,
  Deposit,
  Order,
  OwnershipTransferred,
  Subtrade,
  Trade,
  UpdateFeeInfo,
  Withdraw
} from "../generated/Exchange/Exchange"

export function createCancelEvent(
  id: BigInt,
  user: Address,
  tokenGet: Address,
  amountGet: BigInt,
  tokenGive: Address,
  amountGive: BigInt,
  feeEthAmount: BigInt,
  timestamp: BigInt
): Cancel {
  let cancelEvent = changetype<Cancel>(newMockEvent())

  cancelEvent.parameters = new Array()

  cancelEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  cancelEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  cancelEvent.parameters.push(
    new ethereum.EventParam("tokenGet", ethereum.Value.fromAddress(tokenGet))
  )
  cancelEvent.parameters.push(
    new ethereum.EventParam(
      "amountGet",
      ethereum.Value.fromUnsignedBigInt(amountGet)
    )
  )
  cancelEvent.parameters.push(
    new ethereum.EventParam("tokenGive", ethereum.Value.fromAddress(tokenGive))
  )
  cancelEvent.parameters.push(
    new ethereum.EventParam(
      "amountGive",
      ethereum.Value.fromUnsignedBigInt(amountGive)
    )
  )
  cancelEvent.parameters.push(
    new ethereum.EventParam(
      "feeEthAmount",
      ethereum.Value.fromUnsignedBigInt(feeEthAmount)
    )
  )
  cancelEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return cancelEvent
}

export function createDepositEvent(
  token: Address,
  user: Address,
  amount: BigInt,
  balance: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "balance",
      ethereum.Value.fromUnsignedBigInt(balance)
    )
  )

  return depositEvent
}

export function createOrderEvent(
  id: BigInt,
  user: Address,
  tokenGet: Address,
  amountGet: BigInt,
  tokenGive: Address,
  amountGive: BigInt,
  feeEthAmount: BigInt,
  timestamp: BigInt
): Order {
  let orderEvent = changetype<Order>(newMockEvent())

  orderEvent.parameters = new Array()

  orderEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  orderEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  orderEvent.parameters.push(
    new ethereum.EventParam("tokenGet", ethereum.Value.fromAddress(tokenGet))
  )
  orderEvent.parameters.push(
    new ethereum.EventParam(
      "amountGet",
      ethereum.Value.fromUnsignedBigInt(amountGet)
    )
  )
  orderEvent.parameters.push(
    new ethereum.EventParam("tokenGive", ethereum.Value.fromAddress(tokenGive))
  )
  orderEvent.parameters.push(
    new ethereum.EventParam(
      "amountGive",
      ethereum.Value.fromUnsignedBigInt(amountGive)
    )
  )
  orderEvent.parameters.push(
    new ethereum.EventParam(
      "feeEthAmount",
      ethereum.Value.fromUnsignedBigInt(feeEthAmount)
    )
  )
  orderEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return orderEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSubtradeEvent(
  id: BigInt,
  user: Address,
  tokenGet: Address,
  amountGet: BigInt,
  tokenGive: Address,
  amountGive: BigInt,
  userFill: Address,
  timestamp: BigInt
): Subtrade {
  let subtradeEvent = changetype<Subtrade>(newMockEvent())

  subtradeEvent.parameters = new Array()

  subtradeEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  subtradeEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  subtradeEvent.parameters.push(
    new ethereum.EventParam("tokenGet", ethereum.Value.fromAddress(tokenGet))
  )
  subtradeEvent.parameters.push(
    new ethereum.EventParam(
      "amountGet",
      ethereum.Value.fromUnsignedBigInt(amountGet)
    )
  )
  subtradeEvent.parameters.push(
    new ethereum.EventParam("tokenGive", ethereum.Value.fromAddress(tokenGive))
  )
  subtradeEvent.parameters.push(
    new ethereum.EventParam(
      "amountGive",
      ethereum.Value.fromUnsignedBigInt(amountGive)
    )
  )
  subtradeEvent.parameters.push(
    new ethereum.EventParam("userFill", ethereum.Value.fromAddress(userFill))
  )
  subtradeEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return subtradeEvent
}

export function createTradeEvent(
  id: BigInt,
  user: Address,
  tokenGet: Address,
  amountGet: BigInt,
  tokenGive: Address,
  amountGive: BigInt,
  userFill: Address,
  timestamp: BigInt
): Trade {
  let tradeEvent = changetype<Trade>(newMockEvent())

  tradeEvent.parameters = new Array()

  tradeEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  tradeEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  tradeEvent.parameters.push(
    new ethereum.EventParam("tokenGet", ethereum.Value.fromAddress(tokenGet))
  )
  tradeEvent.parameters.push(
    new ethereum.EventParam(
      "amountGet",
      ethereum.Value.fromUnsignedBigInt(amountGet)
    )
  )
  tradeEvent.parameters.push(
    new ethereum.EventParam("tokenGive", ethereum.Value.fromAddress(tokenGive))
  )
  tradeEvent.parameters.push(
    new ethereum.EventParam(
      "amountGive",
      ethereum.Value.fromUnsignedBigInt(amountGive)
    )
  )
  tradeEvent.parameters.push(
    new ethereum.EventParam("userFill", ethereum.Value.fromAddress(userFill))
  )
  tradeEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return tradeEvent
}

export function createUpdateFeeInfoEvent(
  feeAccount: Address,
  feeNum: BigInt,
  feeNativeNum: BigInt,
  feeDen: BigInt,
  nativeTokenMin: BigInt
): UpdateFeeInfo {
  let updateFeeInfoEvent = changetype<UpdateFeeInfo>(newMockEvent())

  updateFeeInfoEvent.parameters = new Array()

  updateFeeInfoEvent.parameters.push(
    new ethereum.EventParam(
      "feeAccount",
      ethereum.Value.fromAddress(feeAccount)
    )
  )
  updateFeeInfoEvent.parameters.push(
    new ethereum.EventParam("feeNum", ethereum.Value.fromUnsignedBigInt(feeNum))
  )
  updateFeeInfoEvent.parameters.push(
    new ethereum.EventParam(
      "feeNativeNum",
      ethereum.Value.fromUnsignedBigInt(feeNativeNum)
    )
  )
  updateFeeInfoEvent.parameters.push(
    new ethereum.EventParam("feeDen", ethereum.Value.fromUnsignedBigInt(feeDen))
  )
  updateFeeInfoEvent.parameters.push(
    new ethereum.EventParam(
      "nativeTokenMin",
      ethereum.Value.fromUnsignedBigInt(nativeTokenMin)
    )
  )

  return updateFeeInfoEvent
}

export function createWithdrawEvent(
  token: Address,
  user: Address,
  amount: BigInt,
  balance: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "balance",
      ethereum.Value.fromUnsignedBigInt(balance)
    )
  )

  return withdrawEvent
}
