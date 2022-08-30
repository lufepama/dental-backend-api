const { v4: uuidv4 } = require('uuid');

const getHoursString = (hours, min) => {
    if (min == 0) return `${hours}:00`
    return `${hours}:${min}`
}

const getBasicObject = (hour) => {

    return {
        hour: hour,
        squares: '1',
        isOccupated: false,
        patientId: '',
        description: '',
        specialist: '',
        isDisplayed: true,
        appointmentId: uuidv4()
    }

}

const getHoursAppointmentBasicArray = () => {

    let basicArray = []
    const arrayElements = 49

    let initialHour = 10
    let initialMins = 0



    for (let i = 1; i <= arrayElements; i++) {

        if (initialMins === 60) { initialMins = 0 }

        const data = getHoursString(initialHour, initialMins)

        initialMins += 15

        if (i % 4 === 0) {
            initialHour += 1
        }

        const myObject = getBasicObject(data)

        basicArray.push(myObject)

    }

    return basicArray

}

exports.getAppointmentObject = (doctorName, doctorId = '', appointmentsAvailable, speciality) => {

    const hours = getHoursAppointmentBasicArray()

    return {
        doctorId: doctorId,
        doctorName: doctorName,
        isActive: true,
        doctorAppointmentsId: uuidv4(),
        hoursAppointments: hours,
        appointmentsAvailable: appointmentsAvailable,
        speciality: speciality
    }

}