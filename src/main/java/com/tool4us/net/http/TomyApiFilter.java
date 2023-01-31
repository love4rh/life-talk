package com.tool4us.net.http;


/**
 * API 실행 전 Chain 형태로 실행할 Filtering API 정의
 * 
 * @author TurboK
 */
public interface TomyApiFilter
{
	/**
	 * 
	 * @param req
	 * @param res
	 * @return 계속 진행 여부 반환. true이면 다음으로 진행하고 false이면 중단
	 * @throws Exception
	 */
    public boolean call(TomyRequestor req, TomyResponse res) throws Exception;
}
