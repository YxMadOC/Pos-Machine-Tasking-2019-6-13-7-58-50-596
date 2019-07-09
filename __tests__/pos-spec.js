const pos = require('../pos')

const database = [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
];

const title = "Receipts";
const delimeter = "------------------------------------------------------------";
const priceText = "Price: ";

it ("should return false when invoke isBarcodeValid given the barcode not exists in database", () => {
    // given
    const barcode = '0011';
    // when
    let result = pos.isBarcodeValid(barcode);
    // then
    expect(result).toBe(false);
})

it ("should return true when invoke isBarcodeValid given the barcode exists in database", () => {
    // given
    const barcode = '0001';
    // when
    let result = pos.isBarcodeValid(barcode);
    // then
    expect(result).toBe(true);
})

it ("should return scanResult when invoke scanBarcodes given the correct barcodes", () => {
    // given
    const barcodes = ['0001', '0003'];
    // when
    let result = pos.scanBarcodes(barcodes);
    // then
    expect(result).toStrictEqual([{id: '0001', count: 1}, {id: '0003', count: 1}]);
})

it ("should return relatedGoods when invoke findRelatedGoods given the scanResult", () => {
    // given
    const scanResult = [{id: '0001', count: 1}, {id: '0003', count: 1}];
    // when
    let result = pos.findRelatedGoods(scanResult);
    // then
    expect(result).toStrictEqual([{"count": 1, "id": "0001", "name": "Coca Cola", "price": 3}, {"count": 1, "id": "0003", "name": "Pepsi-Cola", "price": 5}]);
})

it ("should return receipts when invoke createReceipt given the scanResult", () => {
    // given
    const relatedGoods = [{"count": 1, "id": "0001", "name": "Coca Cola", "price": 3}, {"count": 1, "id": "0003", "name": "Pepsi-Cola", "price": 5}];
    // when
    let result = pos.createReceipt(relatedGoods);
    // then
    expect(result).toStrictEqual(title + '\n' + delimeter + '\n' + database[0].name + '\t3\t1\n' + database[2].name + '\t5\t1\n' + delimeter + '\n' + priceText + '8');
})

it ("should return receipts when invoke printReceipt given the barcodes exists in database", () => {
    // given
    const barcodes = ['0001', '0003'];
    // when
    let result = pos.printReceipt(barcodes);
    // then
    expect(result).toBe(title + '\n' + delimeter + '\n' + database[0].name + '\t3\t1\n' + database[2].name + '\t5\t1\n' + delimeter + '\n' + priceText + '8');
});

it ("should return error message when invoke printReceipt given the barcodes not exists in database", () => {
    // given
    const barcodes = ['0007','0011']
    // when
    let result = pos.printReceipt(barcodes);
    // then
    expect(result).toBe('[ERROR]: BARCODE IS INVALID!');
});