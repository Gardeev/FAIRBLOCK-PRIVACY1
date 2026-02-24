// js/app.js
import { ConfidentialTransferClient } from 'https://esm.sh/@fairblock/stabletrust';

// Константы для Sepolia
const SEPOLIA_RPC = "https://ethereum-sepolia.publicnode.com";
const CONTRACT_ADDRESS = "0x81a2c161c0327464430658516eE74A669feFC7bC";
const CHAIN_ID = 11155111;

export async function initClient() {
    return new ConfidentialTransferClient(SEPOLIA_RPC, CHAIN_ID);
}

// Функция упаковки ТЕКСТА и ЧИСЛА в одно значение
export function packData(text, number) {
    const textHex = ethers.hexlify(ethers.toUtf8Bytes(text));
    // Соединяем текст и число (число в конце)
    return BigInt(textHex + number.toString(16).padStart(8, '0'));
}

// Функция распаковки обратно
export function unpackData(bigIntValue) {
    let hex = bigIntValue.toString(16);
    if (hex.length % 2 !== 0) hex = '0' + hex;
    
    const amountHex = hex.slice(-8); // Последние 8 знаков - это число
    const textHex = '0x' + hex.slice(0, -8);
    
    return {
        text: ethers.toUtf8String(textHex),
        number: parseInt(amountHex, 16)
    };
}
