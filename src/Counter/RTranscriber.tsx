import { AssemblyAI, RealtimeTranscript } from 'assemblyai'
import { useEffect, useRef } from 'react'
import { Readable } from 'stream'

useEffect( () => {
  const run = async () => {
    const client = new AssemblyAI( { apiKey: Bun.env.USER_API_KEY! } )
    const SAMPLE_RATE = 16_000

    const transcriber = client.realtime.transcriber( { sampleRate: SAMPLE_RATE } )

    transcriber.on( 'open', ( { sessionId } ) => {
      console.log( `Session opened with ID: ${sessionId}` )
    } )

    transcriber.on( 'error', ( error : Error ) => {
      console.error( 'Error:', error )
    } )

    transcriber.on( 'close', ( code : number, reason : string ) => console.log( 'Session closed:', code, reason ) )

    transcriber.on( 'transcript', ( transcript : RealtimeTranscript ) => {
      if ( !transcript.text ) {
        return
      }

      if ( transcript.message_type === 'PartialTranscript' ) {
        console.log( 'Partial:', transcript.text )
      }
      else {
        console.log( 'Final:', transcript.text )
      }
    } )
  }
}, [] )
