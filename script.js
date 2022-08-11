let elInput = document.querySelector('.input');
let elFormInput = document.querySelector('.form-input');
let elBtn = document.querySelector('.btn');
let elFormBtn = document.querySelector('.form-btn');
let elFormClearBtn = document.querySelector('.form-clear-btn');
let ellist = document.querySelector('.list');

elInput.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    elBtn.click();
  }
} );

let list = [];
elInput.setAttribute('maxlength', '25');

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
      list.push(inputValue);
      let elItem = document.createElement('li');
      elInput.classList.remove('is-invalid');
      
      elFormBtn.classList.remove('d-none');
      elFormBtn.classList.add('d-block');
      elFormClearBtn.classList.remove('d-none');
      elFormClearBtn.classList.add('d-block');
      
      for (mahsulotNomi of list) { // main for function
        elItem.setAttribute('class', 'text-light d-flex align-items-center border-bottom py-1 shadow-sm');
        elItem.textContent = mahsulotNomi;
        ellist.appendChild(elItem);
        
        let deleteBtn = document.createElement('button'); // delete list items btn
        deleteBtn.textContent = 'O\'chirish';
        deleteBtn.setAttribute('class', 'btn btn-info shadow-lg rounded-3 border-light text-light ms-auto me-1 btn-sm');
        elItem.appendChild(deleteBtn);
    
        deleteBtn.addEventListener('click', function () {
          ellist.removeChild(elItem);
          // list.splice(list.indexOf);
          list.splice(list.indexOf(mahsulotNomi), list.length);
          console.log(list);
        }); // delete list items btn
        
        elFormClearBtn.addEventListener('click', function() { // clear btn function
          list.length = 0;
          ellist.innerHTML = '';
          elFormInput.value = list;
        }); // clear btn function end
        

        elFormBtn.addEventListener('click', function() { // send form values btn function
          elFormInput.value = list;
        }); // send form values btn function end

      } // main for function end
      
      elInput.value = null;
      elInput.focus();
      
      function updateScroll(){ // update scroll function
        var element = document.getElementById("mainList");
        element.scrollTop = element.scrollHeight;
      }
      updateScroll(); // update scroll function end
      
      } // list includes check end
    }
});

// setInterval(function() {
//   console.log(list);
// } , 1500);