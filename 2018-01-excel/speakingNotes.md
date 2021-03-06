# January 2018 - Data Sources in Microsoft Excel 2016

Note that the following speaking notes may be incomplete. Their purpose is to remind the presenter what to do next.

Be sure that participants have the [Workshop Landing Page](https://cityssm.github.io/itWorkshops/2018-01-excel/index.htm) open for links to the necessary data sources.

## Project One - Garbage Collection

(1) - Open Microsoft Excel 2016.  Create a blank workbook.

### Workbook

(2) - Import first data source, **Waste Collection Calendar**.
- Create a new sheet.
- Data ribbon.
- Get & Transform > New Query > From Other Sources > From Web.
- Paste URL to **wasteCollection.asp**.
- Navigator window > Table 0.
- Load.

(3) - In the worksheet, delete "A" row.

(4) - Refresh the data.
-	Notice that "A" row comes back.  We need to clean up in another way.

(5) - Note the *Workbook Queries* sidebar.
- Rename "Table 0" to **CollectionCalendar**.

(6) - Rename sheet.
-	Rename to **CollectionCalendar**.

(7) - Hover over "CollectionCalendar" query.  "Double-click" it, or choose "Edit".

### Power Query

(8) - Filter out letter rows using the "Day of Week" column.
-	"Day of Week" dropdown.
-	Uncheck "Select All".
-	Select the actual days of the week.

(10) - Close and Load.

### Workbook

(11) - Add **Current Date** column.
-	`=today()`
- Format column as a date.

(12) - Add **Current Week** column.
- `=[@[Current Date]]-weekday([@[Current Date]])`
-	Form column as a date.
-	Check work.  Incorrect.  It's a Saturday.
-	Update formula to add 1.

(13) - Create a new sheet for Days of Week.
-	Name the sheet "DaysOfWeek".
- Build the table below.

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

(14) - Return to "CollectionCalendar" sheet.  Add **Day of Week Offset** column.
-	`VLOOKUP` function.
-	Lookup_value = `[@[Day of Week]]`
-	Table_array = `DaysOfWeek`
-	Col_index_num = `2`
-	Range_lookup = `FALSE`

(15) - Add **Current Week Regular Collection Date** column.
-	`=[@[Current Week]]+[@[Day Of Week Offset]]`
-	Format column.
-	Check work.

(16) - Remind that stat holidays can affect garbage collection.  Create a new sheet.
-	Data ribbon.
-	Get & Transform > New Query > From Other Sources > From Web.
-	Paste URL to **statHolidays.csv**.
-	Load.
-	Rename sheet as "StatHolidays".
-	Rename table as "StatHolidays".

(17) - Hover over query.  "Double-click" or choose "Edit".

### Power Query

(18) - Filter "AffectsGarbageCollection" to only show "TRUE".
-	Close and Load.

### Workbook

(19) - Insert **Designated Week** column.
-	`=[@DesignatedDate]-weekday([@DesignatedDate])+1`

(20) - Go to "CollectionCalendar" sheet.  Insert **Current Week Stat Date** column.  Think.
-	Note that when using `VLOOKUP`, the lookup matches the leftmost column, then returns data from a column to the right.
-	We can't rearrange the imported and calculated columns, as they will be lost on refresh.

(21) - Return to "StatHolidays" sheet.  Insert **Stat Date** column.
-	`=[@DesignatedDate]`

(22) - Populate **Current Week Stat Date**.
-	`VLOOKUP` function.
-	Lookup_value = `[@[Current Week]]`
-	Table_array = `StatHolidays[[Designated Week]:[Stat Date]]`
-	Col_index_num = `2`
-	Range_lookup = `FALSE`

(23) - Insert **Current Week Collection Affected By Stat** column.
-	`=[@[Current Week Stat Date]]<=[@[Current Week Regular Collection Date]]`

(24) - Insert **Current Week Collection Date** column.
-	`IF` function.
-	Logical_test = `[@[Current Week Collection Affected By Stat]]`
-	Value_if_true = `[@[Current Week Regular Collection Date]]+1`
-	Value_if_false = `[@[Current Week Regular Collection Date]]`

*Good stopping point if time does not permit.*

(25) - Insert **Next Week** column.
-	`=[@[Current Week]]+7`
-	Format if necessary.

(26) - Insert **Next Week Regular Collection Date** column.
-	`=[@[Current Week Regular Collection Date]]+7`
-	Format if necessary.

(27) - Insert **Next Week Stat Date** column.
-	`VLOOKUP` function.
-	Lookup_value = `[@[Next Week]]`
-	Table_array = `StatHolidays[[Designated Week]:[Stat Date]]`
-	Col_index_num = `2`
-	Range_lookup = `FALSE`

(29) - Insert **Next Week Collection Affected By Stat** column.
-	`=[@[Next Week Stat Date]]<=[@[Next Week Regular Collection Date]]`

(30) - Note the `#N/A` result.
-	`#N/A` values calculate `#N/A` values.
-	Revise formula.
-	`=IFNA([@[Next Week Stat Date]]<=[@[Next Week Regular Collection Date]],FALSE)`
-	Revise "Current Week Collection Affected By Stat" column as well.

(31) - Insert **Next Week Collection Date** column.
-	`IF` function.
-	Logical_test = `[@[Next Week Collection Affected By Stat]]`
-	Value_if_true = `[@[Next Week Regular Collection Date]]+1`
-	Value_if_false = `[@[Next Week Regular Collection Date]]`

(32) - Insert **Next Collection Date** column.
-	`IF` function.
-	Logical_test = `[@[Current Week Collection Date]]>[@[Current Date]]`
-	Value_if_true = `[@[Current Week Collection Date]]`
-	Value_if_false = `[@[Next Week Collection Date]]`

(33) - Hide the unnecessary columns.

---

## Project Two - City Beautification

Create a new workbook.

Add the **City Beautification** data source.

Insert ribbon > 3D Maps.

### 3D Map

Notice that the "Street Name" column is picked up automatically.

Add the "Civic Number" column.
- Note that there is no corresponding geographic type for "Civic Number".
- Could assemble a "full address" if need be.

### Workbook

On a new sheet, add the **OpenAddresses Project** data source.
- CSV is in the "cache" column.

Use the "Merge" tool.
- Data ribbon > New Query > Combine Queries > Merge.
- Top box, select "City Beautifcation" table.
  Use <kbd>Ctrl</kbd> + <kbd>Click</kbd> to select "Civic Number" and "Street Name" columns.
- Bottom box, select "cache" table.
  Use <kbd>Ctrl</kbd> + <kbd>Click</kbd> to select "CivicNumber" and "StreetName" columns.
- Make sure "Left Outer" join is selected.

### Power Query

Query Editor appears.
- Try "Close and Load".

### Workbook

Note that no columns from the merged table appear.

Hover over "merge" query.  Go to "Edit".

### Power Query

"cache" column heading, click "Expand" button.
- Uncheck "(Select All Columns)".
- Check "OA:x" and "OA:y".
- Right-click and rename "OA:x" as **Longitude**.
- Right-click and rename "OA:y" as **Latitude**.
- "Close and Load".

The columns appear.  3D Map it!
- Insert ribbon > 3D Map.
- Delete the old map.
- Create a new map.

### 3D Map

*If the new map doesn't automatically populate.*
- Collapse the "City Beautification" field list to avoid confusion.
- Add the "Longitude" location column.  Set as either "X Coordinate" or "Longitude".
- Add the "Latitude" location column.  Set as either "Y Coordinate" or "Latitude".
