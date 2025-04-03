const { RTCPeerConnection, RTCDataChannel } = require('wrtc');

class ICENode {
    constructor(stunServers = []) {
        this.stunServers = stunServers;
        this.peerConnection = new RTCPeerConnection({
            iceServers: this.stunServers.map(server => ({ urls: server }))
        });
        this.dataChannel = null;
    }

    async gatherCandidates() {
        return new Promise((resolve, reject) => {
            let candidates = [];
            
            this.peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    candidates.push(event.candidate);
                } else {
                    resolve(candidates);
                }
            };

            this.peerConnection.createOffer()
                .then(offer => this.peerConnection.setLocalDescription(offer))
                .catch(reject);
        });
    }

    async establishConnection(remoteSDP) {
        await this.peerConnection.setRemoteDescription(remoteSDP);
        this.dataChannel = this.peerConnection.createDataChannel("chat");
        
        return new Promise((resolve) => {
            this.dataChannel.onopen = () => {
                this.dataChannel.send("hello");
                resolve("Connection established and hello message sent");
            };
        });
    }

    close() {
        if (this.peerConnection) {
            this.peerConnection.close();
        }
    }
}

module.exports = ICENode;
