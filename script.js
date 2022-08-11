const notesContainer = document.getElementById("container");
const addNotesButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.appendChild(noteElement, addNotesButton);
});

function getNotes() {
  return JSON.parse(localStorage.getItem("sticky-note") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("sticky-note", JSON.stringify(notes));
}

addNotesButton.addEventListener("click", () => addNote());

function createNoteElement(id, content) {
  const note = document.createElement("textarea");

  note.classList.add("note");
  note.value = content;
  note.placeholder = "Type here:";

  note.addEventListener("dblclick", () => {
    const doDelete = confirm("Are you sure you want to delete this note? ");
    if (doDelete) {
      deleteNote(id, note);
    }
  });
  note.addEventListener("change", (e) => updateNote(e, id));
  return note;
}
function updateNote(e, noteID) {
  let notes = getNotes();
  notes = notes.map((note) => {
    if (note.id === noteID) {
      note.content = e.target.value;
    }
    return note;
  });
  saveNotes(notes);
}

function addNote() {
  const notes = getNotes();
  const notesObject = {
    id: Math.floor(Math.random() * 10000),
    content: "",
  };

  const noteElement = createNoteElement(notesObject.id, notesObject.content);
  notesContainer.insertBefore(noteElement, addNotesButton);

  notes.push(notesObject);
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}
