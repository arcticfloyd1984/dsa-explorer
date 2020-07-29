const Web3 = require('web3');
const providerUrl = 'https://mainnet.infura.io/v3/8d6142b291c84deba374beb2bf83834f';
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

const instaEventContractABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"connectorType","type":"uint64"},{"indexed":true,"internalType":"uint64","name":"connectorID","type":"uint64"},{"indexed":true,"internalType":"uint64","name":"accountID","type":"uint64"},{"indexed":true,"internalType":"bytes32","name":"eventCode","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"eventData","type":"bytes"}],"name":"LogEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"_connectorType","type":"uint256"},{"internalType":"uint256","name":"_connectorID","type":"uint256"},{"internalType":"bytes32","name":"_eventCode","type":"bytes32"},{"internalType":"bytes","name":"_eventData","type":"bytes"}],"name":"emitEvent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"instaList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
const instaEventContractAddress = '0x2af7ea6Cb911035f3eb1ED895Cb6692C39ecbA97';

const instaEventContract = new web3.eth.Contract(instaEventContractABI, instaEventContractAddress);

async function getTransactions() {
    const latest = await web3.eth.getBlockNumber();
    const result = await instaEventContract.getPastEvents('LogEvent', { fromBlock: latest-1000, toBlock: 'latest'});
    let txnHashes=[];

    if(result) {
      const txnHashSet = new Set();
      for(const event of result) {
          txnHashSet.add(event.transactionHash);
      }
      txnHashes=Array.from(txnHashSet);
    }

    const latestTxns = [];
    for(let i=txnHashes.length-1; i>txnHashes.length-20; i--) {
      const txHash = txnHashes[i];
      const receipt = await web3.eth.getTransactionReceipt(txHash);
      if(receipt) {
        latestTxns.push({ txHash: txHash, from: receipt.from, to: receipt.to, gasUsed: receipt.gasUsed });
      }
    }
    console.log(latestTxns);
}

getTransactions();
// instaEventContract.getPastEvents('LogEvent', {
//     fromBlock: 9747290,
//     toBlock: 'latest'  
// }, (error, events) => {
//     if(events) {

//             const txHash = events[events.length - 1].transactionHash;
//             web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
//                 if(receipt) {
//                     console.log({
//                         txHash: txHash,
//                         from: receipt.from,
//                         to: receipt.to,
//                         gasUsed: receipt.gasUsed
//                     })
//                 }
//                 else {
//                     console.log(error);
//                 }
//             })
        
//     } else {
//         console.log(error);
//     }
// })


/**
 * Connector Details contract
 */
// const instaConnectorsContractABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"}],"name":"LogAddController","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"connector","type":"address"}],"name":"LogDisable","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"connector","type":"address"}],"name":"LogEnable","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"connector","type":"address"}],"name":"LogEnableStatic","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"}],"name":"LogRemoveController","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"chief","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"connectorArray","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"connectorCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"connectorLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"connectors","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_connector","type":"address"}],"name":"disable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"}],"name":"disableChief","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_connector","type":"address"}],"name":"enable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"}],"name":"enableChief","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_connector","type":"address"}],"name":"enableStatic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"instaIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_connectors","type":"address[]"}],"name":"isConnector","outputs":[{"internalType":"bool","name":"isOk","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_connectors","type":"address[]"}],"name":"isStaticConnector","outputs":[{"internalType":"bool","name":"isOk","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"staticConnectorArray","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"staticConnectorLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"staticConnectors","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];
// const instaConnectorsContractAddress = '0xD6A602C01a023B98Ecfb29Df02FBA380d3B21E0c';

// const instaConnectorsContract =  new web3.eth.Contract(instaConnectorsContractABI, instaConnectorsContractAddress);


// instaConnectorsContract.methods.connectorLength().call().then(arrayLength => {
//     for(var i = 0; i < arrayLength; i++) {
//         instaConnectorsContract.methods.connectorArray(i).call((error, result) => {
//             console.log(result);
//         });
//     }
// });
