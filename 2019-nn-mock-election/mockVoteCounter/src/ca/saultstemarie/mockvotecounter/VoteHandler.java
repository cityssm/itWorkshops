package ca.saultstemarie.mockvotecounter;

import java.io.File;
import java.io.FileWriter;
import java.io.Writer;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class VoteHandler {
	
	private static File outputFile = new File("votes.csv");
	
	private final static String[] candidateKeys = 
			new String[]{"captainAmerica", "hawkEye", "hulk", "ironMan", "thor"};
	
	private static Map<String, Map<String, String>> votes =
			new ConcurrentHashMap<String, Map<String,String>>();

	public static boolean recordVote (Map<String,String> sessionParameters) {
		
		votes.put(sessionParameters.get("pollingStationKey"), sessionParameters);
		
		new Thread() {
			public void run() {
				writeFile();
			}
		}.start();
		
		return true;
	}
	
	private synchronized static void writeFile() {
		
		String EOL = System.getProperty("line.separator");
		
		Writer writer = null;
		
		try {
			writer = new FileWriter(outputFile);
			
			// Header row
			writer.write("PollingStationKey,CandidateKey,VoteCount" + EOL);
			
			for (Map<String,String> vote : votes.values()) {
				
				for (String candidateKey : candidateKeys) {
					
					writer.write(vote.get("pollingStationKey") + ","
							+ candidateKey + "," 
							+ vote.get(candidateKey) + 
							EOL);
				}
			}
			
			writer.flush();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			try {
				writer.close();
			}
			catch (Exception e) {}
		}
	}
}
