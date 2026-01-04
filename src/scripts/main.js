'use strict';

function parseSalary(salaryStr) {
  return Number(salaryStr.replace('$', '') .replace(',', ''));
}

function sortList(list) {
  const items = [...list.querySelectorAll('li')];

  items.sort((a, b) => {
    return parseSalary(b.dataset.salary) - parseSalary(a.dataset.salary);
  });

  items.forEach(item => list.appendChild(item));
}

function getEmployees(list) {
  return [...list.querySelectorAll('li')].map(li => ({
    name: li.querySelector('.name').textContent,
    position: li.querySelector('.position').textContent,
    salary: parseSalary(li.dataset.salary),
    age: Number(li.querySelector('.age').textContent),
  }));
}

const list = document.querySelector('ul');

if (list) {
  sortList(list);
  const employees = getEmployees(list);
  console.log(employees);
}
