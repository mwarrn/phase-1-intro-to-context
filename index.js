const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (employeeRecords) => {
    const result = [];
    for (const employee of employeeRecords) {
        result.push(createEmployeeRecord(employee));
    }
    return result;
}

const createTimeInEvent = (record, timeStamp) => {
    const timeObj = {
        type: "TimeIn",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.slice(-4), 10)
    }
    record.timeInEvents.push(timeObj);
    return record;
}

const createTimeOutEvent = (record, timeStamp) => {
    const timeObj = {
        type: "TimeOut",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.slice(-4), 10)
    }
    record.timeOutEvents.push(timeObj);
    return record;
}

const hoursWorkedOnDate = (record, date) => {
    let hourIn, hourOut;

    for (const timeOut of record.timeOutEvents) {
        if (timeOut['date'] === date) {
            hourOut = timeOut['hour']
        }
    }
    for (const timeIn of record.timeInEvents) {
        if (timeIn['date'] === date) {
            hourIn = timeIn['hour']
        }
    }
    return (hourOut - hourIn) / 100;
}

const wagesEarnedOnDate = (record, date) => {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}

const allWagesFor = (record) => {
    let pay = 0;
    let dateArr = [];
    for (const timeOut of record.timeOutEvents) {
        dateArr.push(timeOut['date'])        
    }
    for (const date of dateArr) {
        pay += wagesEarnedOnDate(record, date)
    }
    return pay;
}

const calculatePayroll = (record) => {
    let payroll = 0;
    for (const employee of record) {
        payroll += allWagesFor(employee);        
    }
    return payroll;
}
