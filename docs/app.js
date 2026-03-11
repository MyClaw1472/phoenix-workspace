const form = document.getElementById('checkoutForm');
const walletDisplay = document.getElementById('walletDisplay');
const messageOutput = document.getElementById('messageOutput');
const qrContainer = document.getElementById('qrcode');
const copyWalletBtn = document.getElementById('copyWalletBtn');
const copyMessageBtn = document.getElementById('copyMessageBtn');

let qr;

function values() {
  return {
    clientName: document.getElementById('clientName').value.trim(),
    serviceName: document.getElementById('serviceName').value.trim(),
    amount: document.getElementById('amount').value.trim(),
    currency: document.getElementById('currency').value,
    walletAddress: document.getElementById('walletAddress').value.trim(),
    network: document.getElementById('network').value.trim(),
    extraNote: document.getElementById('extraNote').value.trim(),
  };
}

function buildMessage(v) {
  const who = v.clientName ? `Hi ${v.clientName},` : 'Hi,';
  const amountLine = v.amount ? `Amount: ${v.amount} ${v.currency}` : 'Amount: [set amount]';
  return `${who}\n\nHere are the payment details for ${v.serviceName || 'the service'}:\n- ${amountLine}\n- Wallet: ${v.walletAddress}\n- Network: ${v.network || 'Ethereum'}\n\n${v.extraNote || ''}`.trim();
}

function render() {
  const v = values();
  walletDisplay.textContent = v.walletAddress || 'No wallet address set';
  messageOutput.textContent = buildMessage(v);

  qrContainer.innerHTML = '';
  if (v.walletAddress) {
    qr = new QRCode(qrContainer, {
      text: v.walletAddress,
      width: 180,
      height: 180,
    });
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  render();
});

copyWalletBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(walletDisplay.textContent);
  copyWalletBtn.textContent = 'Copied';
  setTimeout(() => (copyWalletBtn.textContent = 'Copy'), 1200);
});

copyMessageBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(messageOutput.textContent);
  copyMessageBtn.textContent = 'Copied';
  setTimeout(() => (copyMessageBtn.textContent = 'Copy message'), 1200);
});

render();
