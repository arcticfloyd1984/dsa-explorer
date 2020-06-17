const Web3 = require('web3');
const providerUrl = 'https://mainnet.infura.io/v3/8d6142b291c84deba374beb2bf83834f';
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

let accountCreationMonthObject = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0
}

const contractABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"origin","type":"address"}],"name":"LogAccountCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_newAccount","type":"address"},{"indexed":true,"internalType":"address","name":"_connectors","type":"address"},{"indexed":true,"internalType":"address","name":"_check","type":"address"}],"name":"LogNewAccount","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"accountVersion","type":"uint256"},{"indexed":true,"internalType":"address","name":"check","type":"address"}],"name":"LogNewCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"master","type":"address"}],"name":"LogNewMaster","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"master","type":"address"}],"name":"LogUpdateMaster","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"account","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newAccount","type":"address"},{"internalType":"address","name":"_connectors","type":"address"},{"internalType":"address","name":"_check","type":"address"}],"name":"addNewAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"accountVersion","type":"uint256"},{"internalType":"address","name":"_origin","type":"address"}],"name":"build","outputs":[{"internalType":"address","name":"_account","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"accountVersion","type":"uint256"},{"internalType":"address[]","name":"_targets","type":"address[]"},{"internalType":"bytes[]","name":"_datas","type":"bytes[]"},{"internalType":"address","name":"_origin","type":"address"}],"name":"buildWithCast","outputs":[{"internalType":"address","name":"_account","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"accountVersion","type":"uint256"},{"internalType":"address","name":"_newCheck","type":"address"}],"name":"changeCheck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newMaster","type":"address"}],"name":"changeMaster","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"check","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"connectors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"version","type":"uint256"},{"internalType":"address","name":"query","type":"address"}],"name":"isClone","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"list","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"master","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_master","type":"address"},{"internalType":"address","name":"_list","type":"address"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_connectors","type":"address"}],"name":"setBasics","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateMaster","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"versionCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const contractAddress = '0x2971AdFa57b20E5a416aE5a708A8655A9c74f723';

const instaDappContract = new web3.eth.Contract(contractABI, contractAddress);

instaDappContract.getPastEvents('LogAccountCreated', {
    fromBlock: 0,
    toBlock: 'latest'
}, (error, events) => {
    events.forEach((event) => {
        const blockHash = event.blockHash;
        web3.eth.getBlock(blockHash).then((blockData) => {
            const unixTimeStamp = blockData.timestamp;
            var date = new Date(unixTimeStamp*1000);
            var month = date.getMonth();
            accountCreationMonthObject[month+1]++;
            console.log(accountCreationMonthObject);
        });
    })
})

