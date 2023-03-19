package com.tool4us.lifetalk;

import static com.tool4us.lifetalk.AppSetting.OPT;

import java.io.File;

import com.tool4us.common.Logs;
import com.tool4us.lifetalk.common.LifeTalkAuth;
import com.tool4us.net.http.IStaticFileMap;
import com.tool4us.net.http.TomyApiFilter;
import com.tool4us.net.http.TomyServer;

import lib.turbok.task.TaskQueue;



/**
 * Request Handling Server
 * @author TurboK
 */
public class AppServer implements IStaticFileMap
{
    private TomyServer      _serverBase = null;
    private TaskQueue       _taskQueue = null;

    
    public AppServer()
    {
        _taskQueue = new TaskQueue(null);
    }
    
    public void start(String handlerPackage, int port, int boss, int worker) throws Exception
    {
        if( _serverBase != null )
            return;
     
        Logs.info("Starting App Service Server at port {}.", port);

        // TODO remove true(OPT.checkAuth()) in parameter
        _serverBase = new TomyServer( handlerPackage, this, new TomyApiFilter[] { new LifeTalkAuth(OPT.checkAuth()) } );
        _serverBase.start(port, boss, worker, OPT.loggingLevel());

        _taskQueue.startQueue(2, "AppServer Batch");
    }
    
    public void stop()
    {
        if( _serverBase != null )
            _serverBase.shutdown();

        _serverBase = null;
        
        _taskQueue.endQueue();
    }
    
    @Override
    public String getRootFile()
    {
        return "index.html";
    }
    
    @Override
    public boolean isAllowed(String uriPath)
    {
        // 소스 보안을 위하여 *.map 파일은 반환하지 않음.
        return true; // !uriPath.endsWith(".map");
    }

    @Override
    public File getFile(String uriPath)
    {
        String vDir = null;
        int sPos = uriPath.indexOf("/", 1);

        if( sPos != -1 )
        {
            vDir = uriPath.substring(1, sPos);
            // vDir에 해당하는 실제 경로 찾기
            vDir = OPT.virtualDir(vDir);
        }
        
        if( vDir != null )
        {
            uriPath = uriPath.substring(sPos);
        }
        else
        {
            vDir = OPT.virtualRoot();
            
            // 파일을 요청하는 경우가 아니라면 루트를 반환함
            if( -1 == uriPath.indexOf(".", uriPath.length() - 7) )
            {
                uriPath = "/" + getRootFile();
            }
        }
        
        return new File(vDir + uriPath);
    }
}
