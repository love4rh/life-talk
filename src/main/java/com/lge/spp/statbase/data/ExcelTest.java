package com.lge.spp.statbase.data;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;



public class ExcelTest
{
	public static void test() throws Exception
	{
		// String filePath = "/home/ibs/mhkim/data/test.xlsx";
		
		// 빈 Workbook 생성
        XSSFWorkbook workbook = new XSSFWorkbook();
        
        	// 빈 Sheet를 생성
        XSSFSheet sheet = workbook.createSheet("test sheet");
        
        //
        Row row = sheet.createRow(0);
        Cell cell = row.createCell(0);
        cell.setCellValue("Hello");
        
        cell = row.createCell(1);
        cell.setCellValue("World");

        ByteArrayOutputStream out = null;
        try
        {
            out = new ByteArrayOutputStream();

            workbook.write(out);
            
            String excelXml = new String(out.toByteArray(), "UTF-8");
            System.out.println("CHECK");
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
	}

	public static void main(String[] args)
	{
		try
		{
			test();
		}
		catch(Exception xe)
		{
			xe.printStackTrace();
		}

		System.out.println("Done");
	}

}
