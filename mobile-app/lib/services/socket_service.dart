import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  late IO.Socket socket;

  void connect() {
    socket = IO.io('http://YOUR_BACKEND_IP:3000', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });
    socket.connect();

    socket.onConnect((_) {
      print('Connected to Socket.io server');
    });

    socket.onDisconnect((_) => print('Disconnected from Socket.io server'));
  }

  void updateLocation(String userId, double lat, double lng) {
    socket.emit('update_location', {
      'userId': userId,
      'lat': lat,
      'lng': lng,
    });
  }

  void listenForLocationUpdates(Function(dynamic) onUpdate) {
    socket.on('location_updated', (data) => onUpdate(data));
  }
}
