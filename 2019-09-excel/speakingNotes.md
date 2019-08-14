# Speaking Notes

- Introduction
- Ensure everyone has the landing page on their screens.

## Download the Data File

- Browse to "Documents".
- Create a new folder.  Use your name.
- Save the file in the new folder.

## Open the File

- Confirm all users have the file open.

## Format As Table

By formatting the data as a table, Excel will better recognize that all of the data belongs together as a group.
(It also makes it pretty.)

- Ensure you are focused on any cell within the table itself.  
- Under the "Home" ribbon, select "Format as Table".
- Select any colour scheme you like.
- When asked, ensure "My table has headers" is checked.

The table should now be formatted.

## Resize Columns

By default, the formatted table sizes itself to fit the column headings,
but not the column data.  The "Address" column does not fit all of the addresses.

- Hover over the line between column labels "B" and "C".
- When the cursor changes to "two arrows pointing away from each other", double click.

The column should now resize.

## Find an Address

- Next to the "Address" column heading, click the "down arrow" button.
- In the "Search" box, type in the address you are looking for.
- Click "OK".

The sheet should now be filtered by the address you entered.

## Clear the Filter

- Press the "down arrow" button again.
- Click "Clear Filter From Address".

## Question - How Many "Non-Residential" Properties Have Collection?

- Ensure all filters are cleared.
- Next to the "PropertyType" column heading, click the "Down arrow" button..
- Uncheck "Residential".
- Click "OK".

In the bottom status bar, the number of records found is displayed.

**Clear the filter.**

## Sort the Data

- Next to the "Address" column heading, click the "down arrow" button.
- Select "Sort A to Z".

The rows are sorted by "Address", but unfortunately it doesn't make much sense.

- Next to the "PostalCode" column header, click the "down arrow" button.
- Select "Sort A to Z".

The rows are resorted by "PostalCode". Note that the "Address" sort is lost.
Still not great.
Wouldn't it be nice if we could sort by Street Name, then Civic Number?

## Isolate the Civic Number

- Scroll to the top of the spreadsheet.
- Right-click the "C" column label.
- Click "Insert".

A new column should be added between "Address" and "Route_January".

- Click the "Column1" column title.
- Name it "AddressSpace".

We will now add a function to find the space between the civic number and the street name.

- Focus on cell C2.
- Next to the formula bar, click the "Function" button.
- Search for "Find".
- Highlight "FIND".
- Click "OK".

The Function Arguments window should appear.

- In the "Find_text" field, type a space.
- Select the "Within_text" field.
- Click on cell "B2".

If successful, the "Within_text" field should now have "[@Address]" in it.

- Click "OK".

If successful, the entire column should now be populated with the position of the first space in the address.

- Scroll to the top of the spreadsheet.
- Right-click the "D" column label.
- Click "Insert".

A new column should be added between "AddressSpace" and "Route_January".

- Click the "Column1" column title.
- Name it "CivicNumber".
- Focus on cell D2.
- Next to the formula bar, click the "Function" button.
- Search for "left".
- Highlight "LEFT"
- Click "OK".

The Function Arguments window should appear.

- Select the "Text" field.
- Click on cell B2.
- Select the "Num_chars" field.
- Click on cell C2.

Look at the preview.  Note that the Civic Number is shown, but has a space at the end.

- Select the "Num_chars" field.  Put the cursor at the end.
- Type "-1".

Look at the preview.  Note that the space is gone.

- Click "OK".

If successful, the entire column should be populated with civic numbers.

## Isolate the Street Name

- Scroll to the top of the spreadsheet.
- Right-click the "E" column label.
- Click "Insert".

A new column should be added between "CivicNumber" and "Route_January".

- Click the "Column1" column title.
- Name it "StreetName".
- Focus on cell E2.
- Next to the formula bar, click the "Function" button.
- Search for "mid".
- Highlight "MID"
- Click "OK".

The Function Arguments window should appear.

- Select the "Text" field.
- Click on cell B2.
- Select the "Start_num" field.
- Click on cell C2.
- Select the "Num_chars" field.  Type "1000".

Look at the preview.  Note that the Street Name is shown, but with a space at the beginning.

- Select the "Start_num" field.  Put the cursor at the end.
- Type "+1".

Look at the preview.  Note that the space is gone.

- Click "OK".

If successful, the entire column should be populated with street names.

## Sort by Street Name and Civic Number

Remember when sorting previously, when a second column was selected, the sort on the first column was cleared.

- Select the "Data" ribbon.
- Click "Sort".
- Sort by "StreetName", "A to Z".
- Click "Add Level".
- Sort by "CivicNumber", "A to Z".
- Click "OK".

You may receive a Sort Warning.  This is because the CivicNumber column is defined as text,
but Excel thinks it may be numbers.

- Select "Sort anything that looks like a number as a number".

Now sorted nicely by address.
If you want to have the odd and even addresses separated, you could revisit "Sort", and add "PostalCode" between "StreetName" and "CivicNumber".

## Hide the Address Column

It's not necessary to see it.

- Scroll to the top of the spreadsheet.
- Right-click the "C" column label.
- Click "Hide".

## Question - How Many Days Is There Collection on Queen Street East?

- Next to the "StreetName" column heading, click the "down arrow" button.
- Search for "Queen Street East".
- Ensure it is the only street checked.
- Click "OK".

Only the Queen Street East addresses should be shown.

- Next to the "Route_July" column heading, click the "down arrow" button.

Note that the values have been filtered to only include the days of the week with Queen Street East records.

** Clear the filter. **

## Question - How Many Addresses Have New Collection Days?

An address has a new collection day if the values in Route_January and Route_July are not the same.

Create a column.

- Scroll to the top of the spreadsheet.
- Right-click the "H" column label.
- Click "Insert".
- Rename the column "HasNewCollectionDay".
- Double-click space between "H" and "I" to resize the column to fit the title.

Add a formula.

- Click on cell H2.
- Next to the formula bar, click the "Function" button.
- Search for "not".
- Highlight "NOT"
- Click "OK".

The Function Arguments window should appear.

- Select the "Logical" field.
- Click on cell F2.
- Type "=".
- Click on cell G2.
- Click OK.

If successful, the entire column should be populated with true and false values.

- Next to the "HasNewCollectionDay" column header, click the "down arrow" button.
- Uncheck "FALSE".
- Click "OK".

The bottom status bar will display the number of records with new collection days.

## Question - Was the claim of "28% of the city" affected by new collection days correct?

Sure, you could do the division right now.  You could also use a pie chart.

- Select the "Insert" ribbon.
- Click "PivotChart".

A "Create PivotChart" window should appear.

- Ensure that the "Table\Range" field has "Table1" in it.
- Click "OK".

A new sheet will appear with an empty PivotTable and PivotChart.

- Drag "HasNewCollectionDay" into the "Axis (Categories)" box.
- Drag "HasNewCollectionDay" into the "Values" box.

A table and chart should now appear with the same values from the filter in the previous step.
By default, a bar chart is used.

- Select the "Design" ribbon.
- Click "Change Chart Type".
- Select "Pie".
- Click "OK".

The chart should change into a pie chart.

- Right-click the pie chart.
- Select "Add Data Labels".

The chart should now be labeled with the counts.

- Right-click the chart.
- Select "Format Data Labels".
- Under the "Label Contains" section, make sure "Percentage" is checked.

Does it match the percentage from the news release?

## Question - Are the new routes and days evenly distributed?

Obviously there's more to it that below.
Things like proximity to the landfill, closeness of collection stops, etc. have an impact.

- Return to the "addressesWithCollection" sheet.
- Select the "Insert" ribbon.
- Click "PivotTable".

A "Create PivotTable" window should appear.

- Ensure that the "Table\Range" field has "Table1" in it.
- Click "OK".

A new sheet will appear with an empty PivotTable.

- Drag "Route_July" to the "Columns" box.
- Drag "LeafYardWaste_July" to the "Rows" box.
- Drag "Address" to the "Values" box.

Review the data.  Note that the "Rural Area" and "Route B" values are combined for garbage collection.
You can highlight two or more values in the sheet to see a quick sum in the bottom status bar.
