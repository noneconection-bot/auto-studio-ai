function generateContent() {
    let topic = document.getElementById("userInput").value;

    if (!topic) {
        alert("Bhai topic likho 😅");
        return;
    }

    fetch("https://YOUR-REPLIT-URL/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic })
    })
    .then(res => res.json())
    .then(data => {

        document.getElementById("title").innerText = data.title;
        document.getElementById("description").innerText = data.description;
        document.getElementById("tags").innerText = data.tags;
        document.getElementById("script").innerText = data.script;

    })
    .catch(err => {
        console.log(err);
        alert("Server error 😅");
    });
}
