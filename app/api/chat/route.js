import { NextResponse } from 'next/server'

// const systemPrompt = ""

export async function POST(req) {
    const completion = await fetch(process.env.META_API_URL, {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${process.env.META_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "model": process.env.MODEL_ID,
            "messages": req
        })
    })

    return NextResponse.json(await completion.json())
}
