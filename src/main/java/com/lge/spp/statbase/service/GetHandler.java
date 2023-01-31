package com.lge.spp.statbase.service;

import static com.lge.spp.statbase.data.DataBank.Repo;

import java.util.Date;
import java.util.TimeZone;

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


@TomyApi(paths={ "/get" })
public class GetHandler extends ApiHandler
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
        
        if( "EST".equals(timeZone) )
        	gapInMs = - 3600000 * 5;
        else if( "KST".equals(timeZone) )
        	gapInMs = 3600000 * 9;

        Date dateStart = new Date(UsefulTool.ConvertStringToDate(sDate, "yyyy-MM-dd").getTime() - gapInMs);
        Date dateEnd = new Date(UsefulTool.ConvertStringToDate(eDate, "yyyy-MM-dd").getTime() - gapInMs + 3600000 * 24);
        
        sDate = UsefulTool.ConvertDateToString(dateStart, "yyyy-MM-dd HH");
        eDate = UsefulTool.ConvertDateToString(dateEnd, "yyyy-MM-dd HH");
        
        // keyword: { basicEULA, viewshipEULA }, category: { basicEULA, viewshipEULA, viewshipEULADetail }, cni: []

        // makeResponseJson(ApiError.ServerError);

        StatData data = Repo.getDataSet();
        JSONObject retObj = new JSONObject();
        
        JSONObject kwObj = new JSONObject();
        String[] minMax = new String[] { "9999-99-99", "0" };
        
        kwObj.put("basicEULA", data.makeBasicJson(0, sDate, eDate, minMax));
        kwObj.put("viewshipEULA", data.makeVShipJson(1, sDate, eDate, minMax));
        
        JSONObject catObj = new JSONObject();
        catObj.put("basicEULA", data.makeBasicJson(2, sDate, eDate, minMax));
        catObj.put("viewshipEULA", data.makeVShipJson(3, sDate, eDate, minMax));
        catObj.put("viewshipEULADetail", data.makeVShipDetailJson(sDate, eDate));
        
        retObj.put("keyword", kwObj);
        retObj.put("category", catObj);
        
        retObj.put("clickInstall", data.makeClickInstall(sDate, eDate));
        
        if( !"0".equals(minMax[1]) )
        {
	        retObj.put("rangeMin", UsefulTool.ConvertDateToString(
	        	new Date(UsefulTool.ConvertStringToDate(minMax[0], "yyyy-MM-dd HH").getTime() + gapInMs)
	        	, "yyyy-MM-dd HH")
	        );
	        
	        retObj.put("rangeMax", UsefulTool.ConvertDateToString(
	        	new Date(UsefulTool.ConvertStringToDate(minMax[1], "yyyy-MM-dd HH").getTime() + gapInMs)
	        	, "yyyy-MM-dd HH")
	        );
        }
        
        return makeResponseJson(retObj);
    }
    
    // viewshipEULADetail
}
