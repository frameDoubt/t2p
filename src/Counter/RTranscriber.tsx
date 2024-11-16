import { AssemblyAI, RealtimeTranscript } from 'assemblyai'
import { useEffect, useRef } from 'react'
import { Readable } from 'stream'

useEffect( () => {
  const run = async () => {
    const client = new AssemblyAI( { apiKey: Bun.env.USER_API_KEY } )
  }
}, [] )
