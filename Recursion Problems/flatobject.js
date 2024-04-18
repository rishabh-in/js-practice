const personDetails = {
  name: "John Doe",
  age: 30,
  isStudent: false,
  address: {
    city: "ExampleCity",
    zipCode: "12345",
    hasPublicTransport: true,
    residence: {
      type: "Apartment",
      floor: 5,
      isFurnished: false,
    },
  },
};


const personDetails2 = {
  name: "John Doe",
  age: 30,
  isStudent: false,
  hobbies: ["reading", "coding", "traveling"],
  address: {
    city: "ExampleCity",
    zipCode: "12345",
    hasPublicTransport: true,
    landmarks: [
      { name: "Central Park", distance: 2.5 },
      "Downtown Square",
      { historical: "Museum of History", visitors: 500 },
    ],
    residence: {
      type: "Apartment",
      floor: 5,
      isFurnished: false,
      amenities: ["gym", "pool", "security"],
    },
  },
};

let result = {};

function flatObject(personDetails, parent = 'person') {
  Object.keys(personDetails).forEach((key) => {
    let updatedParent = `${parent}.${key}`;

    if (typeof personDetails[key] === 'object' && !Array.isArray(personDetails[key])) {
      flatObject(personDetails[key], updatedParent);
    } else if (Array.isArray(personDetails[key])) {
      personDetails[key].forEach((val, index) => {
        let newUpdatedParent = `${updatedParent}[${index}]`;

        if (typeof val === 'object') {
          flatObject(val, newUpdatedParent);
        } else {
          result[newUpdatedParent] = val;
        }
      });
    } else {
      result[updatedParent] = personDetails[key];
    }
  });
}
flatObject(personDetails2, "person")
console.log(result)