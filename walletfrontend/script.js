const createMnemonicForm = document.getElementById('create-mnemonic-form');
const signinForm = document.getElementById('signin-form');
const addWalletForm = document.getElementById('add-wallet-form');
const walletList = document.getElementById('wallet-list');
const createMnemonicContainer = document.getElementById('create-mnemonic-container');
const signinContainer = document.getElementById('signin-container');
const walletListContainer = document.getElementById('wallet-list-container');

let mnemonic = '';
let wallets = [];
if(localStorage.getItem('mnemonic'))
{
    createMnemonicContainer.style.display = 'none';
    signinContainer.style.display = 'block';
    mnemonic=localStorage.getItem('mnemonic')
}
createMnemonicForm.addEventListener('submit', (e) => {
    e.preventDefault();
    mnemonic = generateMnemonic();
    document.getElementById('mnemonic').value = mnemonic;
    localStorage.setItem('mnemonic', mnemonic);
    createMnemonicContainer.style.display = 'none';
    signinContainer.style.display = 'block';
});

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const signinMnemonic = document.getElementById('signin-mnemonic').value;
    if (signinMnemonic === mnemonic) {
        signinContainer.style.display = 'none';
        walletListContainer.style.display = 'block';
        
        displayWallets();
    } else {
        alert('Invalid mnemonic');
    }
});

addWalletForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const walletAddress = document.getElementById('wallet-address').value;
    wallets.push(walletAddress);
    localStorage.setItem('wallets', JSON.stringify(wallets));
    displayWallets();
});

function generateMnemonic() {
    // You can use a library like bip39 to generate a mnemonic
    // For simplicity, I'll just generate a random string
    return Array(12).fill(0).map(() => Math.random().toString(36).substr(2, 5)).join(' ');
}

function displayWallets() {
    walletList.innerHTML = '';
    wallets = JSON.parse(localStorage.getItem('wallets')) || [];
    wallets.forEach((wallet) => {
        const walletItem = document.createElement('div');
        walletItem.className = 'wallet-item';
        walletItem.textContent = wallet;
        walletList.appendChild(walletItem);
    });
}