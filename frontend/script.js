async function generateContent() {
    let topic = document.getElementById("userInput").value;

    if (!topic) {
        alert("Bhai topic likho 😅");
        return;
    }

    try {
        let res = await fetch("https://c4fb723c-7541-4bc1-893c-fda19b8571c7-00-25fe2rej5t5kj.pike.replit.dev/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ topic })
        });

        let data = await res.json();

        let text = data.result;

        // 🧠 safe extract function
        function extract(label) {
            let start = text.indexOf(label);
            if (start === -1) return "";
            start += label.length;

            let end = text.length;
            let nextLabels = ["Title:", "Description:", "Tags:", "Script:"];

            for (let l of nextLabels) {
                if (l !== label) {
                    let i = text.indexOf(l, start);
                    if (i !== -1 && i < end) {
                        end = i;
                    }
                }
            }

            return text.substring(start, end).trim();
        }

        document.getElementById("title").innerText = extract("Title:");
        document.getElementById("description").innerText = extract("Description:");
        document.getElementById("tags").innerText = extract("Tags:");
        document.getElementById("script").innerText = extract("Script:");

    } catch (err) {
        console.log(err);
        alert("Server error 😅 check backend");
    }
}
