package ca.saultstemarie.mockvotecounter;

import java.io.IOException;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Enumeration;
import java.util.Map;

import fi.iki.elonen.NanoHTTPD;
import fi.iki.elonen.NanoHTTPD.Response.Status;

public class StartMockVoteCounter extends NanoHTTPD {
	
	public StartMockVoteCounter() throws IOException {
		super(8081);
		start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
		System.out.println("Server running.  Update mockVoteCounter.json with one of the following URLs.");
		
		Enumeration<NetworkInterface> e = NetworkInterface.getNetworkInterfaces();
		while(e.hasMoreElements()) {
			
		    NetworkInterface n = (NetworkInterface) e.nextElement();
		    Enumeration<InetAddress> ee = n.getInetAddresses();
		    while (ee.hasMoreElements()) {
		    	
		        InetAddress i = ee.nextElement();
		        
		        if (!(i instanceof Inet4Address)) {
		        	continue;
		        }
		        else if (i.isLoopbackAddress()) {
		        	continue;
		        }
		        
		        System.out.println("http://" + i.getHostAddress() + ":" + this.getListeningPort() + "/");
		    }
		}
	}

	public static void main(String[] args) {
		
		try {
			new StartMockVoteCounter();
			
		} catch (IOException e) {
			System.err.println("Couldn't start server:\n" + e);
		}
	}

	public Response serve(IHTTPSession session) {
		
		Response res;

		Map<String, String> parms = session.getParms();
		
		if (parms.get("pollingStationKey") != null) {
			
			VoteHandler.recordVote(parms);
			
			System.out.println("Votes received: " + parms.get("pollingStationKey"));
			
			res = newFixedLengthResponse(Status.OK, "application/json", "{\"success\":true}");
		}
		else {
			res = newFixedLengthResponse(Status.BAD_REQUEST, "application/json", "{\"success\":false}");
		}
		
		res.addHeader("Access-Control-Allow-Origin", "*");
		return res;
	}
}
