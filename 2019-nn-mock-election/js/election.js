(function() {

  const maxVotes = 110;

  let candidatesArray;
  let pollingStationsArray;

  let candidateInputEles;

  let canSubmit = false;
  let submitURL;

  function submitVoteForm(formEvent) {
    formEvent.preventDefault();

    if (!canSubmit) {
      alert("Cannot submit votes.  Please ensure the total number of votes does not exceed the maximum.");
      return;
    }

    $.getJSON(submitURL,
      $(formEvent.currentTarget).serialize(),
      function(json) {

        if (json.success) {
          alert("Votes counted successfully.");
        } else {
          alert("An error occurred.  Please try again.");
        }

      }).fail(function() {
      alert("The Vote Counter app appears to be unavailable.");
    });
  }

  function recalculateVotes() {

    const totalVotesEle = document.getElementById("voteForm--totalVotes");

    totalVotesEle.classList.remove("text-danger");
    canSubmit = true;

    let totalVotes = 0;

    let candidateInputIndex;

    for (candidateInputIndex = 0; candidateInputIndex < candidateInputEles.length; candidateInputIndex += 1) {
      totalVotes += parseInt(candidateInputEles[candidateInputIndex].value);
    }

    totalVotesEle.innerText = totalVotes;

    if (isNaN(totalVotes) || totalVotes > maxVotes) {
      totalVotesEle.classList.add("text-danger");
      canSubmit = false;
    }
  }

  function initVotingForm() {

    // Set up vote counter

    document.getElementById("voteForm--maxVotes").innerText = maxVotes;

    candidateInputEles = document.getElementsByClassName("voteForm--candidate");

    let candidateInputIndex;
    for (candidateInputIndex = 0; candidateInputIndex < candidateInputEles.length; candidateInputIndex += 1) {
      candidateInputEles[candidateInputIndex].addEventListener("change", recalculateVotes);
    }

    // Get vote counter submit URL

    $.getJSON("mockVoteCounter/mockVoteCounter.json", function(json) {

      submitURL = json.submitURL;
      document.getElementById("voteForm").addEventListener("submit", submitVoteForm);
      canSubmit = true;
    });
  }


  // Load Polling Stations
  function loadPollingStations() {

    $.getJSON("pollingStations/pollingStations.json", function(json) {

      pollingStationsArray = json.pollingStations;

      let optionsHTML = "<option value=\"\">(Select a Polling Station)</option>";
      let listHTML = "";

      let index;
      for (index = 0; index < pollingStationsArray.length; index += 1) {

        const pollingStationObj = pollingStationsArray[index];

        listHTML += "<tr>" +
          "<td>" + pollingStationObj.PollingStationKey + "</td>" +
          "<td>" + pollingStationObj.PollingStationName + "</td>" +
          "<td>" + pollingStationObj.Address + "</td>" +
          "</tr>";

        optionsHTML += "<option value=\"" + pollingStationObj.PollingStationKey + "\">" +
          pollingStationObj.PollingStationKey + " - " + pollingStationObj.PollingStationName +
          "</option>";
      }

      document.getElementById("pollingStations-container").innerHTML = listHTML;
      document.getElementById("voteForm--pollingStationKey").innerHTML = optionsHTML;
    });
  }


  // Load Candidates
  function loadCandidates() {

    $.getJSON("candidates/candidates.json", function(json) {

      candidatesArray = json.candidates;

      let listHTML = "";
      let formHTML = "";

      let index;
      for (index = 0; index < candidatesArray.length; index += 1) {

        const candidateObj = candidatesArray[index];

        listHTML += "<div class=\"col-sm-6\">" +
          "<div class=\"card text-white bg-dark mb-2\">" +
          ("<div class=\"card-body\">" +
            "<div class=\"row\">" +
            "<div class=\"col-md-4\">" +
            "<img class=\"img-fluid\" src=\"candidates/" + candidateObj.CandidateImage + "\" alt=\"" + candidateObj.CandidateName + "\" />" +
            "</div>" +
            "<div class=\"col-md-8\">" +
            ("<h3 class=\"card-title\">" +
              candidateObj.CandidateName +
              "</h3>") +
            ("<p class=\"card-text\">" +
              candidateObj.MailingAddress + "<br />" +
              candidateObj.MailingCity + ", " + candidateObj.MailingProvince + "<br />" +
              candidateObj.MailingPostalCode +
              "</p>") +
            "</div>") +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";

        formHTML += "<div class=\"row mb-2\">" +
          "<div class=\"col-sm-4\">" +
          "<label for=\"voteForm--candidate-" + candidateObj.CandidateKey + "\">" +
          candidateObj.CandidateName +
          "</label>" +
          "</div>" +
          "<div class=\"col-sm-8\">" +
          "<input class=\"form-control text-right voteForm--candidate\" id=\"voteForm--candidate-" + candidateObj.CandidateKey + "\" name=\"" + candidateObj.CandidateKey + "\" type=\"number\" value=\"0\" min=\"0\" max=\"" + maxVotes + "\" step=\"1\" required />" +
          "</div>" +
          "</div>";
      }

      document.getElementById("candidates-container").innerHTML = listHTML;
      document.getElementById("voteForm-candidates-container").innerHTML = formHTML;

      initVotingForm();
    });
  }


  loadPollingStations();
  loadCandidates();
}());
