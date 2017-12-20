# January 2018 - Data Sources in Microsoft Excel 2016

Note that the following speaking notes may be incomplete.
Their purpose is to remind the presenter what to do next.

## Speaking Notes

Open Excel, and create a blank workbook.

Import first data source, Waste Collection Calendar.
- New sheet
- Data ribbon
- Get & Transform > New Query > From Other Sources > From Web
- Paste URL to wasteCollection.asp
- Navigator window > Table 0
- Load.

Delete "A" row.

Refresh.
-	Notice that "A" row comes back.  Need to clean up in another way.

Note the "Workbook Queries" sidebar.
- Rename "Table 0" to "CollectionCalendar".

Rename sheet.
-	Rename to "CollectionCalendar".

Hover over query.  "Edit".

Filter out one letters.
-	"Day of Week" dropdown.
-	Uncheck "Select All".
-	Select the actual days of the week.

Remove "Calendar" column.

Close and Load.

Add "Current Date" column.
-	`=today()`

Format column to remove time.

Add "Current Week" column.
- `=[@[Current Date]]-weekday([@[Current Date]])`
-	Form column as date.
-	Check work.  Incorrect.  It's a Saturday.
-	Update formula to add 1.

Create a new sheet for Days of Week.
-	Name the sheet "DaysOfWeek".

| Day of Week | Day of Week Offset |
| ----------- | -----------------: |
| Sun         |                 0  |
| Mon         |                 1  |
| Tue         |                 2  |
| Wed         |                 3  |
| Thu         |                 4  |
| Fri         |                 5  |
| Sat         |                 6  |

-	Table ribbon > Table Name > "DaysOfWeek".

Return to “CollectionCalendar”.  Add "Day of Week Offset" column.
-	`VLOOKUP` function.
-	Lookup_value = `[@[Day of Week]]`
-	Table_array = `DaysOfWeek`
-	Col_index_num = `2`
-	Range_lookup = `FALSE`

Add "Current Week Regular Collection Date" column.
-	`=[@[Current Week]]+[@[Day Of Week Offset]]`
-	Format column.
-	Check work.

Remind that stat holidays can affect garbage collection.  Create a new sheet.
-	Data ribbon.
-	Get & Transform > New Query > From Other Sources > From Web
-	Paste statHolidays.txt URL.
-	Load.
-	Rename sheet as "StatHolidays".
-	Rename table as "StatHolidays".

Hover over query.  "Edit".
-	Filter “AffectsGarbageCollection” to only show “TRUE”.
-	Close and Load.

Add "Designated Week" column.
-	`=[@DesignatedDate]-weekday([@DesignatedDate])+1`

Go to CollectionCalendar sheet.  Add "Current Week Stat Date".  Think.
-	Note that when using VLOOKUP, the lookup matches the leftmost column, then returns data from a column to the right.
-	We can’t rearrange the imported and calculated columns, as they will be lost on refresh.

Return to StatHolidays sheet.  Add "Stat Date" column.
-	`=[@DesignatedDate]`

Populate "Current Week Stat Date".
-	`VLOOKUP`
-	Lookup_value = `[@[Current Week]]`
-	Table_array = `StatHolidays[[Designated Week]:[Stat Date]]`
-	Col_index_num = `2`
-	Range_lookup = `FALSE`

Insert "Current Week Collection Affected By Stat" column.
-	`=[@[Current Week Stat Date]]<=[@[Current Week Regular Collection Date]]`

Insert “Current Week Collection Date” column.
-	`IF` function
-	Logical_test = `[@[Current Week Collection Affected By Stat]]`
-	Value_if_true = `[@[Current Week Regular Collection Date]]+1`
-	Value_if_false = `[@[Current Week Regular Collection Date]]`

Add "Next Week" column.
-	`=[@[Current Week]]+7`
-	Format if necessary.

Add "Next Week Regular Collection Date" column.
-	`=[@[Current Week Regular Collection Date]]+7`
-	Format if necessary.

Populate "Next Week Stat Date".
-	`VLOOKUP` function
-	Lookup_value = `[@[Next Week]]`
-	Table_array = `StatHolidays[[Designated Week]:[Stat Date]]`
-	Col_index_num = `2`
-	Range_lookup = `FALSE`

Insert "Next Week Collection Affected By Stat" column.
-	`=[@[Next Week Stat Date]]<=[@[Next Week Regular Collection Date]]`

Note the `#N/A` result.
-	#N/A values calculate #N/A values.
-	Revise formula.
-	`=IFNA([@[Next Week Stat Date]]<=[@[Next Week Regular Collection Date]],FALSE)`
-	Revise "Current Week Collection Affected By Stat" column as well.

Add "Next Week Collection Date" column.
-	`IF` function
-	Logical_test = `[@[Next Week Collection Affected By Stat]]`
-	Value_if_true = `[@[Next Week Regular Collection Date]]+1`
-	Value_if_false = `[@[Next Week Regular Collection Date]]`

Add "Next Collection Date" column.
-	`IF` function
-	Logical_test = `[@[Current Week Collection Date]]>[@[Current Date]]`
-	Value_if_true = `[@[Current Week Collection Date]]`
-	Value_if_false = `[@[Next Week Collection Date]]`

Add a 3D Map.
-	Insert ribbon > 3D Map.
-	Note that the mapping tool tries, but the Street Name alone is not enough to map accurately.

Return to "CollectionCalendar" sheet.  Add "City" column.
-	Type Sault Ste. Marie.
-	Notice it doesn’t fill down.  Formulas work better here.
-	`="Sault Ste. Marie"`

Return to the map.
-	Notice that City is not available.
-	Refresh Data.
-	Under Location, Add Field.
-	Set City.

Return to CollectionCalendar.  Add "Province" and "Country" columns.  Populate accordingly.

Return to map to add columns.
