import { CalcIcon, NoteIcon, ToDoIcon } from "@/app/assets/icons";
import { Calculator } from "@/features/Calculator";
import { Note } from "@/features/Note";
import { ToDoList } from "@/features/ToDoList";

export const widgets = [
    {
        name: 'calc',
        component: Calculator,
        moveHandler: null,
        icon: CalcIcon
    },
    {
        name: 'note',
        component: Note,
        moveHandler: null,
        icon: NoteIcon
    },
    {
        name: 'todo',
        component: ToDoList,
        moveHandler: null,
        icon: ToDoIcon
    }
]