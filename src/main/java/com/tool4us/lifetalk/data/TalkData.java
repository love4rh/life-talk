package com.tool4us.lifetalk.data;

import java.io.File;
import java.util.Date;

import com.tool4us.common.Logs;

import lib.turbok.common.ValueType;
import lib.turbok.data.Columns;
import lib.turbok.data.FileMapStore;



public class TalkData
{
	// 전체 톡 개수
	// 마지막 입력 시간
	// 마지막 톡
	// 톡 목록 반환
	// 톡 데이터, 시간, 타임.
	
	private String			_talkFile = null;
	
	private FileMapStore	_data = null;
	
	
	public TalkData()
	{
		
	}
	
	public static TalkData newTalkData(String dataPath, String prefix)
	{
		TalkData talkData = null;
		Columns columns = new Columns();
		
		// 톡 데이터, 시간, 타임.
		columns.addColumn("timeStamp", ValueType.DateTime);
		columns.addColumn("talkType", ValueType.Integer);
		columns.addColumn("talk", ValueType.Text);
		columns.addColumn("additional", ValueType.Text);
		columns.addColumn("talkState", ValueType.Integer); // 상태 - 1: 정상, 0: 삭제  

		String talkFile = dataPath + File.separator + prefix + ".talk";
		String dataFilePath = dataPath + File.separator + prefix + ".data.talk";
		String stringFilePath = dataPath + File.separator + prefix + ".string.talk";

		try
		{
			FileMapStore ds = new FileMapStore(columns, dataFilePath, stringFilePath);
			ds.store(talkFile, false);
			
			talkData = new TalkData();
			if( !talkData.open(talkFile, ds) )
				talkData = null;
		}
		catch( Exception xe )
		{
			Logs.trace(xe);
		}
		
		return talkData;
	}
	
	
	public boolean open(String talkFile)
	{
		boolean isOK = false;
		
		try
		{
			isOK = open(talkFile, FileMapStore.newInstance(talkFile));
		}
		catch( Exception xe )
		{
			isOK = false;
			Logs.trace(xe);
		}
		
		return isOK;
	}
	
	private boolean open(String talkFile, FileMapStore ds)
	{
		_talkFile = talkFile;
		_data = ds;
		
		return _data != null;
	}
	
	public void save()
	{
		if( _data == null )
			return;
		
		try
		{
			_data.store(_talkFile, false);
		}
		catch( Exception xe )
		{
			Logs.trace(xe);
		}
	}

	public boolean addTalk(TalkType type, String talk, String additional) throws Exception
	{
		if( _data == null )
			return false;
		
		long row = _data.getRowSize();
		
		_data.setCell(0, row, new Date());
		_data.setCell(1, row, type.toInt());
		_data.setCell(2, row, talk);
		_data.setCell(3, row, additional);
		
		this.save();

		return true;
	}
}
