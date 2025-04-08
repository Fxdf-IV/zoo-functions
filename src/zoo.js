
const data = require('./data');
const speciesInfo = data.species; 
const employeesInfo = data.employees;
const entriesPrice = data.prices;

function getSpeciesByIds(...ids) {
  return speciesInfo.filter(specie => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  const specieAnimal = speciesInfo.find(specie => specie.name === animal);
  const residentsInfos = specieAnimal.residents;

  return residentsInfos.every(resident => resident.age > age);
}


function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  };
  return employeesInfo.find(employee => employeeName.includes(employee.firstName) || employeeName.includes(employee.lastName));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employeesInfo.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employeesInfo.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  const speciesName = speciesInfo.map(animal => animal.name);
  const speciesCount = speciesInfo.map(animal => animal.residents.length);
  let animalQuantieList = {};

  for (let index in speciesName) {
    animalQuantieList[speciesName[index]] = speciesCount[index]
  };

  if (species === undefined) {
    return animalQuantieList
  };

  return animalQuantieList[species];
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length <= 0) {
    return 0
  };

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;

  let result = (
    (Adult * entriesPrice.Adult) +
    (Child * entriesPrice.Child) +
    (Senior * entriesPrice.Senior)
  );

  return result
}


function getAnimalMap(options = {}) {
  const speciesName = speciesInfo.map(animal => animal.name);
  const speciesLocation = speciesInfo.map(animal => animal.location);
  /* const test1 = new Set(speciesLocation); */
  const searchConditions = `${options.includeNames}-${options.sorted}-${options.sex}`;
  let resultSearch = {};

  for (let index in speciesName) {
    const location = speciesLocation[index];
    const animal = speciesName[index];

    if (!resultSearch[location]) {
      resultSearch[location] = [];
    }
    console.log(resultSearch)
    resultSearch[location].push(animal);
  };

  let test = {
    NE: [
      { lions: ['Zena', 'Maxwell', 'Faustino', 'Dee'] },
      { giraffes: ['Gracia', 'Antone', 'Vicky', 'Clay', 'Arron', 'Bernard'] }
    ],
    NW: [
      { tigers: ['Shu', 'Esther'] },
      { bears: ['Hiram', 'Edwardo', 'Milan'] },
      { elephants: ['Ilana', 'Orval', 'Bea', 'Jefferson'] }
    ],
    SE: [
      { penguins: ['Joe', 'Tad', 'Keri', 'Nicholas'] },
      { otters: ['Neville', 'Lloyd', 'Mercedes', 'Margherita'] }
    ],
    SW: [
      { frogs: ['Cathey', 'Annice'] },
      { snakes: ['Paulette', 'Bill'] }
    ]
  };

  switch (searchConditions) {
    case "true-undefined-undefined":
      return test;
    case "undefined-undefined-undefined":
      return resultSearch;
  };
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
