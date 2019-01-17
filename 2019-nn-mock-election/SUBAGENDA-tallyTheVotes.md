## Mock Election Workshop - Sub-Agenda - Tally the Votes

### Set Up Data

Create a new Excel workbook.

Data Ribbon > New Query > From Other Sources > From Web
- [Candidates CSV](candidates/candidates.csv)
- [Polling Stations CSV](pollingStations/pollingStations.csv)
- [Votes CSV](mockVoteCounter/votes.csv) or [Sample Votes CSV](mockVoteCounter/votes-sample.csv)

Data Ribbon > New Query > Combine Queries > Merge
- Table One - Votes
- Table Two - Candidates
- Merge on `CandidateKey`
- In the Power Query window, expand the "candidates" table column.
- Name it `TEMP_VotesMerge`
- Close & Load.

Data Ribbon > New Query > Combine Queries > Merge
- Table One - TEMP_VotesMerge
- Table Two - PollingStations
- Merge on `PollingStationKey`
- In the Power Query window, expand the `pollingStations` table column.
- Name it `VoteResults`
- Close & Load.

Hide `TEMP_VotesMerge` sheet.

---

### Analysis

#### Election Results

Insert Ribbon > PivotChart

- Columns / Legend (Series)
  - candidates.CandidateName

- Values
  - Sum of VoteCount

The highest number of votes is the winner.

#### Voter Turnout by Poll

In the `VoteResults` table, add a `PercentageOfPoll` column.
- `=[@VoteCount]/[@[pollingStations.EligibleVoterCount]]`
- Format the column as a percentage.

Insert Ribbon > PivotTable

- Rows
  - pollingStations.PollingStationName
  - candidates.CandidateName

- Values (May need to refresh to see)
  - Sum of PercentageOfPoll
    - Value Field Settings > Number Format > Percentage

#### 3D Map

Insert Ribbon > 3D Map

Location
- Clear all.
- Add `pollingStations.Address`, `pollingStations.City`, and `pollingStations.Province`.
- Select `Address` radio button.

See how the points are on the polling stations.

Use "Bubble" visualization.
- Set "Size" as `VoteCount`.
- Set "Category" as `candidates.CandidateName`.

Layer Options
- Reduce size.

See how the pies on each polling station show the votes.  The bigger the slice, the more votes for the candidate.

Filter Options

- Add Filter on `candidates.CandidateName`.
- Select and deselect candidates.
  - Compare the two top candidates.
  - Look for areas where candidates were popular or unpopular.
