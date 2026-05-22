'use strict';

// Global constants
const numberOfSchools = 19;

// Global values
/** String array to store school’s name */
let schoolNames = new Array(numberOfSchools); 

/** String array to store the city where the school is located */
let cities = new Array(numberOfSchools);

/** String array to store the province, state, or territory where the school is located */
let provinces = new Array(numberOfSchools);

/** String array to store the country where the school is located */
let countries = new Array(numberOfSchools);

/** String array to store links to pictures of the schools */
let schoolPictures = new Array(numberOfSchools);

/** String array to store links to maps of where the schools are located */
let mapPictures = new Array(numberOfSchools);

/** String array to store the program names */
let programNames = new Array(numberOfSchools); 

/** number array to store the length of program in years */
let lengthsOfPrograms = new Array(numberOfSchools);

/** String array to store a description of the program */
let programDescriptions = new Array(numberOfSchools);

/** Boolean array – true if a program has coop or an internship, false otherwise */
let coop = new Array(numberOfSchools);

/** 
 * String array with a list of the courses needed to be admitted into the program.
 * 
 * Use <br> tags to put each on a different line
 */
let admissionCoursesNeeded = new Array(numberOfSchools);

/**
 * Number array to store the admission average needed to be admitted into the program. 
 * 
 * If a program says “high”, use a number ending with 8. For example, “high-90s”, use a number like 98.
 * 
 * For “mid”, use a number ending with 5. 
 * 
 * For “low”, use a number ending with 2.
 */
let admissionAveragesNeeded = new Array(numberOfSchools);

/** Number array to show the cost of a single year of domestic student tuition. */
let domesticTuitions = new Array(numberOfSchools);

/** Number array to show the cost of a single year of international student tuition. */
let internationalTuitions = new Array(numberOfSchools);

/** 
 * String array to show which additional academic costs are included in the next array.
 * 
 * For example, books, coop fees, etc.
 */
let academicCostDetails = new Array(numberOfSchools);

/** Number array to show additional academic costs included */
let academicCosts = new Array(numberOfSchools);

/** 
 * String array to show which living costs are included in the next array.
 * 
 * For example, housing, meals, entertainment, transportation, etc.
 */
let livingCostDetails = new Array(numberOfSchools);

/** Number array to show the living cost of a single year */
let livingCosts = new Array(numberOfSchools);

/**
 * String array to show 3 interesting facts for the school.
 * 
 * Use an ordered list <ol> and <li> to separate each of the 3 facts.
 */
let interestingFacts = new Array(numberOfSchools);

/** String array with a link to the first primary source used for research */
let primarySources1 = new Array(numberOfSchools);

/** String array with a link to the second primary source used for research */
let primarySources2 = new Array(numberOfSchools);

/** String array with a link to the third primary source used for research */
let primarySources3 = new Array(numberOfSchools);

/** String array with a link to the first secondary source used for research */
let secondarySources1 = new Array(numberOfSchools);

/** String array with a link to the second secondary source used for research */
let secondarySources2 = new Array(numberOfSchools);
