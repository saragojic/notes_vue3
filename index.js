const { createApp } = Vue;
createApp({
    data() {
        return {
            notes: ["Note 1", "Note 2", "Note 3"],
            text: null,
        };
    },
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