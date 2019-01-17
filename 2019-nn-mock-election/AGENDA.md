# Mock Election Workshop - Agenda

Note that there are often times multiple ways to solve problems,
and there may be more solutions than the ones offered.

## Step One - We're having an election!


### Call for Candidates Poster - Microsoft Publisher


![Call For Candidates Poster](img/callForCandidates.png)

Start with [Call for Candidates poster](demoDocuments/callForCandidates.pub) in Microsoft Publisher.


#### :x: - A scripting font is used for the heading.

- Generally these fonts are difficult to read, and their use should be limited.

:heavy_check_mark: -
Replace the font with something less decorative.


#### :x: - The heading has a background image that makes the text difficult to read.

- Demo Protanopia and Deuteranopia using [CBSim.jar](http://lpetrich.org/Science/ColorBlindnessSim/ColorBlindnessSim.html#use_app).

:heavy_check_mark: -
Shift the background image down.


#### :x: - The website address is "impossible" to remember.

:heavy_check_mark: -
Use a shortened website address.


#### :x: - Location name and map and included, but simple address information is missing.

:heavy_check_mark: -
Add an easy-to-read address.


---


### Candidate Nomination Form - Microsoft Word

![Nomination Form](img/nominationForm.png)

Start with [Nomination Form](demoDocuments/nominationForm.docx) in Microsoft Word.

#### :x: - Insufficient space to fill out the form.

:heavy_check_mark: -
Add some line spaces around the fields.


#### :x: - Inconsistent abbreviation of the word "number".

:heavy_check_mark: -
Avoid abbreviations if possible.  Expand "No." and "#" to "Number".


#### :x: - Include inconsistent field styles.

:heavy_check_mark: -
Ensure consistency.


---


## Step Two - The candidates are ready

### All Candidate Letter - Microsoft Word

Start with [All Candidate Letter](demoDocuments/allCandidateLetter.docx) in Microsoft Word.


#### :x: - A scripting font is used for the body of the letter.

:heavy_check_mark: -
Replace it with a more appropriate font.


#### :x: - Document uses full justification.

- Full justification is an accessibility concern.

:heavy_check_mark: -
Left justify the text.


#### :x: - Language is unnecessarily complicated.

Check the reading level of the document.

- Under the *File* tab, select *Options*.
- Under *Proofing*, make sure *Show readability statistics* is checked.
- Return to the document.
- Click the *Proofing Errors* button in the bottom-left corner.

:heavy_check_mark: -
Reduce the unnecessary complexity.

#### :x: - Header is the hero.

- It should not be larger than the content.

:heavy_check_mark: -
Reduce the font size of the header.

#### :wrench: - Mail merge the candidate information.

- Make sure [Candidates.csv](candidates/candidates.csv) is downloaded.
- Under the *Mailings* tab, choose *Select Recipients*, then *Use an Existing List*.
- Replace "Mayoral Candidate" with the *CandidateName* merge field.


---


## Step Three - Cast your votes

Have each workstation act as a polling station, submitting up to 110 votes.
Gather those votes into a CSV file.


---


## Step Four - The votes are in!

### Tally the Votes - Microsoft Excel

[Sub Agenda - Tally the Votes](SUBAGENDA-tallyTheVote.md)

Import CSV results into Excel.

- Use pivot tables and charts to summarize and determine winner.
- Use pivot tables and charts to forecast possible "media scandals".
- Change the results of one of the polling stations, forcing a refresh.  i.e. a recount.


---


## Step Five - And the winner is...

**Microsoft PowerPoint** or **Microsoft Publisher**
