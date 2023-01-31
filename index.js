const { createApp } = Vue;
createApp({
    data() {
        return {
            notes: ["Note 1", "Note 2", "Note 3"],
            text: null,
        };
    },
    methods: {
        handleClick() {
            if (this.text) {
                this.notes.push(this.text);
                this.text = "";
                this.$refs.input.focus();
            }
        },
    },
}).mount("#app");