$(document).ready(function () {
    var events = [];
    var files = [
        './iran-legal.ics',
        './iran-holidays.ics'
    ];
    $.each(files, function (index, file) {
        $.ajax({
            url: file,
            dataType: 'text',
            success: function (data) {
                var jcalData = ICAL.parse(data);
                var comp = new ICAL.Component(jcalData);
                var eventComps = comp.getAllSubcomponents('vevent');
                $.each(eventComps, function (index, item) {
                    var event = {
                        title: item.getFirstPropertyValue('summary'),
                        start: item.getFirstPropertyValue('dtstart').toJSDate(),
                        end: item.getFirstPropertyValue('dtend').toJSDate(),
                        location: item.getFirstPropertyValue('location')
                    };
                    events.push(event);
                });
                $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    defaultDate: '2024-01-22',
                    navLinks: true,
                    editable: true,
                    eventLimit: true,
                    events: events
                });
            }
        });
    });
});
