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
const errText = "[ERROR]: ";

function isBarcodeValid(barcode){
    for(let i = 0; i < database.length; i++){
        if(barcode == database[i].id){
            return true;
        } 
    }   
    return false;
}

function scanBarcodes(barcodes){
    let scanResult = [];
    let map = new Map();
    for(let i = 0; i < barcodes.length; i++){
        if(map.has(barcodes[i])){
            map.set(barcodes[i], map.get(barcodes[i]) + 1);
        }else{
            map.set(barcodes[i], 1);
        }
    }
    map.forEach((value, key, map) => {
        scanResult.push({id: key, count: value});
    });
    return scanResult;
}

function findRelatedGoods(scanResult){
    let relatedGoods = [];
    scanResult.forEach(item => {
        for(let i = 0; i < database.length; i++){
            if(item.id === database[i].id){
                let temp = database[i];
                temp.count = item.count;
                relatedGoods.push(temp);
            }
        }
    });
    return relatedGoods;
}

function createReceipt(relatedGoods){
    let receiptStr = title + '\n' + delimeter + '\n';
    let total = 0;
    for(let i = 0; i < relatedGoods.length; i++){
        receiptStr += relatedGoods[i].name + '\t' + relatedGoods[i].price + '\t' + relatedGoods[i].count + '\n';
        total += relatedGoods[i].price * relatedGoods[i].count;
    }
    receiptStr += delimeter + '\n' + priceText + total;
    return receiptStr;
}

function printReceipt(barcodes) {
    for(let i = 0; i < barcodes.length; i++){
        if(!isBarcodeValid(barcodes[i])){
            return errText + 'BARCODE IS INVALID!';
        }
    }
    let scanResult = scanBarcodes(barcodes);
    let relatedGoods = findRelatedGoods(scanResult);
    return createReceipt(relatedGoods);
}

module.exports = {
    printReceipt,
    createReceipt,
    findRelatedGoods,
    scanBarcodes,
    isBarcodeValid
};