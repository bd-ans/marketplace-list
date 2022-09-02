let elInput = $('.input');
let elFormCheckInput = $('.form-check-input');
let elFormInput = $('.form-input');
let elBtn = $('.js-add-to-list-btn');
let elFormBuyBtn = $('.js-but-btn');
let elFormClearBtn = $('.js-form-clear-btn');
let ellist = $('.list');

// first buyinung list array
let firstBuyingList = [];
firstBuyingList = JSON.parse(localStorage.getItem('firstBuyingList')) || [];

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

// forEach function
list.forEach(function(item) {
  let elItem = document.createElement('li');

  // on reload scroll chek function
  let element = document.getElementById("mainList");
  let scrollpos = localStorage.getItem('scrollpos');
  element.scrollTo(0, scrollpos);

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
    firstBuyingList.splice(indexm, 1);
    elItem.remove();
    localStorage.setItem('list', JSON.stringify(list));
    localStorage.setItem('firstBuyingList', JSON.stringify(firstBuyingList));
    showHide();
  });

  // first buying elemnts check function
  if (firstBuyingList.includes(elItem.firstChild.textContent)) {
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
  firstBuyingList.length = 0;
  ellist.innerHTML = null;
  elFormInput.value = list;
  showHide();
  localStorage.setItem('list', JSON.stringify(list));
  localStorage.setItem('firstBuyingList', JSON.stringify(firstBuyingList));
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

    // list includes check function
    if (list.includes(inputValue)) {
      elInput.setAttribute('placeholder', 'Bu mahsulot oldin qo`shilgan');
      elInput.classList.add('is-invalid');
      elInput.value = null;
      elInput.focus();
    } else {
      elInput.setAttribute('placeholder', 'davom eting');

      // if check input is checked push or unshift
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

        // if check input is checked inert first child function 
        if (elFormCheckInput.checked) {
          ellist.insertBefore(elItem, ellist.firstChild);
          firstBuyingList.push(elItemTextCont);
          firstBuyingList = firstBuyingList.filter(function(item, index) {
            return firstBuyingList.indexOf(item) === index;
          });

          // first buying elemnts get localStorage function
          localStorage.setItem('firstBuyingList', JSON.stringify(firstBuyingList));

          // scrol to top function 
          var element = document.getElementById("mainList");
          function updateScroll(){
            element.scrollTo({top: 0, behavior: 'smooth'});
          }
          updateScroll();

          // scroll position get loacalstore function
          localStorage.setItem('scrollpos', 0);
        } else {
          ellist.appendChild(elItem);
          // update scroll function
          let element = document.getElementById("mainList");
          function updateScroll(){
            element.scrollTo({top: element.scrollHeight, behavior: 'smooth'});
          }
          updateScroll();

          // scroll position get loacalstore function
          localStorage.setItem('scrollpos', element.scrollHeight);
        }

        // delete btn creating function
        let deleteBtn = document.createElement('button'); // delete list items btn
        deleteBtn.textContent = 'O\'chirish';
        if (elFormCheckInput.checked) {
          deleteBtn.setAttribute('class', 'btn btn-warning shadow-lg rounded-3 border-light text-black ms-auto me-1 btn-sm');
        } else {
        deleteBtn.setAttribute('class', 'btn btn-info shadow-lg rounded-3 border-light text-light ms-auto me-1 btn-sm');
        }

        // apend delete btn to list items
        elItem.appendChild(deleteBtn);

        // delete btn function
        deleteBtn.addEventListener('click', function () {
          let elItemTextCont = elItem.firstChild.textContent;
          const indexm = list.indexOf(elItemTextCont);
          list.splice(indexm, 1);
          firstBuyingList.splice(indexm, 1);

          // li remove to list
          elItem.remove();

          // list set localStorage function
          localStorage.setItem('list', JSON.stringify(list));

          // firs buying list set localStorage function
          localStorage.setItem('firstBuyingList', JSON.stringify(firstBuyingList));
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
      }
    }
});

// cler btn function
elFormClearBtn.addEventListener('click', function() {
  list.length = 0;
  firstBuyingList.length = 0;
  ellist.innerHTML = null;
  elFormInput.value = list;
  showHide();

  // list set localStorage function
  localStorage.setItem('list', JSON.stringify(list));
  // firs buying list set localStorage function
  localStorage.setItem('firstBuyingList', JSON.stringify(firstBuyingList));
});