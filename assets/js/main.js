// Variables
let addBtn = document.getElementById('formBtn');
let expenseNameList = [];
let expenseValueList = [];
let expenseDescriptionList = [];
let editIndex = null; // Índice del gasto que se está editando

// Capturar el Valor de los Inputs
function saveInputs() {
  let expenseName = document.getElementById('expenseName').value.trim();
  let expenseValue = document.getElementById('expenseValue').value.trim();
  let expenseDescription = document.getElementById('expenseDescription').value.trim();

  // Validación de entradas
  if (!expenseName || isNaN(expenseValue) || expenseValue <= 0) {
    alert('Please enter a valid expense name and a positive value.');
    return;
  }

  if (editIndex !== null) {
    // Si estamos editando, actualizamos los valores en las listas
    expenseNameList[editIndex] = expenseName;
    expenseValueList[editIndex] = expenseValue;
    expenseDescriptionList[editIndex] = expenseDescription;
    editIndex = null; // Resetear índice de edición
    addBtn.textContent = 'Add Expenses'; // Volver al modo agregar
  } else {
    // Si no estamos editando, agregamos un nuevo gasto
    expenseNameList.push(expenseName);
    expenseValueList.push(expenseValue);
    expenseDescriptionList.push(expenseDescription);
  }

  updateExpenseList();
}

addBtn.addEventListener('click', saveInputs);

// Mostrar los gastos y valores en pantalla
function updateExpenseList() {
  const elementsList = document.getElementById('expenseList');
  const elementsTotal = document.getElementById('totalExpense');

  let htmlList = '';
  let totalExpense = 0;

  expenseNameList.forEach((name, position) => {
    const value = Number(expenseValueList[position]);
    const description = expenseDescriptionList[position];
    htmlList += `
      <li class="main__container-list--li" data-position="${position}">
        <strong>${name}</strong> - USD$ ${value.toFixed(2)}<br>
        ${description ? `<em> ${description}</em>` : ' '}
        <button class="main__container-btn--edit">Edit</button>
        <button class="main__container-btn--delete">Delete</button>
      </li>
    `;
    totalExpense += value;
  });

  elementsList.innerHTML = htmlList;
  elementsTotal.innerHTML = Number.isInteger(totalExpense) ? totalExpense : totalExpense.toFixed(2);
  clean();
}

// Limpiar los inputs
function clean() {
  document.getElementById('expenseName').value = '';
  document.getElementById('expenseValue').value = '';
  document.getElementById('expenseDescription').value = '';
}

// Eliminar un gasto
function eliminateExpenses(position) {
  expenseNameList.splice(position, 1);
  expenseValueList.splice(position, 1);
  expenseDescriptionList.splice(position, 1);
  updateExpenseList();
}

// Cargar datos en el formulario para editar
function editExpense(position) {
  document.getElementById('expenseName').value = expenseNameList[position];
  document.getElementById('expenseValue').value = expenseValueList[position];
  document.getElementById('expenseDescription').value = expenseDescriptionList[position];
  editIndex = position; // Establecemos el índice en edición
  addBtn.textContent = 'Save Changes'; // Cambiamos el texto del botón
}

// Event delegation para botones de eliminar y editar
document.getElementById('expenseList').addEventListener('click', function (e) {
  const position = e.target.closest('li').dataset.position;
  if (e.target.classList.contains('main__container-btn--delete')) {
    eliminateExpenses(position);
  } else if (e.target.classList.contains('main__container-btn--edit')) {
    editExpense(position);
  }
});