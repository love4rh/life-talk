package com.lge.spp.statbase;

import static com.lge.spp.task.JobQueue.JQ;
import static com.lge.spp.statbase.AppSetting.OPT;
import static com.lge.spp.statbase.data.DataBank.Repo;


import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

import com.lge.spp.task.BatchJobs;
import com.tool4us.common.Logs;

import lib.turbok.util.DataFileManager;
import lib.turbok.util.UsefulTool;



/**
 * Application Main class
 * 
 * @author TurboK
 */
public class AppMain
{
    private AppServer       _serviceServer = null;
    private BatchJobs       _batchJob = null;
    
    
    public AppMain()
    {
        //
    }
    
    public void start(String configFile) throws Exception
    {
        // kill -15 처리
        Runtime.getRuntime().addShutdownHook( new Thread()
        {
            @Override
            public void run()
            {
                Logs.info("Respository Server: Shutting down");
                
                try
                {
                    stopSerrver();
                }
                catch( Exception xe )
                {
                    Logs.trace(xe);
                }
                
                Logs.info("Respository Server: Shutdown completed.");
            }
        });
        
        // 설정파일 읽기
        OPT.initialize(configFile);
        
        if( OPT.loggingFile() )
        {
        	String logFolder = OPT.getOptionString("logging/path");
        	String prefix = OPT.getOptionString("logging/prefix");
        	
        	if( logFolder == null )
        	{
        		logFolder = UsefulTool.concat(UsefulTool.GetModulePath(), File.separator, "log");
        	}
        	else if( logFolder.startsWith("./") || logFolder.startsWith("." + File.separator) )
        	{
        		logFolder = UsefulTool.concat(UsefulTool.GetModulePath(), File.separator, logFolder.substring(2));
        	}

            Logs.initialize(logFolder, prefix == null ? "wau" : prefix);
            Logs.addConsoleLogger();
        }
        else
        {
            Logs.instance();
            Logs.addConsoleLogger();
        }

        initialize();
        printSettings();

        _serviceServer = new AppServer();
        _serviceServer.start("com.lge.spp.statbase.service", OPT.port(), OPT.bossThreadNum(), OPT.serviceThreadNum());
        
        if( OPT.withConsole() )
        {
            this.console();
        }
    }

	private void initialize() throws Exception
    {
        // NetOnSetting.C.initialize(OPT.temporaryFolder(), false, null);
		Logs.info("starting job doing threads...");
		JQ.begin(2);

		Logs.info("deleting files in temporay folder...");
        DataFileManager.deleteTempFiles(-1);

        Logs.info("starting batch job thread...");
        _batchJob = new BatchJobs();
        _batchJob.start();
        
        Repo.reload();
    }
	
	private void printSettings()
	{
		Logs.info("service port - [{}]", OPT.port());
		Logs.info("working folder - [{}]", OPT.temporaryFolder());
		Logs.info("virtual root - [{}]", OPT.virtualRoot());
		
		// String[] dbConn = OPT.getDBConnInfo();
		// Logs.info("database - driver:[{}] server:[{}] account:[{}]", dbConn[0], dbConn[1], dbConn[2]);
	}

    /**
     * enter CLI mode.
     */
    public void console()
    {
        String command;
        BufferedReader bufRead = new BufferedReader(new InputStreamReader(System.in));
        
        while( true )
        {
            System.out.print(">> ");
            
            try
            {
                command = bufRead.readLine();
            }
            catch(Exception xe)
            {
                xe.printStackTrace();
                continue;
            }
            
            if( command != null )
                command = command.trim();
            
            if( command == null || command.isEmpty() )
                continue;
            
            boolean showTime = true;
            long startTick = System.currentTimeMillis();
            
            String[] cmdParam = UsefulTool.SplitLineText(command, " ", false);
            
            if( "q".equalsIgnoreCase(cmdParam[0]) )
            {
                stopSerrver();
                break;
            }
            else if( "t1".equalsIgnoreCase(cmdParam[0]) )
            {
                test(cmdParam[1]);
            }
            else if( "t2".equalsIgnoreCase(cmdParam[0]) )
            {
            	test("사내 맞선");
            }
            
            if( showTime )
            {
                System.out.println("Processing Time: " + (System.currentTimeMillis() - startTick) + " ms");
            }
        }
    }
    
    public void stopSerrver()
    {
        JQ.end();
        _serviceServer.stop();
        
        if( _batchJob != null )
            _batchJob.end();
    }
    
    public void test(String keyword)
    {
        try
        {
        	//
        }
        catch(Exception xe)
        {
            xe.printStackTrace();
        }
    }
}
