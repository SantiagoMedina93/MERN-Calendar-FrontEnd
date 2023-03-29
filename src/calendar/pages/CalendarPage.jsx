import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useSelector } from 'react-redux';


import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "../";

import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';




export const CalendarPage = () => {

    const { user } = useAuthStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const { openDateModal } = useUiStore();
    const [lastView,setLastView] = useState(localStorage.getItem('lastView') || 'week');
    const eventStyleGetter = ( event, start, end, isSelected ) =>{
        const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user._id );
        console.log( isMyEvent );
        const style = {
            backgroundColor:  isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return { style }
    }
    

    const onDoubleClick = (event) => {
        // console.log({ doubleClick: event });
        openDateModal();
    }
    const onSelect = (event) => {
        setActiveEvent( event );
    }
    const onViewChanged = (event) => {
        localStorage.setItem('lastView',event)
        setLastView( event )
    }

    useEffect(() => {
        startLoadingEvents();
    }, []);


    
    return (
        <>
            <NavBar />
            <Calendar
                culture='es'
                localizer={localizer}
                events={ events } // aca
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={ getMessagesES() }
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent = { onDoubleClick }
                onSelectEvent = { onSelect }
                onView = { onViewChanged }
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />

        </>
    )
};