// Tangkap elemen html
let modal = document.getElementById('modal');
let modal_bg = document.getElementById('modal_bg');
let floating_button = document.getElementById('floating_button');
let addlist_form = document.getElementById('addlist_form');
let root = document.getElementById('root');
let subtitle = document.getElementById('subtitle');
let total = 0;

// Data List Belanja
let data_list_belanja = [];

subtitle.innerHTML = new Date().toLocaleDateString();

root.innerHTML = `
<div class="total">
  <p>Total : Rp. ${numberWithCommas(total)},-</p>
</div>
`;

// tambahkan event listener
floating_button.addEventListener('click', () => {
  // Set style pada modal display -> flex
  if (modal.style.display == 'none') {
    showModal();
    return;
  }
  // sembunyikan modal
  hideModal();
});

// Menambahkan event listener pada modal_bg
modal_bg.addEventListener('click', () => {
  hideModal();
});

function showModal() {
  modal.style.display = 'flex';
  floating_button.style.backgroundColor = 'gray';
  floating_button.style.transform = 'rotate(45deg)';
}

function hideModal() {
  modal.style.display = 'none';
  floating_button.style.backgroundColor = '#f280b6';
  floating_button.style.transform = 'rotate(0deg)';
}

addlist_form.addEventListener('submit', (event) => {
  // stop form dari reload page
  event.preventDefault();

  // tangkap value dari masing-masing input field
  let barang = event.target.barang.value;
  let harga = event.target.harga.value;

  // push data ke data_list_belanja
  data_list_belanja.push({
    nama_barang: barang,
    harga_barang: harga,
    tanggal: new Date().toLocaleDateString(),
    waktu: new Date().toLocaleTimeString(),
  });

  // clear value input
  event.target.barang.value = '';
  event.target.harga.value = '';

  hideModal();
  renderToHtml();
});

function renderToHtml() {
  // clear elemen root
  hitungTotal();
  root.innerHTML = `
    <div class="total">
      <p>Total : Rp. ${numberWithCommas(total)},-</p>
    </div>
  `;

  // Looping
  data_list_belanja.forEach((e, i) => {
    root.innerHTML += `
      <div class="card">
        <small> ${e.tanggal} ${e.waktu} </small>
        <div> 
          ${e.nama_barang} <span> Rp. ${numberWithCommas(
      e.harga_barang
    )},- </span>
        </div>
        <button onclick="handleDelete(${i})">Selesai</button>
      </div>
    `;
  });

  root.innerHTML += `<div class="linebreak"></div>`;
}

const handleDelete = (index) => {
  data_list_belanja.splice(index, 1);
  renderToHtml();
};

// format number separator regex
function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function hitungTotal() {
  total = 0;
  for (let i = 0; i < data_list_belanja.length; i++) {
    total += parseInt(data_list_belanja[i].harga_barang);
  }
}
