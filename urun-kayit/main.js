const productForm = document.getElementById("product-form"),
      ownNameInput = document.getElementById("own-name"),
      productCodeInput = document.getElementById("code"),
      productNameInput = document.getElementById("product-name"),
      pieceInput = document.getElementById("piece"),
      dateInput = document.getElementById("date"),
      serialNumberInput = document.getElementById("serial-number"),
      sendButton = document.getElementById("send"),
      resetButton = document.getElementById("reset");

const recordsDOM = document.getElementById("records")

window.addEventListener('load', function(){
  // gönder butonu tıklanınca aşağıdaki fonksiyon çalışır.
  sendButton.addEventListener('click', function(){
    // her gönderme butonuna tıklandığında eski hata mesajalrını siliyoruz.
    resetError();
    let status = document.querySelector('input[name="status"]:checked');
    if (status == null) {
      errorHandle("Lütfen tüm alanları doldurun");
    }else {
      if (validation(ownNameInput.value, productCodeInput.value, productNameInput.value, pieceInput.value, dateInput.value, serialNumberInput.value, status)){
        newRecord(ownNameInput.value, productCodeInput.value, productNameInput.value, pieceInput.value, dateInput.value, serialNumberInput.value, status);
      }else {
        errorHandle("Lütfen tüm alanları doldurun");
      }
    }
  }); 
  // reset butonu tıklanınca aşağıdaki fonksiyon çalışır.
  resetButton.addEventListener('click', function(){
    reset();
  }); 
});      

// yeni kayıt oluşturur.
function newRecord(ownName, productCode, productName, piece, date, serialNumber, status) {
  // Yeni bir kayıt satırı oluşturuyoruz
  let newRecordEl = document.createElement("div");
  newRecordEl.className = "record";
  // bu kayıt satırının yazı içeriğine bilgilerimizi
  newRecordEl.textContent = `${ownName} - ${productCode} - ${productName} - ${piece} - ${date} - ${serialNumber} - ${status}`;
  recordsDOM.appendChild(newRecordEl);  
}

// inputtan gelen verilerin uzunluğunu kontrol eder
function validation(ownName, productCode, productName, piece, date, serialNumber, status) {
  if (ownName.length > 0 && productCode.length > 0 && productName.length > 0 && piece.length > 0 && serialNumber.length > 0 && status != null) {
    return true
  }
  return false
}

// Bir hata mesajı oluşturur
function errorHandle(text) {
  let errorEl = document.createElement("div");
  errorEl.className = "error"
  errorEl.style.color = "red";
  errorEl.textContent = text;
  productForm.appendChild(errorEl);
}

// eski tüm hataları siler
function resetError() {
  let errors = productForm.getElementsByClassName("error")
  for (var i=0; i<errors.length; i++) {
    productForm.removeChild(errors[i]);
  }
}

function reset() {
  // kayıtlar divinin içini boşaltarak resetlemiş oluyoruz.
  recordsDOM.innerHTML = "";
}