// Select elements
const noteTitle = document.querySelector("#noteTitle");
const noteSection = document.querySelector("#noteContent");
const addNoteBtn = document.querySelector(".addNote");
const template = document.querySelector("#template");
const notesContainer = document.querySelector("#notesContainer");
const emptyPlaceholder = document.querySelector("#emptyPlaceholder");

// Add Note functionality
addNoteBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const title = noteTitle.value.trim();
    const content = noteSection.value.trim();

    if (!title || !content) return alert("Please add title and content!");

    // Clone template
    const newNote = template.content.cloneNode(true);
    newNote.querySelector(".title").textContent = title;
    newNote.querySelector(".content").textContent = content;

    notesContainer.appendChild(newNote);
    emptyPlaceholder.style.display = "none";

    const noteCard = notesContainer.lastElementChild;
    const deleteBtn = noteCard.querySelector(".delete");
    const editBtn = noteCard.querySelector(".edit");
    const saveBtn = noteCard.querySelector(".save");
    const contentP = noteCard.querySelector(".content");

    // Delete functionality
    deleteBtn.onclick = () => {
        noteCard.remove();
        if (!notesContainer.children.length) emptyPlaceholder.style.display = "block";
    };

    // Edit functionality
    editBtn.onclick = () => {
        const editInput = document.createElement("textarea");
        editInput.value = contentP.textContent;
        noteCard.insertBefore(editInput, contentP);
        contentP.style.display = "none";
        editBtn.style.display = "none";
        saveBtn.style.display = "inline-block";
    };

    // Save functionality
    saveBtn.onclick = () => {
        const editInput = noteCard.querySelector("textarea");
        if (!editInput) return;
        contentP.textContent = editInput.value;
        contentP.style.display = "block";
        editBtn.style.display = "inline-block";
        saveBtn.style.display = "none";
        editInput.remove();
    };

    // Clear input fields
    noteTitle.value = "";
    noteSection.value = "";
});
