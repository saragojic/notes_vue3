const { createApp } = Vue;
createApp({
    // Model
    data() {
        return {
            notes: [
                { id: "676c9ba771", title: "Title 1", text: "ToDo 1" },
                { id: "dc19d1538f", title: "Title 2", text: "ToDo 2" },
                { id: "fd8c75b4fb", title: "Title 3", text: "ToDo 2" },
            ],
            title: null,
            text: null,
        };
    },
    // Controller
    methods: {
        add() {
            if (this.title || this.text) {
                this.notes.push(createNote(this.title, this.text));
                this.title = "";
                this.text = "";
            }
        },
        del(id) {
            const position = this.notes.findIndex((note) => note.id === id);
            this.notes.splice(position, 1);
        },
    },
}).mount("#app");

function createNote(title, text) {
    const id = generateId(title, text);
    return { id, title, text };
}

function generateId(title, text, length = 10) {
    return CryptoJS.SHA256(title + text + new Date())
        .toString()
        .substring(0, length);
}