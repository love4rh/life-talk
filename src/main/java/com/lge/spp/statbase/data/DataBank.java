package com.lge.spp.statbase.data;

import static com.lge.spp.statbase.AppSetting.OPT;

import java.io.File;
import java.io.FilenameFilter;
import java.util.Arrays;



public enum DataBank
{
	Repo;

	private StatData				_data = null;


	private DataBank()
	{
		//
	}
	
	public String getLatestDataName(String dataPath)
	{
		final String typeStr = "all-cat-basic-";
		
		File f = new File(dataPath);
		
		String[] files = f.list( new FilenameFilter()
		{
			@Override
			public boolean accept(File dir, String name)
			{
				// all-cat-basic-20221017.pmd
				return name.startsWith(typeStr) && name.endsWith(".pmd");
			}
	
		});
		
		if( files == null || files.length == 0 )
			return null;
		
		String[] names = new String[files.length];
		
		for(int i = 0; i < names.length; ++i)
		{
			String s = files[i];
			names[i] = s.substring(typeStr.length(), s.length() - 4);
		}	
		
		Arrays.sort(names);
		
		return names[files.length - 1];
	}
	
	public void clear()
	{
		if( _data != null )
			_data.close(false);
		
		_data = null;
	}
	
	public void reload() throws Exception
	{
		String dataPath = OPT.getDataPath();
		String version = getLatestDataName(dataPath);
		
		reload(version);
	}
	
	public void reload(String version) throws Exception
	{
		String dataPath = OPT.getDataPath();
		StatData sd = new StatData();
		
		sd.open(dataPath, version);
		
		StatData oldData = _data;
		_data = sd;
		
		if( oldData != null )
		{
			oldData.close(false);
		}
	}

	public StatData getDataSet()
	{
		return _data;
	}
}

