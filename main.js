import { createLibp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { noise } from '@chainsafe/libp2p-noise'

const node = await createLibp2p({
  transports: [tcp()],
  connectionEncryption: [noise()]
})

await node.start(); 
console.log('node started')


async function receiveMessage() {
  // Utilizamos el manejador de libp2p para escuchar por mensajes con el protocolo /echo/1.0.0
  for await (const { stream } of node.handle('/chat/1.0.0')) {
    // Recibimos el mensaje y lo mostramos en la consola
    for await (const data of stream.source) {
      console.log(data.toString())
      // Enviamos el mensaje de vuelta al remitente
      await stream.sink(Buffer.from('recibido'))
    }
  }
}   

async function sendMessage(peerId, message) {
    // Usamos el método node.dial para conectarnos al peer y enviar el mensaje
    node.dial(peerId, '/echo/1.0.0', (error, conn) => {
      if (error) {
        console.error('Error al conectar con el peer:', error)
        return
      }
  
      // Creamos el flujo de datos y enviamos el mensaje
      const stream = conn.newStream()
      stream.write(Buffer.from(message))
      stream.end()
    })
  }



console.log(node.peerId); 