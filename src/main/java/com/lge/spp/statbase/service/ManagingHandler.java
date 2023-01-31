package com.lge.spp.statbase.service;

import static com.lge.spp.statbase.data.DataBank.Repo;

import com.tool4us.net.http.TomyRequestor;
import com.tool4us.net.http.TomyResponse;
import com.tool4us.net.http.ApiError;
import com.tool4us.net.http.ApiHandler;
import com.tool4us.net.http.TomyApi;



@TomyApi(paths={ "/managing" })
public class ManagingHandler extends ApiHandler
{
    @Override
    public String call(TomyRequestor req, TomyResponse res) throws Exception
    {
        // 파라미터 가져오기
        String authKey = req.getParameter("authKey");
        String jobType = req.getParameter("jobType");

        // 값 존재 여부 체크
        if( emptyCheck(authKey, jobType) )
        {
            // 없다면 파라미터 오류 반환
            return makeResponseJson(ApiError.MissingParameter);
        }
        
        if( !"mh9.kim".equals(authKey) )
        	return makeResponseJson(ApiError.InvalidAuthCode); 
        
        return makeResponseJson( doJob(jobType, req, res) );
    }

	private ApiError doJob(String jobType, TomyRequestor req, TomyResponse res) throws Exception
	{
		ApiError retCode = ApiError.Success;
		
		if( "reload".equals(jobType) )
		{
			String version = req.getParameter("version");
			
			if( emptyCheck(version) )
	            retCode = ApiError.MissingParameter;
			else
				Repo.reload(version);
		}
		else
			retCode = ApiError.InvalidParameter;
		
		return retCode;
	}
}
