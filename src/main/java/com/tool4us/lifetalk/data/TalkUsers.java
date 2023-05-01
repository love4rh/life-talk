package com.tool4us.lifetalk.data;

import java.util.Map;
import java.util.concurrent.ConcurrentSkipListMap;

import org.json.JSONArray;
import org.json.JSONObject;

import com.tool4us.common.AppOptions;
import com.tool4us.common.Logs;

import lib.turbok.util.UsefulTool;



public enum TalkUsers
{
	TU;
	
	private String		_userFile;
	
	private Map<String, JSONObject>		_userMap;
	
	
	private TalkUsers()
	{
		//
	}
	
	public boolean initialize(String userFile)
	{
		boolean isOK = false;
		
		AppOptions options = new AppOptions();
		_userFile = userFile;

		try
		{
			options.initializeByYML(userFile);

			JSONArray userList = options.getAsList("users");
			Map<String, JSONObject> userMap = new ConcurrentSkipListMap<String, JSONObject>();

			for(int u = 0; u < userList.length(); ++u)
			{
				JSONObject uo = userList.getJSONObject(u);
				userMap.put(uo.getString("uuid"), uo);
			}

			_userMap = userMap;
			isOK = true;
		}
		catch(Exception xe)
		{
			Logs.trace(xe);
		}
		
		return isOK;
	}
	
	public boolean addUser(String name, String email, String pw)
	{
		JSONObject uo = new JSONObject();
		String uuid = UsefulTool.makeId("UD", 16);
		
		uo.put("uuid", uuid);
		uo.put("name", name);
		uo.put("email", email);
		uo.put("pw", pw);
		
		_userMap.put(uuid, uo);
		
		return true;
	}
	
	public void save()
	{
		// TODO implement...
	}
}
