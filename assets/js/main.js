import Swal from 'sweetalert2'

// Variables
let addBtn = document.getElementById('formBtn');
let expenseNameList = [];
let expenseValueList = [];

// Capturar el Valor de los Inpus
function saveInputs() {
  let expenseName = document.getElementById('expenseName').value.trim();
  let expenseValue = document.getElementById('expenseValue').value;

    // Validación de entradas
    if (!expenseName || isNaN(expenseValue) || expenseValue <= 0) {
      alert('Please enter a valid expense name and a positive value.');
      return;
    }

  expenseNameList.push(expenseName);
  expenseValueList.push(expenseValue);

  updateExpenseList();
};

addBtn.addEventListener('click', saveInputs);

// Mostrar los gastos y valores en pantalla
function updateExpenseList() {
  const elementsList = document.getElementById('expenseList');
  const elementsTotal = document.getElementById('totalExpense');

  let htmlList = '';
  let totalExpense = 0;

  expenseNameList.forEach((element, position) => {
    const expenseValue = Number(expenseValueList[position])
    htmlList +=
    `<li class="main__container-list--li">${element} - USD$ ${expenseValue.toFixed(2)}
      <button class="main__container-btn--delete" id="deleteBtn">Delete</button>
    </li>`;
    // Calcular el total de los gastos y mostrarlo en la pantalla
    totalExpense += Number(expenseValue);
  });

  elementsList.innerHTML = htmlList;
  elementsTotal.innerHTML = totalExpense.toFixed(2);
  clean();
};

// Limpiar los inputs
function clean() {
  document.getElementById('expenseName').value = '';
  document.getElementById('expenseValue').value = '';
};

// Eliminar un gasto
function eliminateExpenses(position) {
  expenseNameList.splice(position, 1);
  expenseValueList.splice(position, 1);
  updateExpenseList();
};

document.getElementById('expenseList').addEventListener('click', function (e) {
  if (e.target.classList.contains('main__container-btn--delete')) {
    const position = e.target.closest('li').dataset.position;
    eliminateExpenses(position);
  }
});
