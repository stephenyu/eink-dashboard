function getTimeInTimezone(timeZone) {
    const date = new Date();
    date.setHours(date.getMinutes() > 30 ? date.getHours() + 1 : date.getHours());

    const options = {
        timeZone,
        hour: 'numeric',
        dayPeriod: 'short'
    };

    return new Intl.DateTimeFormat('en-US', options).format(date)
}

function createCalendar() {
    const date = new Date();
    const todaysDate = date.getDate();

    const calHeaderElement = document.getElementById('calendar_heading');
    const options = {
        month: 'long',
        year: 'numeric'
    };
    calHeaderElement.innerText = new Intl.DateTimeFormat('en-US', options).format(date)

    const calElement = document.getElementById('calendar_body');
    date.setDate(1);
    const currentMonth = date.getMonth();

    let trElement = document.createElement('tr');

    for(let i = date.getDay(); i > 0; i--) {
        trElement.appendChild(document.createElement('td'));
    }

    while(date.getMonth() === currentMonth) {
        const tdElement = document.createElement('td');
        tdElement.innerText = date.getDate();
        tdElement.className = (date.getDate() === todaysDate)
            ? 'today'
            : '';

        trElement.appendChild(tdElement);

        date.setDate(date.getDate() + 1);
        if (date.getDay() === 0) {
            calElement.appendChild(trElement);
            trElement = document.createElement('tr');
        }
    }
    calElement.appendChild(trElement);
}

function createTimezones(arrayOfTimezones) {
    const elements = arrayOfTimezones.map(({timezone, label}) => {
        const time = getTimeInTimezone(timezone);
        const element = document.createElement('tr');
        element.className = 'worldclock_tr';
        element.innerHTML = `<td>${label}</td><td>${time}</td>`;
        return element;
    });

    const worldclockElement = document.getElementById('worldclock');
    elements.forEach(element => worldclockElement.appendChild(element));
}

createCalendar();
createTimezones([
    {timezone: 'Australia/Sydney', label: 'Sydney'},
    {timezone: 'Canada/Eastern', label: 'Ottawa'},
    {timezone: 'Europe/London', label: 'London'},
]);
