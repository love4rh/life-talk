package com.lge.spp.task;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentSkipListMap;

import com.tool4us.common.Logs;

import lib.turbok.collection.ConcurrentList;
import lib.turbok.task.ITask;
import lib.turbok.task.ITaskMonitor;
import lib.turbok.task.TaskQueue;



public enum JobQueue implements ITaskMonitor
{
    JQ;
    
    private TaskQueue   _taskMgr = null;
    
    private Map<String, Integer> _working = null;
    
    /**
     * 지정된 시간 이후에 실행되어야 하는 작업들 관리용 멤버
     * [ ITask, 실행시간(ms) ] 의 목록
     */
    private List<Object[]>	_scheduledJobList = null;
    
    /**
     * 같은 작업은 하나만 실행되도록 관리하기 위한 멤버변수.
     * ID를 부여하여 같은 ID의 작업이 실행 전 요청된 경우 이전에 등록된 작업은 무시하고 새로 입력된 작업으로 대체함
     * 지정된 시간 이후에 실행되어야 하는 작업들 관리용 멤버
     * [ ITask, 실행시간(ms) ] 의 목록
     */
    private Map<String, Object[]>	_scheduledJobMap = null;
    

    private JobQueue()
    {
        _taskMgr = new TaskQueue(this);
        _working = new ConcurrentSkipListMap<String, Integer>();
        
        _scheduledJobList = new ConcurrentList<Object[]>();
        _scheduledJobMap = new ConcurrentSkipListMap<String, Object[]>();
    }
    
    public void begin(int numofthread)
    {
        _taskMgr.startQueue(numofthread, "wormhole-jobQ");
    }
    
    public void end()
    {
        _taskMgr.endQueue();
    }
    
    public void pushTask(ITask task)
    {
    	_taskMgr.pushTask(task);
    }
    
    public void pushScheduledTask(ITask task, long delayingTime)
    {
    	long runningTime = System.currentTimeMillis() + delayingTime;
    	_scheduledJobList.add(new Object[] { task, runningTime } );
    }
    
    public void pushIdentifiedTask(String jobID, ITask task, long delayingTime)
    {
    	long runningTime = System.currentTimeMillis() + delayingTime;
    	_scheduledJobMap.put(jobID, new Object[] { task, runningTime } );
    }
    
    public void flushScheduledTask()
    {
    	if( _scheduledJobList.isEmpty() )
    		return;
    	
    	// scheduled jobs
    	long now = System.currentTimeMillis();
    	List<Object[]> newList = new ConcurrentList<Object[]>();
    	
    	for(int i = 0; i < _scheduledJobList.size(); ++i)
    	{
    		Object[] obj = _scheduledJobList.get(i);
    		
    		if( now >= (Long) obj[1] )
    			pushTask((ITask) obj[0]);
    		else
    			newList.add(obj);
    	}
    	_scheduledJobList = newList;
    }
    
    public void flushIdentifiedTask()
    {
    	if( _scheduledJobMap.isEmpty() )
    		return;
    	
    	// identified jobs
    	long now = System.currentTimeMillis();
    	Map<String, Object[]> newMap = new ConcurrentSkipListMap<String, Object[]>();
    	
    	for(Entry<String, Object[]> elem : _scheduledJobMap.entrySet())
    	{
    		Object[] obj = elem.getValue();
    		
    		if( now >= (Long) obj[1] )
    			pushTask((ITask) obj[0]);
    		else
    			newMap.put(elem.getKey(), obj);
    	}
    	_scheduledJobMap = newMap;
    }

    @Override
    public boolean isContinuing(ITask task)
    {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void stopTask(ITask task)
    {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void OnStartTask(ITask task)
    {
        // TODO Auto-generated method stub
        
    }

    @Override
    public boolean OnProgress(ITask task, long progress)
    {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void OnEndTask(ITask task)
    {
        // TODO
    }

    @Override
    public void OnErrorRaised(ITask task, Throwable e)
    {
        if( !(e instanceof JobException) )
        	return;

        JobException xe = (JobException) e;

        _working.remove(xe.getKey());

        Logs.warn("Error occured: {}", task.toString());
        Logs.trace(xe);
    }
}
