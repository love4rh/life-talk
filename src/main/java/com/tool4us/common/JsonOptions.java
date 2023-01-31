package com.tool4us.common;

import static com.tool4us.common.Util.UT;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.yaml.snakeyaml.Yaml;

import lib.turbok.util.UsefulTool;



/**
 * Application 구동을 위하여 필요한 옵션을 관리용 클래스.
 * YML 형태로 정의된 옵션파일(혹은 문자열)을 읽어 계층적으로 값을 가지고 있는 상태에서 지정한 값을 반환하는 기능을 수행.
 * 계층적인 값은 key1/key2/key3와 같이 '/'로 구분하여 정의함. 
 */
public class JsonOptions
{
    private JSONObject      _options = null;
    
    
    public JsonOptions()
    {
        //
    }
    
    public JsonOptions(JSONObject options)
    {
        _options = options;
    }
    
    public void initializeByYML(String ymlConfigFile) throws Exception
    {
        Yaml yaml = new Yaml();
        Object document = yaml.load(new FileInputStream(new File(ymlConfigFile)));

        _options = new JSONObject((Map<?, ?>) document);
    }
    
    public String toJsonString()
    {
        return _options == null ? "null" : _options.toString();
    }
    
    /**
     * 지정한 위치의 키에 해당하는 옵션 객체 반환.
     * array인 경우 #XXX와 같이 부가 추출 옵션을 사용할 수 있음. XXX에
     * 1. 숫자: 숫자에 해당 원소
     * 2. length: array 사이즈
     * @param keyPath parent/child/subchild 와 같이 '/'로 구분하여 옵션이 있는 위치를 지정함.
     * @return 지정한 옵션 객체. 없으면 null 반환. JSONObject, JSONArray, String, Double, Long, Boolean 가능함.
     */
    public Object getOption(String keyPath)
    {
        String[] path = keyPath.split("/");
        
        Object tmpNode = null;
        JSONObject node = _options;
        
        int idx = 0;
        
        try
        {
            while( node != null && idx < path.length)
            {
                String keyStr = path[idx];
                String operator = null; // only for JSONArray
                
                int pos = keyStr.indexOf("#");
                if( pos != -1)
                {
                    operator = keyStr.substring(pos + 1);
                    keyStr = keyStr.substring(0, pos);
                }
                
                tmpNode = node.get(keyStr);

                node = null;
                if( tmpNode != null )
                {
                    if( tmpNode instanceof JSONObject )
                    {
                        node = (JSONObject) tmpNode;
                    }
                    else if( tmpNode instanceof JSONArray )
                    {
                        JSONArray list = (JSONArray) tmpNode;

                        if( operator != null )
                        {
                            int ii = UT.parseIntegr(operator, -1);

                            if( 0 <= ii && ii < list.length() )
                            {
                                tmpNode = list.get(ii);
                                if( tmpNode instanceof JSONObject )
                                {
                                    node = (JSONObject) tmpNode;
                                }
                            }
                            else if( "length".equals(operator) )
                            {
                                tmpNode = new Integer(list.length());
                            }
                        }
                    }   
                }
    
                idx += 1;
            }
        }
        catch( Exception xe )
        {
            // xe.printStackTrace();
            tmpNode = null;
        }

        return idx == path.length ? tmpNode : null;
    }
    
    // response/domain{domain:code,value:value,total_count:totalcount,hit_count:hitcount,doc:doc}
    public JSONArray getArray(String script)
    {
        script = script.trim();

        int p = script.indexOf("{");
        if( p == -1 )
            return null; // throws Exception?
       
        Object obj = this.getOption(script.substring(0, p));
        if( !(obj instanceof JSONArray) )
            return null; // throws Exception?
        
        JSONArray ar = (JSONArray) obj;
        String[] subKeys = UsefulTool.SplitLineText(script.substring(p + 1, script.length() - 1), ",", false);
        
        List<String[]> patterns = new ArrayList<String[]>();
        for(int i = 0; i < subKeys.length; ++i)
        {
            String[] keyName = UsefulTool.SplitLineText(subKeys[i], ":", false);
            if( keyName.length == 1 )
                patterns.add(new String[] { keyName[0], keyName[0] });
            else
                patterns.add(keyName);
        }
        
        JSONArray ret = new JSONArray();
        for(int i = 0; i < ar.length(); ++i)
        {
            obj = ar.get(i);
            if( !(obj instanceof JSONObject) )
                continue;
            
            JSONObject jsonObj = (JSONObject) obj;
            JSONObject newObj = new JSONObject();
            for(String[] keyName : patterns)
            {
                if( !jsonObj.has(keyName[1]) )
                    continue;
                newObj.put(keyName[0], jsonObj.get(keyName[1]));
            }
            
            ret.put(newObj);
        }

        return ret;
    }

    /**
     * 지정한 위치의 키가 있는 지 여부 반환.
     * @param keyPath parent/child/subchild 와 같이 '/'로 구분하여 옵션이 있는 위치를 지정함.
     * @return 지정한 옵션 존재 여부
     */
    public boolean hasOption(String keyPath)
    {
        return getOption(keyPath) != null;
    }
    
    public JSONObject getAsObject(String keyPath)
    {
        return (JSONObject) getOption(keyPath);
    }
    
    public JSONArray getAsList(String keyPath)
    {
        return (JSONArray) getOption(keyPath);
    }
    
    public String getAsString(String keyPath)
    {
        return (String) getOption(keyPath);
    }
    
    public Long getAsLong(String keyPath, long defVal)
    {
        Object n = getOption(keyPath);

        if( n == null )
            return defVal;
        
        return n instanceof Long ? (Long) n : ((Integer) n).longValue();
    }
    
    public Integer getAsInteger(String keyPath, int defVal)
    {
        Object n = getOption(keyPath);

        if( n == null )
            return defVal;
        
        return n instanceof Integer ? (Integer) n : ((Long) n).intValue();
    }
    
    public Boolean getAsBoolean(String keyPath, boolean defVal)
    {
        Boolean b = (Boolean) getOption(keyPath);
        return b == null ? defVal : b;
    }
    
    public Double getAsDouble(String keyPath, double defVal)
    {
        Double d = (Double) getOption(keyPath);
        return d == null ? defVal : d;
    }
    
    public int[] getAsIntegerArray(String keyPath)
    {
        JSONArray ar = (JSONArray) getOption(keyPath);
        
        if( ar == null )
        {
            return null;
        }
        
        int[] arInt = new int[ar.length()];
        
        for(int i = 0; i < ar.length(); ++i)
        {
            arInt[i] = (int) ar.getLong(i);
        }
        
        return arInt;
    }
}
