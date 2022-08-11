let elInput = document.querySelector('.input');
let elButton = document.querySelector('.btn');
let ellist = document.querySelector('.list');

let list = [];

elInput.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    elButton.click();
  }
} );

elInput.setAttribute('maxlength', '25');

elButton.addEventListener('click', function () {
  let inputValue = elInput.value.trim();

  if (inputValue === '' || inputValue === null || inputValue === undefined || Number(inputValue)) {
    elInput.setAttribute('placeholder', 'Iltimos mahsulot nomini kiriting');
    elInput.value = null;
    elInput.focus();
  } else { 
    elInput.setAttribute('placeholder', 'Masalan: olma yoki nok');
    list.push(inputValue);
    let elLList = document.createElement('li');

    for (mahsulotNomi of list) {
      elLList.setAttribute('class', 'text-light d-flex align-items-center border-bottom py-1 shadow-sm');
      elLList.textContent = mahsulotNomi;
      ellist.appendChild(elLList);
  
      let deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'O\'chirish';
      deleteBtn.setAttribute('class', 'btn btn-info shadow-lg rounded-3 border-light text-light ms-auto me-1');
      elLList.appendChild(deleteBtn);
  
      deleteBtn.addEventListener('click', function () {
        ellist.removeChild(elLList);
    });
  }

  elInput.value = null;
  elInput.focus();

  function updateScroll(){
    var element = document.getElementById("mainList");
    element.scrollTop = element.scrollHeight;
  }
  updateScroll();
  }
});