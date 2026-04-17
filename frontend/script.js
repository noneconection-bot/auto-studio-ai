async function generateContent() {
    let topic = document.getElementById("userInput").value;

    if (!topic) return alert("Topic likho");

    let res = await fetch("https://YOUR-REPLIT-URL/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic })
    });

    let data = await res.json();

    document.getElementById("title").innerText = data.title;
    document.getElementById("description").innerText = data.description;
    document.getElementById("tags").innerText = data.tags;
    document.getElementById("script").innerText = data.script;
}
