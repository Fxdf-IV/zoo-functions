const data = require('./data');
const speciesInfo = data.species; 
const employeesInfo = data.employees;

function getSpeciesByIds(...ids) {
  return speciesInfo.filter(specie => 
    ids.includes(specie.id)
  );
}

function getAnimalsOlderThan(animal, age) {
  const specieAnimal = speciesInfo.find(specie =>
    specie.name === animal
  );
  const residentsInfos = specieAnimal.residents;

  return residentsInfos.every(resident => resident.age > age);
}


function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  };
  return employeesInfo.find(employee =>
    employeeName.includes(employee.firstName) || employeeName.includes(employee.lastName)
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employeesInfo.some(employee =>
    employee.managers.includes(id)
  );
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
  // seu código aqui
}

function getAnimalMap(options) {
  // seu código aqui
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
