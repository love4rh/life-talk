package com.lge.spp.statbase.data;

import java.io.File;
import java.util.Map;
import java.util.TreeMap;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Map.Entry;

import com.tool4us.common.Logs;

import lib.turbok.common.ITabularData;
import lib.turbok.data.FileMapStore;
import lib.turbok.data.processing.TabularSearcher;
import lib.turbok.util.UsefulTool;



public class StatData
{
	private String			_dataPath;
	private String			_dataName;

	/**
	 * 0: keyword basic: time, keyword, count
	 * 1: keyword vship: time, keyword, count, click
	 * 2: category basic: time, keyword, count
	 * 3: category vship: time, category, count, click
	 * 4: category detail: time, category, title, csetid, cid, click count
	 * 5: click & install: titme, click, click install
	 */
	private FileMapStore[]	_ds = null;

	
	public StatData()
	{
		//
	}
	
	public boolean open(String dataPath, String dataName) throws Exception
	{
		_dataPath = dataPath;
		_dataName = dataName;
		
		long sTick = System.currentTimeMillis();
		Logs.info("StatBase data initializing... DataPath: [{}], DataName: [{}]", _dataPath, _dataName);
		
		final String[] prefix = { "all-kw-basic", "all-kw-vship", "all-cat-basic", "all-cat-vship", "all-cat-vship-detail", "all-cni" };

		FileMapStore[] newDs = new FileMapStore[prefix.length + 1];
		
		for(int i = 0; i < prefix.length; ++i)
		{
			String filePath = _dataPath + File.separator + prefix[i] + "-" + _dataName + ".pmd";
			
			if( !(new File(filePath)).exists() )
			{
				Logs.warn("StatBase data [{} in {}] not found. SKIP!", prefix[i], _dataName);
				close(false);
				return false;
			}
			
			Logs.info("StatBase data [{} in {}] initializing...", prefix[i], _dataName);
			newDs[i] = FileMapStore.newInstance(filePath);
			Logs.info("StatBase data [{} in {}] record count: {}", prefix[i], _dataName, newDs[i].getRowSize());
		}

		_ds = newDs;

		Logs.info("StatBase data [{}] initializing. Done!: [{} ms]", _dataName, System.currentTimeMillis() - sTick);
		
		return true;
	}
	
	public void close(boolean delete)
	{
		try
		{
			FileMapStore[] old = _ds;
			for(int i = 0; old != null && i < old.length; ++i)
			{
				if( old[i] != null )
				{
					if( delete )
						old[i].clearAndDelete(true);
					else
						old[i].clear();
				}
			}

			_ds = null;
		}
		catch(Exception xe)
		{
			Logs.trace(xe);
		}
	}
	
	public String getDataPath()
	{
		return _dataPath;
	}
	
	/**
	 * 0: keyword basic: time, keyword, count
	 * type: 0 or 2
	 */
	public JSONArray makeBasicJson(int type, String sDate, String eDate, String[] minMax) throws Exception
	{
		ITabularData ds = this._ds[type];
		
		long colIdx = 0;
		TabularSearcher ts = new TabularSearcher(ds, new long[] { colIdx }, false);
		
		long sIdx = ts.searchNearLeast(new Object[] { sDate }, 0, ds.getRowSize());
		long eIdx = ts.searchNearMost(new Object[] { eDate }, 0, ds.getRowSize());
		
		sIdx = Math.max(0, sIdx);
		eIdx = Math.min(eIdx, ds.getRowSize());

		Map<String, Long> counter = new TreeMap<String, Long>();
		
		for(long r = sIdx; r < eIdx; ++r)
		{
			String evTime = (String) ds.getCell(colIdx, r);

			if( sDate.compareTo(evTime) > 0 )
				continue;
			
			String keyword = (String) ds.getCell(1, r);
			
			if( sDate.compareTo(evTime) <= 0 && 0 < eDate.compareTo(evTime) )
			{
				if( evTime.compareTo(minMax[0]) < 0 )
					minMax[0] = evTime;
				if( evTime.compareTo(minMax[1]) > 0 )
					minMax[1] = evTime;

				Long count = counter.get(keyword);
				
				if( count == null )
					count = (Long) ds.getCell(2, r);
				else
					count += (Long) ds.getCell(2, r);
				
				counter.put(keyword, count);
			}
			else
				break;
		}
		
		JSONArray jsonAr = new JSONArray();
		
		long idx = 0;
		for(Entry<String, Long> elem : counter.entrySet())
		{
			JSONObject jsonObj = new JSONObject();
			idx += 1;
			
			jsonObj.put("id", idx);
			jsonObj.put("keyword", elem.getKey());
			jsonObj.put("impression", elem.getValue());

			jsonAr.put(jsonObj);
		}

		return jsonAr;
	}
	
	/**
	 * 1: keyword vship: time, keyword, count, click
	 * type: 1 or 3
	 */
	public JSONArray makeVShipJson(int type, String sDate, String eDate, String[] minMax) throws Exception
	{
		ITabularData ds = this._ds[type];
		
		long colIdx = 0;
		TabularSearcher ts = new TabularSearcher(ds, new long[] { colIdx }, false);
		
		long sIdx = ts.searchNearLeast(new Object[] { sDate }, 0, ds.getRowSize());
		long eIdx = ts.searchNearMost(new Object[] { eDate }, 0, ds.getRowSize());
		
		sIdx = Math.max(0, sIdx);
		eIdx = Math.min(eIdx, ds.getRowSize());

		Map<String, Long[]> counter = new TreeMap<String, Long[]>();
		
		for(long r = sIdx; r < eIdx; ++r)
		{
			String evTime = (String) ds.getCell(colIdx, r);
			
			if( sDate.compareTo(evTime) > 0 )
				continue;

			String keyword = (String) ds.getCell(1, r);
			
			if( sDate.compareTo(evTime) <= 0 && 0 < eDate.compareTo(evTime) )
			{
				if( evTime.compareTo(minMax[0]) < 0 )
					minMax[0] = evTime;
				if( evTime.compareTo(minMax[1]) > 0 )
					minMax[1] = evTime;
				
				Long[] count = counter.get(keyword);
				
				if( count == null )
				{
					count = new Long[]
					{
						(Long) ds.getCell(2, r),
						(Long) UsefulTool.NVL2((Long) ds.getCell(3, r), 0L)
					};
				}
				else
				{
					count[0] += (Long) ds.getCell(2, r);
					count[1] += (Long) UsefulTool.NVL2((Long) ds.getCell(3, r), 0L);
				}
				
				counter.put(keyword, count);
			}
			else
				break;
		}
		
		JSONArray jsonAr = new JSONArray();
		
		long idx = 0;
		for(Entry<String, Long[]> elem : counter.entrySet())
		{
			JSONObject jsonObj = new JSONObject();
			idx += 1;
			
			Long[] val = elem.getValue();
			
			jsonObj.put("id", idx);
			jsonObj.put("keyword", elem.getKey());
			jsonObj.put("impression", val[0]);
			jsonObj.put("click", val[1]);

			jsonAr.put(jsonObj);
		}

		return jsonAr;
	}
	
	// viewshipEULADetail
	/**
	 * 4: category detail: time, category, title, csetid, cid, click count
	 */
	public JSONArray makeVShipDetailJson(String sDate, String eDate) throws Exception
	{
		ITabularData ds = this._ds[4];
		
		long colIdx = 0;
		TabularSearcher ts = new TabularSearcher(ds, new long[] { colIdx }, false);
		
		long sIdx = ts.searchNearLeast(new Object[] { sDate }, 0, ds.getRowSize());
		long eIdx = ts.searchNearMost(new Object[] { eDate }, 0, ds.getRowSize()) + 1;
		
		sIdx = Math.max(0, sIdx);
		eIdx = Math.min(eIdx, ds.getRowSize());

		// key string --> keyword, title, count
		Map<String, Object[]> counter = new TreeMap<String, Object[]>();
		
		for(long r = sIdx; r < eIdx; ++r)
		{
			String evTime = (String) ds.getCell(colIdx, r);
			
			if( sDate.compareTo(evTime) > 0 )
				continue;
			
			if( sDate.compareTo(evTime) <= 0 && 0 < eDate.compareTo(evTime) )
			{
				String keyword = (String) ds.getCell(1, r);
				String title = (String) ds.getCell(2, r);
				String keyStr = keyword + "||" + title;
				
				Object[] count = counter.get(keyStr);
				
				if( count == null )
				{
					count = new Object[]
					{
						keyword, title,
						(Long) UsefulTool.NVL2((Long) ds.getCell(5, r), 0L)
					};
				}
				else
				{
					count[2] = (Long) count[2] + (Long) UsefulTool.NVL2((Long) ds.getCell(5, r), 0L);
				}
				
				counter.put(keyStr, count);
			}
			else
				break;
		}
		
		JSONArray jsonAr = new JSONArray();
		
		long idx = 0;
		for(Entry<String, Object[]> elem : counter.entrySet())
		{
			JSONObject jsonObj = new JSONObject();
			idx += 1;
			
			Object[] val = elem.getValue();
			
			jsonObj.put("id", idx);
			jsonObj.put("keyword", val[0]);
			jsonObj.put("title", val[1]);
			jsonObj.put("click", val[2]);

			jsonAr.put(jsonObj);
		}

		return jsonAr;
	}
	
	// viewshipEULADetail
	/**
	 * 5: click & install: time, product, click, click&Install
	 */
	public JSONArray makeClickInstall(String sDate, String eDate) throws Exception
	{
		ITabularData ds = this._ds[5];

		long colIdx = 0;
		TabularSearcher ts = new TabularSearcher(ds, new long[] { colIdx }, false);
		
		long sIdx = ts.searchNearLeast(new Object[] { sDate }, 0, ds.getRowSize());
		long eIdx = ts.searchNearMost(new Object[] { eDate }, 0, ds.getRowSize()) + 1;
		
		sIdx = Math.max(0, sIdx);
		eIdx = Math.min(eIdx, ds.getRowSize());

		// key string --> keyword, title, count
		Map<String, Long[]> counter = new TreeMap<String, Long[]>();
		
		long totalClk = 0, totalCni = 0;
		for(long r = sIdx; r < eIdx; ++r)
		{
			String evTime = (String) ds.getCell(colIdx, r);
			
			if( sDate.compareTo(evTime) > 0 )
				continue;

			if( sDate.compareTo(evTime) <= 0 && 0 < eDate.compareTo(evTime) )
			{
				String keyStr = (String) ds.getCell(1, r);

				Long clkCount  = ((Double) ds.getCell(2, r)).longValue();
				Long cniCount  = ((Double) ds.getCell(3, r)).longValue();
				
				totalClk += clkCount;
				totalCni += cniCount;
			
				Long[] count = counter.get(keyStr);
				
				if( count == null )
				{
					count = new Long[] { clkCount, cniCount };
				}
				else
				{
					count[0] += clkCount;
					count[1] += cniCount;
				}
				
				counter.put(keyStr, count);
			}
			else
				break;
		}
		
		JSONArray jsonAr = new JSONArray();
		
		long idx = 1;
		
		if( totalClk > 0 )
		{
			JSONObject jsonObj = new JSONObject();
			jsonObj.put("id", idx);
			jsonObj.put("platform", "All");
			// jsonObj.put("clk", totalClk);
			jsonObj.put("cni", totalCni);
			jsonAr.put(jsonObj);
		}
		
		for(Entry<String, Long[]> elem : counter.entrySet())
		{
			JSONObject jsonObj = new JSONObject();
			idx += 1;
			
			Long[] val = elem.getValue();
			
			jsonObj.put("id", idx);
			jsonObj.put("platform", elem.getKey());
			// jsonObj.put("clk", val[0]);
			jsonObj.put("cni", val[1]);

			jsonAr.put(jsonObj);
		} // */

		return jsonAr;
	}
}
