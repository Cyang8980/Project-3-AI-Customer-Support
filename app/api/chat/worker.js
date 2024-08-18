onmessage = (e) => {
    const { data } = e;
    const { messages, image } = data;
    const request = { model: process.env.MODEL_ID }

    if (messages) {
        request.messages = messages
    }

    if (image) {
        request.image = { url: image }
    }

    fetch(process.env.META_API_URL, {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${process.env.META_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(data => postMessage(data))
    .catch(error => console.error(error))
}