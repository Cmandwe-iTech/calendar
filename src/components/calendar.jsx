// import format from "date-fns/format";
// import getDay from "date-fns/getDay";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import React, { useState } from "react";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../src/App.css"
// const locales = {
//     "en-US": require("date-fns/locale/en-US"),
// };
// const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek,
//     getDay,
//     locales,
// });

// const events = [
//     {
//         title: "Big Meeting",
//         allDay: true,
//         start: new Date(2021, 6, 0),
//         end: new Date(2021, 6, 0),
//     },
//     {
//         title: "Vacation",
//         start: new Date(2021, 6, 7),
//         end: new Date(2021, 6, 10),
//     },
//     {
//         title: "Conference",
//         start: new Date(2021, 6, 20),
//         end: new Date(2021, 6, 23),
//     },
// ];

// function App() {
//     const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
//     const [allEvents, setAllEvents] = useState(events);

//     function handleAddEvent() {

//         for (let i=0; i<allEvents.length; i++){

//             const d1 = new Date (allEvents[i].start);
//             const d2 = new Date(newEvent.start);
//             const d3 = new Date(allEvents[i].end);
//             const d4 = new Date(newEvent.end);

//              if (
//               ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
//                 (d4 <= d3) )
//               )
//             {
//                 alert("CLASH");
//                 break;
//              }

//         }

//         setAllEvents([...allEvents, newEvent]);
//     }

//     return (
//         <div className="App">
//             <h1>Calendar</h1>
//             <h2>Add New Event</h2>
//             <div>
//                 <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
//                 <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
//                 <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
//                 <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
//                     Add Event
//                 </button>
//             </div>
//             <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
//         </div>
//     );
// }

// export default App;
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { useEffect, useState } from "react";
import { ModalHeader, Modal, ModalBody } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// const events = [{ title: "Meeting", start: new Date() }];

function Calendar() {
  const [event, setEvents] = useState([]);
  const [prompt, setPrompt] = useState(false);
  const [details, setDetails] = useState({
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  const navigate = useNavigate()
    const events = [
      {
        title: "Meeting",
        start: "2023-05-05T08:00:00",
        end: "2023-05-05T09:00:00",
      },
      {
        title: "Meeting",
        start: "2023-05-05T09:00:00",
        end: "2023-05-05T10:00:00",
      },
    ];
  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    const config = {
      headers: {
        authorization: token,
      },
    };
    axios.get("https://calendar-m8yj.onrender.com/events", config).then((res) => {
      setEvents(res.data.events);
    });
  }, [event]);
 async function handleEvent(){
    const token = window.sessionStorage.getItem("token");
    const config = {
      headers: {
        authorization: token,
      },
    };
   await axios.post("https://calendar-m8yj.onrender.com/events", details, config).then((res)=>{
        console.log("ok");
    })
  }
  return (
    <div className="calendar-container">
      <h1>Calendar</h1>
      <Modal isOpen={prompt} toggle={() => setPrompt(!prompt)}>
        <ModalHeader>New Event</ModalHeader>
        <ModalBody>
         
            <label>Title</label>
            <input type="text" onChange={(e)=>setDetails({...details, title:e.target.value})}/><br/>
            <label>start date</label>
            <input type="Date" onChange={(e)=>setDetails({...details, startDate:e.target.value})}/><br/>
            <label>end date</label>
            <input type="Date" onChange={(e)=>setDetails({...details, endDate:e.target.value})}/><br/>
            <label>start time</label>
            <input type="time" value="${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}" onChange={(e)=>setDetails({...details, startTime:e.target.value})}/><br/>
            <label>end date</label>
            <input type="time" value="${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}" onChange={(e)=>setDetails({...details, endTime:e.target.value})}/><br/>
            <label>description</label>
            <input type="text" onChange={(e)=>setDetails({...details, description:e.target.value})}/><br/>
            <button
              className="cancel"
              onClick={() => {
                setPrompt(!prompt);
              }}
            >
              Cancel
            </button>
            <button
              className="submit"
              onClick={(e) => {
                {
                  setPrompt(false);
                  handleEvent()
                }
              }}
            >
              Save
            </button>
        </ModalBody>
      </Modal>

      <button id="btn" onClick={() => setPrompt(true)}>
        Add Event
      </button>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev, next",
          center: "title",
          end: "dayGridMonth, timeGridWeek, timeGridDay",
        }}
        // weekends={false}
        events={events}
        eventContent={renderEventContent}
        eventDidMount={(info) => {
          // console.log(info.event.extendedProps);
          // {description: "Lecture", department: "BioChemistry"}
          return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: "auto",
            trigger: "hover",
            customClass: "popoverStyle",
            content:
              "<p>please join <strong>meeting</strong>.</p>",
            html: true,
          });
        }}
        height={"80vh"}
      />
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default Calendar;
