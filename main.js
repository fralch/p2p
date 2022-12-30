import { createLibp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { noise } from '@chainsafe/libp2p-noise'

const node = await createLibp2p({
  transports: [tcp()],
  connectionEncryption: [noise()]
})

await node.start(); 
console.log('node started')

if (node) {
    console.log(node.peerId.toB58String())
    // const idnode = node.peerId.toB58String();
    // console.log(idnode)
  } else {
    console.log('La variable node es null o undefined')
  } 