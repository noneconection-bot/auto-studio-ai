function generateContent() {
    let topic = document.getElementById("userInput").value;

    if (!topic) {
        alert("Bhai topic likho 😅");
        return;
    }

    fetch("https://c4fb723c-7541-4bc1-893c-fda19b8571c7-00-25fe2rej5t5kj.pike.replit.dev/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic })
    })
    .then(res => res.json())
    .then(data => {
        let text = data.result || "";

        document.getElementById("title").innerText = extract(text, "Title:");
        document.getElementById("description").innerText = extract(text, "Description:");
        document.getElementById("tags").innerText = extract(text, "Tags:");
        document.getElementById("script").innerText = extract(text, "Script:");
    })
    .catch(err => {
        console.log(err);
        alert("Server error 😅 Replit backend check karo");
    });
}

function extract(text, label) {
    let start = text.indexOf(label);
    if (start === -1) return "";

    start += label.length;

    let end = text.length;
    let labels = ["Title:", "Description:", "Tags:", "Script:"];

    for (let l of labels) {
        if (l !== label) {
            let i = text.indexOf(l, start);
            if (i !== -1 && i < end) {
                end = i;
            }
        }
    }

    return text.substring(start, end).trim();
}
