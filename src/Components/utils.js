const days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const alldataDummy = {
    Monday: [
        {
            id: '1',
            task: "Give 2 contests" 
        },{
            id: '1',
            task: "Do company work" 
        }
    ],
    Saturday: [
        {
            id: "1",
            task: "Do 3 dsa questions"
        },{
            id: '2',
            task: "Study javascript"
        }
    ],
    Wednesday: [
        {
            id: "1",
            task: "Play outside"
        }
    ]
  }

  const todaysdate = new Date();

  export {months, days, alldataDummy, todaysdate};