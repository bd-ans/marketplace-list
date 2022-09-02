let elInput = $('.input');
let elFormCheckInput = $('.form-check-input');
let elFormInput = $('.form-input');
let elBtn = $('.js-add-to-list-btn');
let elFormBuyBtn = $('.js-but-btn');
let elFormClearBtn = $('.js-form-clear-btn');
let ellist = $('.list');

let tst = [];
tst = JSON.parse(localStorage.getItem('tst')) || [];

// input keyup event
elInput.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    elBtn.click();
  }
} );
// list array
let list = [];

// localstroage set function
list = JSON.parse(localStorage.getItem('list')) || list;

// time 
let time = new Date();

// forEach function
list.forEach(function(item) {
  let elItem = document.createElement('li');
/*   if (item === 'olmhhha') {
    elItem.setAttribute('class', 'text-warning d-flex align-items-center border-bottom py-1 shadow-lg');
  } else {
  elItem.setAttribute('class', 'text-light d-flex align-items-center border-bottom py-1 shadow-sm');
  } */
  elItem.setAttribute('class', 'text-light d-flex align-items-center border-bottom py-1 shadow-sm');
  elItem.classList.add('list-item');
  elItem.innerHTML = item;
  ellist.appendChild(elItem);
  // delete btn
  let deleteBtn = document.createElement('button'); // delete list items btn
  deleteBtn.textContent = 'O\'chirish';
  deleteBtn.setAttribute('class', 'btn btn-info shadow-lg rounded-3 border-light text-light ms-auto me-1 btn-sm');
  elItem.appendChild(deleteBtn);
  // delete btn function
  deleteBtn.addEventListener('click', function () {
    let elItemTextCont = elItem.firstChild.textContent;
    const indexm = list.indexOf(elItemTextCont);
    list.splice(indexm, 1);
    tst.splice(indexm, 1);
    elItem.remove();
    localStorage.setItem('list', JSON.stringify(list));
    localStorage.setItem('tst', JSON.stringify(tst));
    showHide();
  });
  if (tst.includes(elItem.firstChild.textContent)) {
    elItem.setAttribute('class', 'text-warning d-flex align-items-center border-bottom py-1 shadow-lg fw-bolder');
    deleteBtn.setAttribute('class', 'btn btn-warning shadow-lg rounded-3 border-light text-black ms-auto me-1 btn-sm');
  }
} );

// forEach function end

// clear && buy btn show or hide function
if (list.length <= 0) {
  elFormBuyBtn.classList.add('opacity-50');
  elFormBuyBtn.classList.add('disabled');
  elFormBuyBtn.classList.remove('opacity-100');
  elFormClearBtn.classList.add('opacity-50');
  elFormClearBtn.classList.add('disabled');
  elFormClearBtn.classList.remove('opacity-100');
} else {
  elFormBuyBtn.classList.remove('opacity-50');
  elFormBuyBtn.classList.remove('disabled');
  elFormBuyBtn.classList.add('opacity-100');
  elFormClearBtn.classList.remove('opacity-50');
  elFormClearBtn.classList.remove('disabled');
  elFormClearBtn.classList.add('opacity-100');
}

// cler btn function
elFormClearBtn.addEventListener('click', function() { // clear btn function
  list.length = 0;
  tst.length = 0;
  ellist.innerHTML = null;
  elFormInput.value = list;
  showHide();
  localStorage.setItem('list', JSON.stringify(list));
  localStorage.setItem('tst', JSON.stringify(tst));
});

// buy btn function
elFormBuyBtn.addEventListener('click', function() { // send form values btn function
  elFormInput.value = list;
});

// input chenge check event
if (localStorage.getItem('formCheckInput') === 'true') {
  elFormCheckInput.checked = true;
} else {
  elFormCheckInput.checked = false;
}

// on input change event
elFormCheckInput.addEventListener('change', function() {
  localStorage.setItem('formCheckInput', elFormCheckInput.checked);
});

setTimeout(function() {
  elFormCheckInput.classList.remove('placeholder', 'opacity-0');
} , 100);

elInput.setAttribute('maxlength', '25');

// elFormBuyBtn && elFormClearBtn show or hide function
let showHide = function() {
  if (list.length <= 0) {
    elFormBuyBtn.classList.add('opacity-50');
    elFormBuyBtn.classList.add('disabled');
    elFormBuyBtn.classList.remove('opacity-100');
    elFormClearBtn.classList.add('opacity-50');
    elFormClearBtn.classList.add('disabled');
    elFormClearBtn.classList.remove('opacity-100');
  } else {
    elFormBuyBtn.classList.remove('opacity-50');
    elFormBuyBtn.classList.remove('disabled');
    elFormBuyBtn.classList.add('opacity-100');
    elFormClearBtn.classList.remove('opacity-50');
    elFormClearBtn.classList.remove('disabled');
    elFormClearBtn.classList.add('opacity-100');
  }
}

// main function
elBtn.addEventListener('click', function () {
  let inputValue = elInput.value.trim();
  // input value check
  if (inputValue === '' || inputValue === null || inputValue === undefined || Number(inputValue) || inputValue.length < 2) {
    elInput.setAttribute('placeholder', 'Iltimos mahsulot nomini kiriting');
    elInput.classList.add('is-invalid');
    elInput.value = null;
    elInput.focus();
  } else {
    if (list.includes(inputValue)) { // list includes check function
      elInput.setAttribute('placeholder', 'Bu mahsulot oldin qo`shilgan');
      elInput.classList.add('is-invalid');
      elInput.value = null;
      elInput.focus();
    } else {
      elInput.setAttribute('placeholder', 'davom eting');
      if (elFormCheckInput.checked) {
        list.unshift(inputValue);
      } else {
      list.push(inputValue);
      }
      let elItem = document.createElement('li');
      elInput.classList.remove('is-invalid');
      showHide();

      // main for function
      for (mahsulotNomi of list) {
        if (elFormCheckInput.checked) {
          elItem.setAttribute('class', 'text-warning d-flex align-items-center border-bottom py-1 shadow-lg fw-bolder');
        } else {
        elItem.setAttribute('class', 'text-light d-flex align-items-center border-bottom py-1 shadow-sm');
        }
        mahsulotNomi = inputValue;
        elItem.textContent = mahsulotNomi;
        let elItemTextCont = elItem.firstChild.textContent;
        if (elFormCheckInput.checked) {
          ellist.insertBefore(elItem, ellist.firstChild);
          
          // tst.insertBefore(elItem, tst.firstChild);
          tst.push(elItemTextCont);
          tst = tst.filter(function(item, index) {
            return tst.indexOf(item) === index;
          });
          localStorage.setItem('tst', JSON.stringify(tst));
        } else {
        ellist.appendChild(elItem);
        }

        // delete btn
        let deleteBtn = document.createElement('button'); // delete list items btn
        deleteBtn.textContent = 'O\'chirish';
        if (elFormCheckInput.checked) {
          deleteBtn.setAttribute('class', 'btn btn-warning shadow-lg rounded-3 border-light text-black ms-auto me-1 btn-sm');
        } else {
        deleteBtn.setAttribute('class', 'btn btn-info shadow-lg rounded-3 border-light text-light ms-auto me-1 btn-sm');
        }
        elItem.appendChild(deleteBtn);

        // delete btn function
        deleteBtn.addEventListener('click', function () {
          let elItemTextCont = elItem.firstChild.textContent;
          const indexm = list.indexOf(elItemTextCont);
          list.splice(indexm, 1);
          tst.splice(indexm, 1);
          elItem.remove();
          localStorage.setItem('list', JSON.stringify(list));
          localStorage.setItem('tst', JSON.stringify(tst));
          showHide();
        });

        // buy btn function
        elFormBuyBtn.addEventListener('click', function() { // send form values btn function
          elFormInput.value = list.join(', ');
        });
      }
      
      //local storage function
      localStorage.setItem('list', JSON.stringify(list));
      elInput.value = null;
      elInput.focus();

      // update scroll function
      function updateScroll(){
        var element = document.getElementById("mainList");
        element.scrollTop = element.scrollHeight;
      }
      updateScroll();
      // send message function
      function sendmessage(){
                chat_id = 1670604763;
                token = `5498274845:AAFuzhbK9fyZ1jTAH-U8KB55q-9wMzS9dIw`;
                let message = `Qo'shildi - ${inputValue}. Bor - [${list.join(', ')}][${list.length}]  -  ${time}`;
                let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${message}`;
                let xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.send();
              }
              sendmessage();
      }
    }
});

// cler btn function
elFormClearBtn.addEventListener('click', function() { // clear btn function
  list.length = 0;
  tst.length = 0;
  ellist.innerHTML = null;
  elFormInput.value = list;
  showHide();
  localStorage.setItem('list', JSON.stringify(list));
  localStorage.setItem('tst', JSON.stringify(tst));

  // send message function
  function sendmessage(){
    chat_id = 1670604763;
    token = `5498274845:AAFuzhbK9fyZ1jTAH-U8KB55q-9wMzS9dIw`;
    let message = `Hammasi o'chirildi - ${time}`;
    let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${message}`;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
  }
  sendmessage();
});
// localStorage.removeItem('tst');