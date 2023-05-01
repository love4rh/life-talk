package com.tool4us.lifetalk.data;



public enum TalkType
{
	Normal(0),
	Image(1)
	;
	
	private int		_value;
	
	private TalkType(int type)
	{
		_value = type;
	}
	
	public int toInt()
	{
		return _value;
	}
	
	public static TalkType fromInt(int value)
	{
		TalkType ret = null;
		
		for(TalkType type : TalkType.values())
		{
			if( type.toInt() == value )
			{
				ret = type;
				break;
			}
		}
		
		return ret;
	}
	
	public static TalkType fromString(String value)
	{
		TalkType ret = null;
		
		for(TalkType type : TalkType.values())
		{
			if( type.toString().equals(value) )
			{
				ret = type;
				break;
			}
		}
		
		return ret;
	}

}
