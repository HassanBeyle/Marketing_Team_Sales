function getSalesPersonById(data, id) {
    return data.find((item) => item.id === id);
  }
  
  function Days_months(year, month) {
    return new Date(year, month, 0).getDate();
  }
  
  function Working_Days_Month(year, month) {
    let workingDaysCount = 0;
  
    for (let i = 1; i <= Days_months(year, month); i++) {
      let dayOfWeek = new Date(year, month - 1, i).getDay();
      if (dayOfWeek !== 5) {
        workingDaysCount++;
      }
    }
  
    return { workingDays: workingDaysCount };
  }
  
  function dasys_of_worked_Ex_friday(from, to) {
    let workingDaysCount = 0;
    let currentDate = new Date(from);
  
    while (currentDate <= to) {
      let dayOfWeek = currentDate.getDay();
  
      if (dayOfWeek !== 5) {
        workingDaysCount++;
      }
  
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return workingDaysCount;
  }
  
  function Sales_by_day(data, yearlySales, from, to, id) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const monthlyAmount = yearlySales / 12;
    const person = getSalesPersonById(data, id);
  
    if (!person) {
      throw new Error(`Sales Person Is not Found ${id}`);
    }
  
    const validated = person.sales.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= fromDate && itemDate <= toDate;
    });
  
    const worked_Targets = [];
    const working_Days_Excluded_Fridays = [];
    let currentDate = new Date(fromDate);
  
    while (currentDate <= toDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const { workingDays } = Working_Days_Month(year, month);
  
      if (workingDays > 0) {
        worked_Targets.push(monthlyAmount / workingDays);
        working_Days_Excluded_Fridays.push(workingDays);
      }
  
      currentDate.setMonth(currentDate.getMonth() + 1, 1);
    }
  
    return {
      worked_Targets,
      totalTarget: validated.length * monthlyAmount,
      working_Days_Excluded_Fridays,
      daysWorkedExcludingFridays: dasys_of_worked_Ex_friday(fromDate, toDate),
    };
  }
  
  const data = [
    {
      id: 1,
      name: "Hassan Abdi Ahmed",
      sales: [
        {
          id: 1,
          date: "2023-01-01",
        },
        {
          id: 2,
          date: "2023-02-01",
        },
        {
          id: 3,
          date: "2023-03-01",
        },
        {
          id: 4,
          date: "2023-04-01",
        },
        {
          id: 5,
          date: "2023-05-01",
        },
        {
          id: 6,
          date: "2023-06-01",
        },
        {
          id: 7,
          date: "2023-07-01",
        },
        {
          id: 8,
          date: "2023-08-01",
        },
        {
          id: 9,
          date: "2023-09-01",
        },
        {
          id: 10,
          date: "2023-10-01",
        },
        {
          id: 11,
          date: "2023-11-01",
        },
        {
          id: 12,
          date: "2023-12-01",
        },
      ],
    },
  ];
  
  console.log(Sales_by_day(data, 5220, "2023-01-01", "2023-01-30", 1));