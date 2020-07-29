const Web3 = require('web3');
const providerUrl = 'https://mainnet.infura.io/v3/8d6142b291c84deba374beb2bf83834f';
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));


const instaListABI = [{"inputs":[{"internalType":"uint64","name":"","type":"uint64"}],"name":"accountAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"accountID","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"","type":"uint64"}],"name":"accountLink","outputs":[{"internalType":"address","name":"first","type":"address"},{"internalType":"address","name":"last","type":"address"},{"internalType":"uint64","name":"count","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"","type":"uint64"},{"internalType":"address","name":"","type":"address"}],"name":"accountList","outputs":[{"internalType":"address","name":"prev","type":"address"},{"internalType":"address","name":"next","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accounts","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"addAuth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"instaIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"removeAuth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userLink","outputs":[{"internalType":"uint64","name":"first","type":"uint64"},{"internalType":"uint64","name":"last","type":"uint64"},{"internalType":"uint64","name":"count","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint64","name":"","type":"uint64"}],"name":"userList","outputs":[{"internalType":"uint64","name":"prev","type":"uint64"},{"internalType":"uint64","name":"next","type":"uint64"}],"stateMutability":"view","type":"function"}];
const instaListAddress = '0x4c8a1BEb8a87765788946D6B19C6C6355194AbEb';
const instaListContract = new web3.eth.Contract(instaListABI, instaListAddress);

let address = '0xEEB007bea2Bbb0cA6502217E8867f8f7b021B8D5';
// 0x7284a8451d9a0e7Dc62B3a71C0593eA2eC5c5638 - DSA
// 0xEEB007bea2Bbb0cA6502217E8867f8f7b021B8D5 - owner

instaListContract.methods.accountID(address).call().then((id, error) => {
	if(id) {
		if(id == 0) {
			console.log('This address represents a DSA.');
		} 
		else {
			console.log('This address does not represnt a DSA.');
		}
	} else {
		console.log(error);
	}
});
