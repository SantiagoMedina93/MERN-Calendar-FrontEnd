
import { useCalendarStore, useUiStore } from "../../hooks";


export const FabDelete = () => {
    
    const { startDeletingEvent, hasEvenSelected } = useCalendarStore();

    const handleDelete = () =>{
        startDeletingEvent();
    }
    
    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
            style={{
                display: hasEvenSelected? '':'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
            
        </button>
    )
}; 