'use strict';

describe('Parse list app ', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render list', () => {
    cy.get('ul');
  });

  it('should have 11 items', () => {
    cy.get('ul > li').should('have.length', 11);
  });

  it('should be sorted by salary DSC', () => {
    cy.get('ul > li').then(($ul) => {
      const list = [...$ul].map((row) =>
        row.dataset.salary.replace('$', '').replace(',', ''),
      );
      let counter = 0;

      for (let i = 0; i < list.length; i++) {
        if (Number(list[i + 1]) <= Number(list[i])) {
          counter += 1;
        }
      }

      expect(counter).to.equal(list.length - 1);
    });
  });
});


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
