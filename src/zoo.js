
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
  const speciesNames = speciesInfo.map(animal => animal.name);
  const speciesCount = speciesInfo.map(animal => animal.residents.length);
  let animalQuantieList = {};

  for (let index in speciesNames) {
    animalQuantieList[speciesNames[index]] = speciesCount[index]
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
  const includeNames = options.includeNames === true;
  const shouldSort = options.sorted === true;
  const filterSex = options.sex;

  let result = {};

  speciesInfo.forEach((animal) => {
    const speciesNames = animal.name;
    const location = animal.location;
    const residents = animal.residents;
    
    result[location] ??= [];

    if (!includeNames) {
      result[location].push(speciesNames);
      return;
    }

    let residentNames = residents;

    if (filterSex) {
      residentNames = residentNames.filter(({ sex }) => sex === filterSex);
    }

    residentNames = residentNames.map(({ name }) => name);

    if (shouldSort) {
      residentNames.sort();
    }

    result[location].push({ [speciesNames]: residentNames });
  });

  return result;
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
