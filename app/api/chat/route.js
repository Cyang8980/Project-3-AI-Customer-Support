import { NextResponse } from 'next/server'

// const systemPrompt = ""

export async function POST(req) {

    const { messages, image } = req

    const request = { model: process.env.MODEL_ID }

    if (messages) {
        request.messages = messages
    }

    if (image) {
        request.image = { url: image }
    }

    const completion = await fetch(process.env.META_API_URL, {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${process.env.META_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request)
    })

    return NextResponse.json(await completion.json())
}
