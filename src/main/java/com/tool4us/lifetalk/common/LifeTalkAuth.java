package com.tool4us.lifetalk.common;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import com.tool4us.net.http.TomyApiFilter;
import com.tool4us.net.http.TomyRequestor;
import com.tool4us.net.http.TomyResponse;

import io.netty.handler.codec.http.HttpResponseStatus;



public class LifeTalkAuth implements TomyApiFilter
{
	private boolean		_freePass = false;
	
	public LifeTalkAuth()
	{
		this(false);
	}
	
	public LifeTalkAuth(boolean freePass)
	{
		_freePass = freePass;
	}
	
	private String SHA256(String orgStr)
	{
		try
        {
            MessageDigest sh = MessageDigest.getInstance("SHA-256");
            sh.update(orgStr.getBytes());
            byte byteData[] = sh.digest();
            StringBuffer sb = new StringBuffer(byteData.length);
            
            for(int i = 0; i < byteData.length; ++i)
                sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
            
            return sb.toString();
        }
        catch( NoSuchAlgorithmException xe )
        {
        	// nothing to do with xe
        }
		
		return "";
	}


	@Override
	public boolean call(TomyRequestor req, TomyResponse res) throws Exception
	{
		if( _freePass )
			return true;

		// Basic Authetication Logic
		// 'x-user-token': _userToken,
		// 'x-timestamp': tick,
	    // 'x-auth-code': SHA256(tick + _userToken + tick)

		String cToken = req.getHeaderValue("x-user-token");
		String tick = req.getHeaderValue("x-timestamp");
		String code = req.getHeaderValue("x-auth-code");
		// String nextToken = req.getHeaderValue("x-auth-code");
		
		boolean isOk = cToken != null && tick != null && code != null && code.equals(SHA256(tick + cToken + tick));
		
		if( !isOk )
		{
			res.setStatus(HttpResponseStatus.FORBIDDEN);
		}

		return isOk;
	}

}
