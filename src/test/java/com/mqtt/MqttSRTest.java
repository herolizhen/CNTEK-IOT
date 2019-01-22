
/**   
* @Title: MqttSRTest.java 
* @Package com.mqtt 
* @Description: TODO(用一句话描述该文件做什么) 
* @author herolizhen
* @date 2019年1月19日 上午10:28:11 
* @version V1.0   
*/

package com.mqtt;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

/**
 * @ClassName: MqttSRTest
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author HeroLizhen
 * @date 2019年1月19日 上午10:28:11
 * 
 */
public class MqttSRTest {
	private static int qos = 2; // 只有一次
//	private static String broker = "tcp://39.106.59.146:1883";
	private static String broker = "tcp://localhost:1883";
	private static String userName = "admin";
	private static String passWord = "admin";
	private static String clientId = "h---------123";
	private static String topic = "d2c.aaaaaa";
	
	public static void main(String[] args) throws MqttException {
		MemoryPersistence persistence = new MemoryPersistence();
		MqttConnectOptions connOpts = new MqttConnectOptions();
		connOpts.setCleanSession(true);
		connOpts.setUserName(userName);
		connOpts.setPassword(passWord.toCharArray());
		connOpts.setConnectionTimeout(100);
		connOpts.setKeepAliveInterval(20);
		MqttClient mqttClient = new MqttClient(broker, clientId, persistence);
		mqttClient.setCallback(new Callback("test"));
		mqttClient.connect(connOpts);
		MqttMessage message = new MqttMessage("ertwersdfas".getBytes());
		message.setQos(qos);
		message.setRetained(false);
		mqttClient.publish(topic, message);
	}
}

class Callback implements MqttCallback {
	private String threadId;

	public Callback(String threadId) {
		this.threadId = threadId;
	}

	public void connectionLost(Throwable cause) {

	}

	public void deliveryComplete(IMqttDeliveryToken token) {
//       System.out.println("deliveryComplete---------" + token.isComplete());
	}

	public void messageArrived(String topic, MqttMessage message) throws Exception {
		String msg = new String(message.getPayload());
		System.out.println(threadId + " " + msg);
	}
}

