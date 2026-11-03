// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
document.addEventListener('DOMContentLoaded', function () {
  
  const form = document.querySelector('#todo-form');
  const input = document.querySelector('#todo-input');
  const errorMsg = document.querySelector('#error-msg');
  const list = document.querySelector('#todo-list');
  const counter = document.querySelector('#counter');
  const filterButtons = document.querySelectorAll('.filters button');


  let currentFilter = 'all';

  
  function addTodo(e) {
    e.preventDefault(); 

    const text = input.value.trim();

    if (text == '') {
      errorMsg.classList.remove('hidden'); 
      return; 
    }

    errorMsg.classList.add('hidden');

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    input.value = '';
    input.focus();
    updateView();
  }


  function handleListClick(e) {
    const target = e.target; 

    if (target.classList.contains('delete-btn')) {

       list.removeChild(target.parentNode);
    } else if (target.classList.contains('item-text')) {
      target.parentNode.classList.toggle('completed');
    } else {
      return; 
    }

    updateView();
  }


  function changeFilter(e) {
    switch (e.target.id) {
      case 'filter-active':
        currentFilter = 'active';
        break;
      case 'filter-done':
        currentFilter = 'done';
        break;
      default:
        currentFilter = 'all';
    }
    updateView();
  }


  function hideError(e) {
    errorMsg.classList.add('hidden');
  }


  function updateView() {
    for (let li of list.children) {
      const isDone = li.classList.contains('completed');
      let show = true;

      if (currentFilter == 'active' && isDone) {
        show = false;
      }
      if (currentFilter == 'done' && !isDone) {
        show = false;
      }

      li.style.display = show ? '' : 'none';
    }


    const left = list.querySelectorAll('li:not(.completed)').length;
    counter.textContent = left == 1 ? `${left} item left` : `${left} items left`;
  }

  form.addEventListener('submit', addTodo);
  input.addEventListener('input', hideError);
  list.addEventListener('click', handleListClick);

  for (let btn of filterButtons) {
    btn.addEventListener('click', changeFilter);
  }

  updateView();
});

// Testing GitHub connection
