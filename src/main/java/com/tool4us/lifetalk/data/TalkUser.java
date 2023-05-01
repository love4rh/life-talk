package com.tool4us.lifetalk.data;

import org.json.JSONObject;



public class TalkUser 
{
	private String			_uuid;
	private String			_name;
	private String			_email;
	private String			_password;
	private JSONObject		_attribute;

	public TalkUser(JSONObject jsonObj)
	{
		_uuid = jsonObj.getString("uuid");
		_name = jsonObj.getString("name");
		_email = jsonObj.getString("email");
		_password = jsonObj.getString("pw");
		
		if( jsonObj.has("attribute") )
		{
			String tmpStr = jsonObj.getString("attribute");
		}
	}
	
	//
}

