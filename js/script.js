let elInput = $('.input');
let elFormCheckInput = $('.form-check-input');
let elFormInput = $('.form-input');
let elBtn = $('.js-add-to-list-btn');
let elFormBtn = $('.form-btn');
let elFormClearBtn = $('.form-clear-btn');
let ellist = $('.list');

elInput.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    elBtn.click();
  }
} );

let list = [
  'olma',
  'nok'
];

list = JSON.parse(localStorage.getItem('list')) || list;

list.forEach(function(item) {
  let elItem = document.createElement('li');
  elItem.setAttribute('class', 'text-light d-flex align-items-center border-bottom py-1 shadow-sm');
  elItem.classList.add('list-item');
  elItem.innerHTML = item;
  ellist.appendChild(elItem);
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
    ellist.removeChild(elItem);
    list.splice(list.indexOf(elItemTextCont), 1);
    showHide();
    localStorage.removeItem('list');
  }); // delete list items btn
} );

elInput.setAttribute('maxlength', '25');
// elFormBtn && elFormClearBtn show or hide function
let showHide = function() {
  if (list.length <= 0) {
    elFormBtn.classList.add('opacity-50');
    elFormBtn.classList.add('disabled');
    elFormBtn.classList.remove('opacity-100');
    elFormClearBtn.classList.add('opacity-50');
    elFormClearBtn.classList.add('disabled');
    elFormClearBtn.classList.remove('opacity-100');
  } else {
    elFormBtn.classList.remove('opacity-50');
    elFormBtn.classList.remove('disabled');
    elFormBtn.classList.add('opacity-100');
    elFormClearBtn.classList.remove('opacity-50');
    elFormClearBtn.classList.remove('disabled');
    elFormClearBtn.classList.add('opacity-100');
  }
}
// elFormBtn && elFormClearBtn show or hide function
// main function
elBtn.addEventListener('click', function () {
  let inputValue = elInput.value.trim();
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

      for (mahsulotNomi of list) { // main for function
        if (elFormCheckInput.checked) {
          elItem.setAttribute('class', 'text-warning d-flex align-items-center border-bottom py-1 shadow-lg');
        } else {
        elItem.setAttribute('class', 'text-light d-flex align-items-center border-bottom py-1 shadow-sm');
        }
        mahsulotNomi = inputValue;
        elItem.textContent = mahsulotNomi;
        if (elFormCheckInput.checked) {
          ellist.insertBefore(elItem, ellist.firstChild);
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
          ellist.removeChild(elItem);
          list.splice(list.indexOf(elItemTextCont), 1);
          showHide();
          localStorage.removeItem('list');
        }); // delete list items btn
        
        elFormClearBtn.addEventListener('click', function() { // clear btn function
          list.length = 0;
          ellist.innerHTML = null;
          elFormInput.value = list;
          showHide();
        }); // clear btn function end
        
        elFormBtn.addEventListener('click', function() { // send form values btn function
          elFormInput.value = list;
        }); // send form values btn function end

      } // main for function end
      //local storage function
      localStorage.setItem('list', JSON.stringify(list));
      elInput.value = null;
      elInput.focus();
      
      function updateScroll(){ // update scroll function
        var element = document.getElementById("mainList");
        element.scrollTop = element.scrollHeight;
      }
      updateScroll(); // update scroll function end
      } // list includes check end
    }

}); // main function end
setInterval(function() {
  console.log(list);
} , 1500);
// localStorage.removeItem('mahsultolar');