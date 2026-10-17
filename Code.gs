{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red46\green49\blue51;\red20\green67\blue174;\red246\green247\blue249;
\red186\green6\blue115;\red162\green0\blue16;\red0\green0\blue0;\red18\green115\blue126;}
{\*\expandedcolortbl;;\cssrgb\c23529\c25098\c26275;\cssrgb\c9412\c35294\c73725;\cssrgb\c97255\c97647\c98039;
\cssrgb\c78824\c15294\c52549;\cssrgb\c70196\c7843\c7059;\cssrgb\c0\c0\c0;\cssrgb\c3529\c52157\c56863;}
\paperw11900\paperh16840\margl1440\margr1440\vieww29200\viewh18460\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\cf3 \cb4 \strokec3 const\cf2 \strokec2  \cf5 \strokec5 API_URL\cf2 \strokec2  = \cf6 \strokec6 "https://dummyjson.com/products?limit=100"\cf2 \strokec2 ;\cb1 \
\
\cf3 \cb4 \strokec3 function\cf2 \strokec2  \strokec7 importProducts\strokec2 () \{\cb1 \
\cb4   \cf3 \strokec3 const\cf2 \strokec2  \strokec7 response\strokec2  = \cf5 \strokec5 UrlFetchApp\cf2 \strokec2 .\strokec7 fetch\strokec2 (\cf5 \strokec5 API_URL\cf2 \strokec2 , \{\cb1 \
\cb4     \strokec7 muteHttpExceptions\strokec2 : \cf3 \strokec3 true\cf2 \cb1 \strokec2 \
\cb4   \});\cb1 \
\
\cb4   \cf3 \strokec3 if\cf2 \strokec2  (\strokec7 response\strokec2 .\strokec7 getResponseCode\strokec2 () !== \cf8 \strokec8 200\cf2 \strokec2 ) \{\cb1 \
\cb4     \cf3 \strokec3 throw\cf2 \strokec2  \cf3 \strokec3 new\cf2 \strokec2  \cf5 \strokec5 Error\cf2 \strokec2 (\cf6 \strokec6 `API failed: HTTP \cf2 \strokec2 $\{\strokec7 response\strokec2 .\strokec7 getResponseCode\strokec2 ()\}\cf6 \strokec6 `\cf2 \strokec2 );\cb1 \
\cb4   \}\cb1 \
\
\cb4   \cf3 \strokec3 const\cf2 \strokec2  \strokec7 data\strokec2  = \cf5 \strokec5 JSON\cf2 \strokec2 .\strokec7 parse\strokec2 (\strokec7 response\strokec2 .\strokec7 getContentText\strokec2 ());\cb1 \
\
\cb4   \cf3 \strokec3 if\cf2 \strokec2  (!\cf5 \strokec5 Array\cf2 \strokec2 .\strokec7 isArray\strokec2 (\strokec7 data\strokec2 .\strokec7 products\strokec2 )) \{\cb1 \
\cb4     \cf3 \strokec3 throw\cf2 \strokec2  \cf3 \strokec3 new\cf2 \strokec2  \cf5 \strokec5 Error\cf2 \strokec2 (\cf6 \strokec6 "Unexpected API response format."\cf2 \strokec2 );\cb1 \
\cb4   \}\cb1 \
\
\cb4   \cf3 \strokec3 const\cf2 \strokec2  \strokec7 ss\strokec2  = \cf5 \strokec5 SpreadsheetApp\cf2 \strokec2 .\strokec7 getActiveSpreadsheet\strokec2 ();\cb1 \
\cb4   \cf3 \strokec3 const\cf2 \strokec2  \strokec7 productsSheet\strokec2  = \strokec7 getOrCreateSheet_\strokec2 (\strokec7 ss\strokec2 , \cf6 \strokec6 "Products"\cf2 \strokec2 );\cb1 \
\
\cb4   \cf3 \strokec3 const\cf2 \strokec2  \strokec7 headers\strokec2  = [\cb1 \
\cb4     \cf6 \strokec6 "Product ID"\cf2 \strokec2 , \cf6 \strokec6 "Title"\cf2 \strokec2 , \cf6 \strokec6 "Category"\cf2 \strokec2 , \cf6 \strokec6 "Brand"\cf2 \strokec2 ,\cb1 \
\cb4     \cf6 \strokec6 "Price"\cf2 \strokec2 , \cf6 \strokec6 "Discount %"\cf2 \strokec2 , \cf6 \strokec6 "Rating"\cf2 \strokec2 , \cf6 \strokec6 "Stock"\cf2 \strokec2 ,\cb1 \
\cb4     \cf6 \strokec6 "Stock Status"\cf2 \cb1 \strokec2 \
\cb4   ];\cb1 \
\
\cb4   \cf3 \strokec3 const\cf2 \strokec2  \strokec7 rows\strokec2  = \strokec7 data\strokec2 .\strokec7 products\strokec2 .\strokec7 map\strokec2 (\strokec7 p\strokec2  => [\cb1 \
\cb4     \strokec7 p\strokec2 .\strokec7 id\strokec2 ,\cb1 \
\cb4     \strokec7 p\strokec2 .\strokec7 title\strokec2 ,\cb1 \
\cb4     \strokec7 p\strokec2 .\strokec7 category\strokec2 ,\cb1 \
\cb4     \strokec7 p\strokec2 .\strokec7 brand\strokec2  || \cf6 \strokec6 "Unknown"\cf2 \strokec2 ,\cb1 \
\cb4     \strokec7 p\strokec2 .\strokec7 price\strokec2 ,\cb1 \
\cb4     \strokec7 p\strokec2 .\strokec7 discountPercentage\strokec2 ,\cb1 \
\cb4     \strokec7 p\strokec2 .\strokec7 rating\strokec2 ,\cb1 \
\cb4     \strokec7 p\strokec2 .\strokec7 stock\strokec2 ,\cb1 \
\cb4     \strokec7 p\strokec2 .\strokec7 stock\strokec2  > \cf8 \strokec8 0\cf2 \strokec2  ? \cf6 \strokec6 "In Stock"\cf2 \strokec2  : \cf6 \strokec6 "Out of Stock"\cf2 \cb1 \strokec2 \
\cb4   ]);\cb1 \
\
\cb4   \strokec7 productsSheet\strokec2 .\strokec7 clearContents\strokec2 ();\cb1 \
\cb4   \strokec7 productsSheet\strokec2 .\strokec7 getRange\strokec2 (\cf8 \strokec8 1\cf2 \strokec2 , \cf8 \strokec8 1\cf2 \strokec2 , \cf8 \strokec8 1\cf2 \strokec2 , \strokec7 headers\strokec2 .\strokec7 length\strokec2 )\cb1 \
\cb4     .\strokec7 setValues\strokec2 ([\strokec7 headers\strokec2 ]);\cb1 \
\
\cb4   \cf3 \strokec3 if\cf2 \strokec2  (\strokec7 rows\strokec2 .\strokec7 length\strokec2  > \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4     \strokec7 productsSheet\strokec2 .\strokec7 getRange\strokec2 (\cf8 \strokec8 2\cf2 \strokec2 , \cf8 \strokec8 1\cf2 \strokec2 , \strokec7 rows\strokec2 .\strokec7 length\strokec2 , \strokec7 headers\strokec2 .\strokec7 length\strokec2 )\cb1 \
\cb4       .\strokec7 setValues\strokec2 (\strokec7 rows\strokec2 );\cb1 \
\cb4   \}\cb1 \
\
\cb4   \strokec7 updateCategories_\strokec2 (\strokec7 ss\strokec2 , \strokec7 rows\strokec2 );\cb1 \
\cb4   \strokec7 updateSummary_\strokec2 (\strokec7 ss\strokec2 , \strokec7 rows\strokec2 .\strokec7 length\strokec2 );\cb1 \
\
\cb4   \cf5 \strokec5 SpreadsheetApp\cf2 \strokec2 .\strokec7 flush\strokec2 ();\cb1 \
\cb4   \strokec7 console\strokec2 .\strokec7 log\strokec2 (\cf6 \strokec6 `Imported \cf2 \strokec2 $\{\strokec7 rows\strokec2 .\strokec7 length\strokec2 \}\cf6 \strokec6  products.`\cf2 \strokec2 );\cb1 \
\cb4 \}\cb1 \
\
\cf3 \cb4 \strokec3 function\cf2 \strokec2  \strokec7 getOrCreateSheet_\strokec2 (\strokec7 ss\strokec2 , \strokec7 name\strokec2 ) \{\cb1 \
\cb4   \cf3 \strokec3 return\cf2 \strokec2  \strokec7 ss\strokec2 .\strokec7 getSheetByName\strokec2 (\strokec7 name\strokec2 ) || \strokec7 ss\strokec2 .\strokec7 insertSheet\strokec2 (\strokec7 name\strokec2 );\cb1 \
\cb4 \}\cb1 \
\
\cf3 \cb4 \strokec3 function\cf2 \strokec2  \strokec7 updateCategories_\strokec2 (\strokec7 ss\strokec2 , \strokec7 rows\strokec2 ) \{\cb1 \
\cb4   \cf3 \strokec3 const\cf2 \strokec2  \strokec7 sheet\strokec2  = \strokec7 getOrCreateSheet_\strokec2 (\strokec7 ss\strokec2 , \cf6 \strokec6 "Categories"\cf2 \strokec2 );\cb1 \
\cb4   \cf3 \strokec3 const\cf2 \strokec2  \strokec7 categories\strokec2  = [...\cf3 \strokec3 new\cf2 \strokec2  \cf5 \strokec5 Set\cf2 \strokec2 (\strokec7 rows\strokec2 .\strokec7 map\strokec2 (\strokec7 r\strokec2  => \strokec7 r\strokec2 [\cf8 \strokec8 2\cf2 \strokec2 ]))].\strokec7 sort\strokec2 ();\cb1 \
\
\cb4   \strokec7 sheet\strokec2 .\strokec7 clearContents\strokec2 ();\cb1 \
\cb4   \strokec7 sheet\strokec2 .\strokec7 getRange\strokec2 (\cf8 \strokec8 1\cf2 \strokec2 , \cf8 \strokec8 1\cf2 \strokec2 , \cf8 \strokec8 1\cf2 \strokec2 , \cf8 \strokec8 2\cf2 \strokec2 )\cb1 \
\cb4     .\strokec7 setValues\strokec2 ([[\cf6 \strokec6 "Category"\cf2 \strokec2 , \cf6 \strokec6 "Product Count"\cf2 \strokec2 ]]);\cb1 \
\
\cb4   \cf3 \strokec3 if\cf2 \strokec2  (\strokec7 categories\strokec2 .\strokec7 length\strokec2  === \cf8 \strokec8 0\cf2 \strokec2 ) \cf3 \strokec3 return\cf2 \strokec2 ;\cb1 \
\
\cb4   \cf3 \strokec3 const\cf2 \strokec2  \strokec7 output\strokec2  = \strokec7 categories\strokec2 .\strokec7 map\strokec2 (\strokec7 category\strokec2  => [\cb1 \
\cb4     \strokec7 category\strokec2 ,\cb1 \
\cb4     \strokec7 rows\strokec2 .\strokec7 filter\strokec2 (\strokec7 r\strokec2  => \strokec7 r\strokec2 [\cf8 \strokec8 2\cf2 \strokec2 ] === \strokec7 category\strokec2 ).\strokec7 length\cb1 \strokec2 \
\cb4   ]);\cb1 \
\
\cb4   \strokec7 sheet\strokec2 .\strokec7 getRange\strokec2 (\cf8 \strokec8 2\cf2 \strokec2 , \cf8 \strokec8 1\cf2 \strokec2 , \strokec7 output\strokec2 .\strokec7 length\strokec2 , \cf8 \strokec8 2\cf2 \strokec2 ).\strokec7 setValues\strokec2 (\strokec7 output\strokec2 );\cb1 \
\cb4 \}\cb1 \
\
\cf3 \cb4 \strokec3 function\cf2 \strokec2  \strokec7 updateSummary_\strokec2 (\strokec7 ss\strokec2 , \strokec7 count\strokec2 ) \{\cb1 \
\cb4   \cf3 \strokec3 const\cf2 \strokec2  \strokec7 sheet\strokec2  = \strokec7 getOrCreateSheet_\strokec2 (\strokec7 ss\strokec2 , \cf6 \strokec6 "Summary"\cf2 \strokec2 );\cb1 \
\cb4   \cf3 \strokec3 const\cf2 \strokec2  \strokec7 products\strokec2  = \strokec7 ss\strokec2 .\strokec7 getSheetByName\strokec2 (\cf6 \strokec6 "Products"\cf2 \strokec2 );\cb1 \
\
\cb4   \strokec7 sheet\strokec2 .\strokec7 clearContents\strokec2 ();\cb1 \
\cb4   \strokec7 sheet\strokec2 .\strokec7 getRange\strokec2 (\cf6 \strokec6 "A1:B5"\cf2 \strokec2 ).\strokec7 setValues\strokec2 ([\cb1 \
\cb4     [\cf6 \strokec6 "Metric"\cf2 \strokec2 , \cf6 \strokec6 "Value"\cf2 \strokec2 ],\cb1 \
\cb4     [\cf6 \strokec6 "Products Imported"\cf2 \strokec2 , \strokec7 count\strokec2 ],\cb1 \
\cb4     [\cf6 \strokec6 "Average Price"\cf2 \strokec2 , \cf6 \strokec6 ""\cf2 \strokec2 ],\cb1 \
\cb4     [\cf6 \strokec6 "Total Inventory Units"\cf2 \strokec2 , \cf6 \strokec6 ""\cf2 \strokec2 ],\cb1 \
\cb4     [\cf6 \strokec6 "Out-of-Stock Products"\cf2 \strokec2 , \cf6 \strokec6 ""\cf2 \strokec2 ]\cb1 \
\cb4   ]);\cb1 \
\
\cb4   \cf3 \strokec3 if\cf2 \strokec2  (\strokec7 count\strokec2  > \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4     \strokec7 sheet\strokec2 .\strokec7 getRange\strokec2 (\cf6 \strokec6 "B3"\cf2 \strokec2 ).\strokec7 setFormula\strokec2 (\cf6 \strokec6 "=AVERAGE(Products!E2:E)"\cf2 \strokec2 );\cb1 \
\cb4     \strokec7 sheet\strokec2 .\strokec7 getRange\strokec2 (\cf6 \strokec6 "B4"\cf2 \strokec2 ).\strokec7 setFormula\strokec2 (\cf6 \strokec6 "=SUM(Products!H2:H)"\cf2 \strokec2 );\cb1 \
\cb4     \strokec7 sheet\strokec2 .\strokec7 getRange\strokec2 (\cf6 \strokec6 "B5"\cf2 \strokec2 ).\strokec7 setFormula\strokec2 (\cb1 \
\cb4       \cf6 \strokec6 '=COUNTIF(Products!I2:I,"Out of Stock")'\cf2 \cb1 \strokec2 \
\cb4     );\cb1 \
\cb4   \}\cb1 \
\cb4 \}\cb1 \
\
\cf3 \cb4 \strokec3 function\cf2 \strokec2  \strokec7 createDailyTrigger\strokec2 () \{\cb1 \
\cb4   \cf5 \strokec5 ScriptApp\cf2 \strokec2 .\strokec7 newTrigger\strokec2 (\cf6 \strokec6 "importProducts"\cf2 \strokec2 )\cb1 \
\cb4     .\strokec7 timeBased\strokec2 ()\cb1 \
\cb4     .\strokec7 everyDays\strokec2 (\cf8 \strokec8 1\cf2 \strokec2 )\cb1 \
\cb4     .\strokec7 create\strokec2 ();\cb1 \
\cb4 \}\cb1 \
}