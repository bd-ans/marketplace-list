let elInput = document.querySelector('.input');
let elButton = document.querySelector('.btn');
let ellist = document.querySelector('.list');

let list = [];

elInput.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    elButton.click();
  }
} );

elButton.addEventListener('click', function () {
  let inputValue = elInput.value;

  if (inputValue === '') {
    elInput.setAttribute('placeholder', 'Iltimos mahsulot nomini kiriting');
  } else { 
    elInput.setAttribute('placeholder', 'Masalan: olma yoki nok');
    list.push(inputValue);

  for (mahsulotNomi of list) {
    let elLList = document.createElement('li');
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
  elInput.value = '';
  list = [];

  function updateScroll(){
    var element = document.getElementById("mainList");
    element.scrollTop = element.scrollHeight;
  }
  updateScroll();
  }
});
