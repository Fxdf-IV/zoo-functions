
const data = require('./data');
const animalSpeciesData = data.species; 
const employeeData = data.employees;
const animalEntryPrices = data.prices;
const zooOpeningHours = data.hours;

function getSpeciesByIds(...ids) {
  return animalSpeciesData.filter(specie => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  const specieAnimal = animalSpeciesData.find(specie => specie.name === animal);
  const residentsInfos = specieAnimal.residents;

  return residentsInfos.every(resident => resident.age > age);
}


function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  };
  return employeeData.find(employee => employeeName.includes(employee.firstName) || employeeName.includes(employee.lastName));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employeeData.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employeeData.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  let animalQuantieList = {};

  animalSpeciesData.forEach((animal) => {
    animalQuantieList[animal.name] = animal.residents.length;
  });

  if (species === undefined) {
    return animalQuantieList
  }

  return animalQuantieList[species]
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length <= 0) {
    return 0
  };

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;

  let result = (
    (Adult * animalEntryPrices.Adult) +
    (Child * animalEntryPrices.Child) +
    (Senior * animalEntryPrices.Senior)
  );

  return result
}


function getAnimalMap(options = {}) {
  const includeNames = options.includeNames;
  const shouldSort = options.sorted;
  const filterSex = options.sex;

  let result = {};

  animalSpeciesData.forEach((specie) => {
    const specieName = specie.name;
    const location = specie.location;
    const residents = specie.residents;
    
    result[location] ??= [];

    if (!includeNames) {
      result[location].push(specieName);
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

    result[location].push({ [specieName]: residentNames });
  });

  console.log(result)
  return result;
}

function getSchedule(dayName) {
  const zooOperatingDays = Object.keys(zooOpeningHours);
  const zooInfo = {};
  
  zooOperatingDays.forEach((day) => {
    const { open, close } = zooOpeningHours[day];
    const hourIn12Format = close % 12 || 12;

    let operatingHoursMessage = `Open from ${open}am until ${hourIn12Format}pm`;

    if (open === 0 || close === 0) {
      operatingHoursMessage = 'CLOSED'
    }
  
    zooInfo[day] = operatingHoursMessage;
  });
  
  if (dayName === undefined) {
    return zooInfo
  };

  const dailyZooInfo = { [dayName]: zooInfo[dayName] }
  
  return dailyZooInfo;
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
