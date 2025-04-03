# ice-nodejs

`ice-nodejs` is a Node.js module implementing Interactive Connectivity Establishment (ICE) as specified in RFC 5245. It allows dynamic STUN server configuration, gathers local candidates, establishes a connection from behind NAT, and sends a "hello" message to verify the connection.

## Installation
```sh
npm install ice-nodejs
```

## Usage

### Example
```javascript
const ICENode = require('ice-nodejs');

(async () => {
    const ice = new ICENode(["stun:stun.l.google.com:19302"]);
    const candidates = await ice.gatherCandidates();
    console.log("Gathered ICE candidates:", candidates);
    
    // Assume we get a remote SDP from a peer
    const remoteSDP = {}; // Replace with actual SDP
    await ice.establishConnection(remoteSDP);
})();
```

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit) file for details.

## Contributing

Feel free to open an issue or submit a pull request if you'd like to contribute to this project.

## Author

Dipin Niroula - dipinniroula@hotmail.com, dipin@roqos.com  
www.roqos.com
