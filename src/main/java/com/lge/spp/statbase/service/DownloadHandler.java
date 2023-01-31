package com.lge.spp.statbase.service;

import static com.lge.spp.statbase.data.DataBank.Repo;
import static io.netty.handler.codec.http.HttpHeaderNames.CONTENT_TYPE;

import java.io.ByteArrayOutputStream;
import java.util.Date;
import java.util.TimeZone;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONObject;

import com.tool4us.net.http.TomyRequestor;
import com.tool4us.net.http.TomyResponse;

import lib.turbok.util.UsefulTool;

import com.lge.spp.statbase.data.StatData;
import com.tool4us.net.http.ApiError;
import com.tool4us.net.http.ApiHandler;
import com.tool4us.net.http.TomyApi;


/**
 * http://localhost:9099/get?sDate=2022-10-15&eDate=2022-10-16&timeZone=EST
 * 
 * @author mh9.kim
 */


@TomyApi(paths={ "/download" })
public class DownloadHandler extends ApiHandler
{
    @Override
    public String call(TomyRequestor req, TomyResponse res) throws Exception
    {
        // 파라미터 가져오기
        String timeZone = req.getParameter("timeZone"); // GMT, EST(-5), PST, KST(+9)
        String sDate = req.getParameter("sDate"); // yyyy-MM-dd
        String eDate = req.getParameter("eDate"); // yyyy-MM-dd

        // 값 존재 여부 체크
        if( emptyCheck(sDate, eDate, timeZone) )
        {
            return makeResponseJson(ApiError.MissingParameter);
        }
        
        int gapInMs = TimeZone.getTimeZone(timeZone).getRawOffset();
        
        if( "KST".equals(timeZone) )
        	gapInMs = 3600000 * 9;

        Date dateStart = new Date(UsefulTool.ConvertStringToDate(sDate, "yyyy-MM-dd").getTime() - gapInMs);
        Date dateEnd = new Date(UsefulTool.ConvertStringToDate(eDate, "yyyy-MM-dd").getTime() - gapInMs + 3600000 * 24);
        
        sDate = UsefulTool.ConvertDateToString(dateStart, "yyyy-MM-dd HH");
        eDate = UsefulTool.ConvertDateToString(dateEnd, "yyyy-MM-dd HH");
        
        // keyword: { basicEULA, viewshipEULA }, category: { basicEULA, viewshipEULA, viewshipEULADetail }

        // makeResponseJson(ApiError.ServerError);

        /*
        StatData data = Repo.getDataSet();
        JSONObject retObj = new JSONObject();
        
        JSONObject kwObj = new JSONObject();
        kwObj.put("basicEULA", data.makeBasicJson(0, sDate, eDate));
        kwObj.put("viewshipEULA", data.makeVShipJson(1, sDate, eDate));
        
        JSONObject catObj = new JSONObject();
        catObj.put("basicEULA", data.makeBasicJson(2, sDate, eDate));
        catObj.put("viewshipEULA", data.makeVShipJson(3, sDate, eDate));
        catObj.put("viewshipEULADetail", data.makeVShipDetailJson(sDate, eDate));
        
        retObj.put("keyword", kwObj);
        retObj.put("category", catObj);

        return makeResponseJson(retObj);
        // */
        
        res.headers().set(CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setResultContent( this.getExcelBinary(sDate, eDate) );
        
        return null;
    }
    
    private void fillSheet(JSONArray dataList, XSSFWorkbook workbook, String title, String[] keys, String[] names) throws Exception
    {
    	XSSFSheet sheet = workbook.createSheet(title);

    	Row row = sheet.createRow(0);
    	for(int c = 0; c < names.length; ++c)
    	{
    		Cell cell = row.createCell(c);
    		cell.setCellValue(names[c]);
    	}
    	
        for(int r = 0; r < dataList.length(); ++r)
        {
        	JSONObject rec = (JSONObject) dataList.get(r);

        	row = sheet.createRow(r + 1);
        	for(int c = 0; c < keys.length; ++c)
        	{
        		Cell cell = row.createCell(c);
        		if( !rec.has(keys[c]) )
        			continue;
        		
        		Object val = rec.get(keys[c]);
        		
        		if( val instanceof Long)
        			cell.setCellValue((Long) val);
        		else
        			cell.setCellValue((String) val);
        	}
        }
    }
    
    private byte[] getExcelBinary(String sDate, String eDate) throws Exception
	{
    	StatData data = Repo.getDataSet();

        XSSFWorkbook workbook = new XSSFWorkbook();
        
        String[] minMax = new String[] { "9999-99-99", "0" };
    	
    	JSONArray dataList = data.makeBasicJson(0, sDate, eDate, minMax);
    	fillSheet(dataList, workbook, "Keyword-Basic",
    		new String[] { "id", "keyword", "impression" },
    		new String[] { "#", "Keyword", "Impression" }
    	);

    	dataList = data.makeVShipJson(1, sDate, eDate, minMax);
    	fillSheet(dataList, workbook, "Keyword-Viewship",
    		new String[] { "id", "keyword", "impression", "click" },
    		new String[] { "#", "Keyword", "Impression", "Click Count" }
    	);
    	
    	dataList = data.makeBasicJson(2, sDate, eDate, minMax);
    	fillSheet(dataList, workbook, "Category-Basic",
			new String[] { "id", "keyword", "impression" },
    		new String[] { "#", "Keyword", "Impression" }
    	);

    	dataList = data.makeVShipJson(3, sDate, eDate, minMax);
        fillSheet(dataList, workbook, "Category-Viewship",
    		new String[] { "id", "keyword", "impression", "click" },
    		new String[] { "#", "Keyword", "Impression", "Click Count" }
    	);
        
        dataList = data.makeVShipDetailJson(sDate, eDate);
        fillSheet(dataList, workbook, "Category-Detail",
    		new String[] { "id", "keyword", "title", "click" },
    		new String[] { "#", "Keyword", "Title", "Click Count" }
    	);
        
        dataList = data.makeClickInstall(sDate, eDate);
        fillSheet(dataList, workbook, "Click & Install",
    		new String[] { "id", "platform", "cni" },
    		new String[] { "#", "Platform", "Click & Install Count" }
    	);

        byte[] bin = null;
        ByteArrayOutputStream out = null;
        
        try
        {
            out = new ByteArrayOutputStream();

            workbook.write(out);
            
            bin = out.toByteArray();
        }
        catch(Exception xe)
        {
            xe.printStackTrace();
        }
        finally
        {
        	if( out != null )
        		out.close();
        }
        
        workbook.close();
        
        return bin;
	}
}
