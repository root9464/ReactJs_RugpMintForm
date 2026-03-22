import { collectionAdress } from '@/shared/global/Global.variables';
import { beginCell, toNano } from '@ton/core';

type ITransaction = {
  validUntil: number;
  messages: Array<{
    address: string;
    amount: string;
    payload: string;
  }>;
};

/**
 * Формирует транзакцию mint-а NFT в коллекции
 *
 * Структура тела сообщения (Cell):
 * [op:uint32] [query_id:uint64] [quantity:uint64] [amount_per_item:uint256]
 *
 * @param value - Цена одного NFT в TON (тип number, конвертируется в нанотоны)
 * @param many - Количество mint-уемых NFT
 * @returns ITransaction - Объект транзакции для передачи в TonConnect или TonClient
 *
 * Технические детали:
 * - op = 0xfcadf23 (mint) - идентификатор операции, определенный в контракте коллекции
 * - query_id = timestamp - защита от replay-атак, идентификатор запроса
 * - quantity = many - количество NFT, увеличивает счетчик токенов в контракте
 * - amount_per_item = toNano(value) - проверка: сумма в сообщении должна быть >= quantity * amount_per_item
 * - validUntil = current_time + 60 - ограничение времени жизни, после которого транзакция невалидна
 */

export const createBodyCellTransaction = (value: number, many: number): ITransaction => {
  // тело сообщения для смарт-контракта
  const body = beginCell()
    .storeUint(0xfcadf23, 32) // op-код: что делаем (mint NFT)
    .storeUint(Math.floor(Date.now() / 1000), 64) // текущее время (защита от повторов)
    .storeUint(many, 64) // количество NFT
    .storeUint(toNano(value), 256) // цена за один NFT в нанотонах
    .endCell();

  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60,
    messages: [
      {
        address: collectionAdress, // куда отправляем (адрес коллекции)
        amount: (toNano(value) * BigInt(many)).toString(), // сколько TON отправляем
        payload: body.toBoc().toString('base64'),
      },
    ],
  };
  return transaction;
};
