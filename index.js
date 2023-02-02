const { createApp } = Vue;
createApp({
    // Model
    data() {
        return {
            notes: [],
            title: "",
            text: "",
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
    watch: {
        notes: {
            handler(val) {
                localStorage.setItem("notes", JSON.stringify(val));
            },
            deep: true,
        },
    },
    created() {
        this.notes = JSON.parse(localStorage.getItem("notes")) || [];
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