const campusLocations = [
  // Gates
  {
    name: "Main Gate",
    category: "Gate",
    lat: 29.86550,
    lng: 77.88952
  },
  {
    name: "Gate No. 8",
    category: "Gate",
    lat: 29.86469,
    lng: 77.89088
  },
  {
    name: "Gate No. 5 (PWD Gate)",
    category: "Gate",
    lat: 29.86910,
    lng: 77.89958
  },
  {
    name: "Century Gate",
    category: "Gate",
    lat: 29.86862,
    lng: 77.89022
  },

  // Administration & Core
  {
    name: "Main Building (Admin Block)",
    category: "Administration",
    lat: 29.86440,
    lng: 77.89661
  },
  {
    name: "Accounts Section",
    category: "Administration",
    lat: 29.86469,
    lng: 77.89712
  },
  {
    name: "Central Library",
    category: "Academic",
    lat: 29.86525,
    lng: 77.89504
  },
  {
    name: "Convocation Hall",
    category: "Academic",
    lat: 29.86816,
    lng: 77.89098
  },
  {
    name: "Institute Computer Centre",
    aliases: [
      "ICC",
      "CSE department"
    ],
    category: "Facility",
    lat: 29.86280,
    lng: 77.89644
  },
  {
    name: "Training & Placement Cell",
    aliases: [
      "PIC",
      "Placement Cell"
    ],
    category: "Facility",
    lat: 29.86747,
    lng: 77.89104
  },
  {
    name: "Institute Hospital",
    aliases:[
      "Hospital"
    ],
    category: "Facility",
    lat: 29.86187,
    lng: 77.89294
  },
  {
    name: "Saraswati Mandir",
    category: "Religious",
    lat: 29.86826,
    lng: 77.89768
  },
  {
    name: "SAC",
    category: "Student Activity",
    lat: 29.86652,
    lng: 77.89975
  },
  {
    name: "MAC",
    category: "Student Activity",
    lat: 29.87020,
    lng: 77.89621
  },

  // Hostels
  {
    name: "Azad Bhawan",
    category: "Hostel",
    lat: 29.86545,
    lng: 77.89139
  },
  {
    name: "Radhakrishnan Bhawan",
    aliases: [
      "RKB"

    ],
    category: "Hostel",
    lat: 29.87162,
    lng: 77.89529
  },
  {
    name: "Rajendra Bhawan",
    category: "Hostel",
    lat: 29.87086,
    lng: 77.89345
  },
  {
    name: "Rajiv Bhawan",
    category: "Hostel",
    lat: 29.86963,
    lng: 77.89503
  },
  {
    name: "Govind Bhawan",
    category: "Hostel",
    lat: 29.86208,
    lng: 77.89461
  },
  {
    name: "Cautley Bhawan",
    category: "Hostel",
    lat: 29.87189,
    lng: 77.89497
  },
  {
    name: "Himalaya Bhawan",
    category: "Hostel",
    lat: 29.86066,
    lng: 77.89672
  },
  {
    name: "Ravindra Bhawan",
    category: "Hostel",
    lat: 29.86505,
    lng: 77.89239
  },
  {
    name: "Vigyan Bhawan",
    category: "Hostel",
    lat: 29.86110,
    lng: 77.90006
  },
  {
    name: "Jawahar Bhawan",
    category: "Hostel",
    lat: 29.86445,
    lng: 77.90049
  },
  {
    name: "Kasturba Bhawan",
    category: "Hostel",
    lat: 29.86724,
    lng: 77.90123
  },
  {
    name: "Vivekanand Bhawan",
    category: "Hostel",
    lat: 29.86147,
    lng: 77.89707
  },
  {
    name: "Ganga Bhawan",
    category: "Hostel",
    lat: 29.87129,
    lng: 77.89450
  },
  {
    name: "Sarojini Bhawan",
    category: "Hostel",
    lat: 29.86457,
    lng: 77.89990
  },

  // Hostel Mess Halls
  {
    name: "Cautley Bhawan Mess",
    category: "Mess",
    lat: 29.87189,
    lng: 77.89497
  },
  {
    name: "Govind Bhawan Mess",
    category: "Mess",
    lat: 29.86319,
    lng: 77.89435
  },

  // Departments
  {
    name: "Chemical Engineering",
    aliases: [
      "Che"
    ],
    category: "Department",
    lat: 29.86684,
    lng: 77.89358
  },
  {
    name: "Computer Science & Engineering",
    category: "Department",
    aliases: [
      "Cse"
    ],
    lat: 29.86328,
    lng: 77.89573
  },
  {
    name: "Mechanical & Industrial Engineering",
    category: "Department",
    lat: 29.86267,
    lng: 77.89734
  },
  {
    name: "Electronics & Communication Engineering",
    category: "Department",
    aliases: [
      "ece"
    ],
    lat: 29.86372,
    lng: 77.89575
  },
  {
    name: "Electrical Engineering",
    category: "Department",
    aliases: [
      "ee"
    ],
    lat: 29.86318,
    lng: 77.89734
  },
  {
    name: "Civil Engineering",
    category: "Department",
    lat: 29.86278,
    lng: 77.89848
  },
  {
    name: "Earthquake Engineering",
    category: "Department",
    lat: 29.86593,
    lng: 77.90099
  },
  {
    name: "Architecture & Planning",
    category: "Department",
    lat: 29.86353,
    lng: 77.90005
  },
  {
    name: "Physics",
    category: "Department",
    lat: 29.86225,
    lng: 77.89613
  },
  {
    name: "Mathematics",
    category: "Department",
    lat: 29.86189,
    lng: 77.89644
  },
  {
    name: "Humanities & Social Sciences",
    aliases: [
      "economics"
    ],
    category: "Department",
    lat: 29.86164,
    lng: 77.89589
  },
  {
    name: "Hydrology",
    category: "Department",
    lat: 29.86869,
    lng: 77.89497
  },
  {
    name: "Biosciences & Bioengineering",
    category: "Department",
    lat: 29.86224,
    lng: 77.89157
  },
  {
    name: "Management Studies (DoMS)",
    aliases: [
      "doms"
    ],
    category: "Department",
    lat: 29.86467,
    lng: 77.89484
  },
  {
    name: "Water Resources Development & Management",
    category: "Department",
    lat: 29.86360,
    lng: 77.89829
  },
  {
    name: "National Institute of Hydrology (NIH)",
    category: "Research Institute",
    lat: 29.86851,
    lng: 77.89422
  },

  // Lecture Halls
  {
    name: "Gargi Block, LHC",
    category: "Academic",
    lat: 29.86491,
    lng: 77.89392
  },
  {
    name: "APJ Abdul Kalam Block, LHC",
    aliases: [
      "apj"
    ],
    category: "Academic",
    lat: 29.86586,
    lng: 77.89408
  },

  // Canteens
  {
    name: "Green Gala Cafe",
    category: "Canteen",
    lat: 29.86395,
    lng: 77.89398
  },
  {
    name: "CBRI Canteen",
    category: "Canteen",
    lat: 29.86331,
    lng: 77.90287
  },

  // Grounds
  {
    name: "LBS Stadium",
    category: "Ground",
    lat: 29.86756,
    lng: 77.89547
  },
  {
    name: "Football Ground",
    category: "Ground",
    lat: 29.86786,
    lng: 77.89848
  },
  {
    name: "ABN Ground",
    category: "Ground",
    lat: 29.86961,
    lng: 77.89625
  },

  // Guest Houses
  {
    name: "Khosla Bhawan Guest House",
    aliases: [
      "kih"
    ],
    category: "Guest House",
    lat: 29.86184,
    lng: 77.89927
  },
  {
    name: "NC Nigam Visitor's Hostel",
    category: "Guest House",
    lat: 29.86428,
    lng: 77.89936
  }
];

export default campusLocations;