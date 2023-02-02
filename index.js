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
        registerServiceWorker();
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

function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        let refreshing;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
            if (refreshing) return;
            window.location.reload();
            regfreshing = true;
        });
        navigator.serviceWorker
            .register("/notes_vue3/sw.js", { scope: "/notes-vue-3/" })
            .then((registration) => handleRegistration(registration))
            .catch((error) => console.log("Service Worker registration failed!", error));
    }
}

function handleRegistration(registration) {
    registration.addEventListener("updatefound", function () {
        if (registration.installing) {
            const worker = registration.installing;
            worker.addEventListener("statechange", function () {
                if (worker.state === "installed") {
                    handleUpdate(worker);
                }
            });
        } else if (registration.waiting) {
            const worker = registration.waiting;
            if (worker.state === "installed") {
                handleUpdate(worker);
            }
        }
    });
}

function handleUpdate(worker) {
    if (navigator.serviceWorker.controller) {
        worker.postMessage({ action: "skipWaiting" });
    }
}