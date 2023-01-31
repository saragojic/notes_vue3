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
            if (this.text) {
                this.notes.push(this.text);
                this.text = "";
                this.$refs.input.focus();
            }
        },
        handleClickLIItem(position) {
            this.notes.splice(position, 1);
        },
    },
}).mount("#app");