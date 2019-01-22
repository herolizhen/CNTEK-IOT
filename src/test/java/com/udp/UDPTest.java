package com.udp;


import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.text.SimpleDateFormat;
import java.util.Date;

/*
 * * Udp多线程回射服务器
 */
class UdpServerThread extends Thread {
	private DatagramSocket socket;
	// private byte[] infoBytes;
	String info = null;
	private int port;
	InetAddress ip;

	public UdpServerThread(DatagramPacket packet, DatagramSocket socket, byte[] infoBytes) {
		this.socket = socket;
		this.info = new String(infoBytes, 0, packet.getLength());
		this.port = packet.getPort();
		this.ip = packet.getAddress();
	}

	@Override
	public void run() {
		super.run();
		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd :hh:mm:ss");

		System.out.println(dateFormat.format(date) + " client:" + ip + " ;port=" + port + " ;info:" + info);
		byte[] echobuf = ("server:" + info).getBytes();
		DatagramPacket ret = new DatagramPacket(echobuf, echobuf.length, ip, port);
		try {
			socket.send(ret);
		} catch (IOException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}
}

public class UDPTest {
	private static final int PORT = 9960;

	public static void main(String[] args) throws IOException {
		DatagramSocket socket = new DatagramSocket(PORT);
		byte[] infoBytes = new byte[1024];

		System.out.println("Server is running..." );

		while (true) {
			DatagramPacket packet = new DatagramPacket(infoBytes, infoBytes.length);
			socket.receive(packet);
			UdpServerThread thread = new UdpServerThread(packet, socket, infoBytes);
			thread.start();
		}
	}
}