
const data = require('./data');
const speciesInfo = data.species; 
const employeesInfo = data.employees;
const entriesPrice = data.prices;

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

function getAnimalMap(options) {
  const speciesName = speciesInfo.map(animal => animal.name);
  const speciesLocation = speciesInfo.map(animal => animal.location);
  let animalLocations = {};

  for (let index in speciesName) {
    animalLocations[speciesLocation[index]] = [speciesName[index]]
  }

  if (options === undefined) {
    return animalLocations
  }
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
