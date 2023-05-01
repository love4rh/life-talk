package com.tool4us.lifetalk.data;



/**
 * Talk을 묶어서 관리하기 위한 클래스
 * 
 * @author TurboK
 */
public class TalkBoard
{
	// Talk Board 구분을 위한 ID
	private String		_boardID;
	
	// Talk Board 소유자
	private String		_userID;

	// Talk 제목
	private String		_title;
	
	// Talk 기본 컬러
	private String		_colorName;

	// Talk 데이터를 관리하기 위한 멤버
	private TalkData	_talks;
	
	
	public TalkBoard()
	{
		//
	}
	
	public static TalkBoard newInstance()
	{
		//
		return null;
	}
	
	public void load()
	{
		//
	}
}
