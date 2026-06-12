import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
        pingTimeout: 60000,
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const {userId, userType} = data;

            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                });
            }else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id,
                    status: "active"
                })
            }
        });

        socket.on('update-location-captain', async (data) => {
            const {userId, location} = data;

            if(!location || !location.ltd || !location.lng){
                return socket.emit('error', {message: 'Invalid location data'});
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            })
        });

        socket.on('disconnect', async() => {
            await captainModel.findOneAndUpdate(
                { socketId: socket.id },
                { status: "inactive" }
            );
            console.log(`client disconnected: ${socket.id}`);
        });
    });
}

export const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(`sending message to ${socketId}`);

    console.log("EMITTING EVENT:", {
        socketId,
        event: messageObject.event
    });

    if(io){
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }else{
        console.log('Socket.io not initialize.');
    }
}
