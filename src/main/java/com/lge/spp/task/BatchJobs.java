package com.lge.spp.task;

import static com.lge.spp.task.JobQueue.JQ;

import com.tool4us.common.Logs;

import lib.turbok.util.DataFileManager;



public class BatchJobs extends Thread
{
    private boolean     _running = true;
    private Object      _syncObject = new Object();


    @Override
    public void run()
    {
        // 실행할 주기. ms 단위.
        long checkPeorid = 1 * 1000 * 60 * 10; // 10분
        
        Logs.info("Main BatchJob Thread started.");

        while( _running )
        {
            try
            {
                synchronized( _syncObject )
                {
                    long waitTime = System.currentTimeMillis();
                    
                    waitTime = checkPeorid - (waitTime % checkPeorid);
                    
                    try { _syncObject.wait(waitTime); } catch( InterruptedException xe ) { }
                }
                
                if( !_running )
                    break;
                
                // do periodic job
                doJob();
            }
            catch( Exception xe )
            {
                xe.printStackTrace();
            }
        }
    }
    
    public void doJob()
    {
        try
        {
            // TODO add batch jobs
            DataFileManager.deleteTempFiles(-1);

            JQ.flushScheduledTask();
            JQ.flushIdentifiedTask();
        }
        catch( Exception e )
        {
            e.printStackTrace();
        }
    }
    
    public void end()
    {
        _running = false;

        doJob();

        synchronized(_syncObject)
        {
            _syncObject.notify();
        }
    }
}
