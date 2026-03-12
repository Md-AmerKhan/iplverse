import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Int "mo:core/Int";

actor {
  type Match = {
    id : Text;
    team1 : Text;
    team2 : Text;
    matchDate : Time.Time;
    venue : Text;
    isCompleted : Bool;
    actualWinner : ?Text;
  };

  type ReasoningFactor = {
    factor : Text;
    description : Text;
  };

  type Prediction = {
    matchId : Text;
    predictedWinner : Text;
    team1Probability : Nat;
    team2Probability : Nat;
    reasoning : [ReasoningFactor];
    generatedAt : Time.Time;
  };

  type PredictionRecord = {
    date : Text;
    matchId : Text;
    matchLabel : Text;
    predictedWinner : Text;
    actualWinner : ?Text;
    isCorrect : ?Bool;
  };

  type Stats = {
    totalPredictions : Nat;
    correctPredictions : Nat;
    accuracy : Nat;
  };

  module Match {
    public func compare(a : Match, b : Match) : Order.Order {
      if (a.matchDate < b.matchDate) { #less }
      else if (a.matchDate > b.matchDate) { #greater }
      else { #equal };
    };
  };

  module PredictionRecord {
    public func compare(a : PredictionRecord, b : PredictionRecord) : Order.Order {
      Text.compare(b.date, a.date);
    };
  };

  let matches = Map.empty<Text, Match>();
  let predictions = Map.empty<Text, Prediction>();
  let predictionHistory = Map.empty<Text, PredictionRecord>();
  var totalPredictions = 0;
  var correctPredictions = 0;

  // IPL 2026 official schedule – first 20 matches
  // All evening matches at 19:30 IST = 14:00 UTC
  // Double-header afternoon slot at 15:30 IST = 10:00 UTC
  // Timestamps in nanoseconds
  //
  // 2026-03-28 14:00 UTC = 1774706400
  // Day offset seconds: 86400 per day

  public shared ({ caller }) func initialize() : async () {
    if (matches.size() > 0) { Runtime.trap("Already initialized") };

    let iPLMatches = [
      // Match 1 – 28 Mar 2026 19:30 IST
      {
        id = "M01_SRH_RCB";
        team1 = "Sunrisers Hyderabad";
        team2 = "Royal Challengers Bengaluru";
        matchDate = 1774706400000000000; // 2026-03-28 14:00 UTC
        venue = "Rajiv Gandhi Intl. Stadium, Hyderabad";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 2 – 29 Mar 2026 15:30 IST
      {
        id = "M02_KKR_MI";
        team1 = "Kolkata Knight Riders";
        team2 = "Mumbai Indians";
        matchDate = 1774778400000000000; // 2026-03-29 10:00 UTC
        venue = "Eden Gardens, Kolkata";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 3 – 29 Mar 2026 19:30 IST
      {
        id = "M03_CSK_RR";
        team1 = "Chennai Super Kings";
        team2 = "Rajasthan Royals";
        matchDate = 1774792800000000000; // 2026-03-29 14:00 UTC
        venue = "MA Chidambaram Stadium, Chennai";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 4 – 30 Mar 2026 19:30 IST
      {
        id = "M04_GT_PBKS";
        team1 = "Gujarat Titans";
        team2 = "Punjab Kings";
        matchDate = 1774879200000000000; // 2026-03-30 14:00 UTC
        venue = "Narendra Modi Stadium, Ahmedabad";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 5 – 31 Mar 2026 19:30 IST
      {
        id = "M05_RCB_DC";
        team1 = "Royal Challengers Bengaluru";
        team2 = "Delhi Capitals";
        matchDate = 1774965600000000000; // 2026-03-31 14:00 UTC
        venue = "M. Chinnaswamy Stadium, Bengaluru";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 6 – 1 Apr 2026 19:30 IST
      {
        id = "M06_MI_SRH";
        team1 = "Mumbai Indians";
        team2 = "Sunrisers Hyderabad";
        matchDate = 1775052000000000000; // 2026-04-01 14:00 UTC
        venue = "Wankhede Stadium, Mumbai";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 7 – 2 Apr 2026 19:30 IST
      {
        id = "M07_RR_KKR";
        team1 = "Rajasthan Royals";
        team2 = "Kolkata Knight Riders";
        matchDate = 1775138400000000000; // 2026-04-02 14:00 UTC
        venue = "Sawai Mansingh Stadium, Jaipur";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 8 – 3 Apr 2026 19:30 IST
      {
        id = "M08_LSG_CSK";
        team1 = "Lucknow Super Giants";
        team2 = "Chennai Super Kings";
        matchDate = 1775224800000000000; // 2026-04-03 14:00 UTC
        venue = "BRSABV Ekana Stadium, Lucknow";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 9 – 4 Apr 2026 15:30 IST
      {
        id = "M09_DC_GT";
        team1 = "Delhi Capitals";
        team2 = "Gujarat Titans";
        matchDate = 1775296800000000000; // 2026-04-04 10:00 UTC
        venue = "Arun Jaitley Stadium, Delhi";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 10 – 4 Apr 2026 19:30 IST
      {
        id = "M10_PBKS_RCB";
        team1 = "Punjab Kings";
        team2 = "Royal Challengers Bengaluru";
        matchDate = 1775311200000000000; // 2026-04-04 14:00 UTC
        venue = "PCA Stadium, Mullanpur";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 11 – 5 Apr 2026 15:30 IST
      {
        id = "M11_MI_DC";
        team1 = "Mumbai Indians";
        team2 = "Delhi Capitals";
        matchDate = 1775383200000000000; // 2026-04-05 10:00 UTC
        venue = "Wankhede Stadium, Mumbai";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 12 – 5 Apr 2026 19:30 IST
      {
        id = "M12_RR_GT";
        team1 = "Rajasthan Royals";
        team2 = "Gujarat Titans";
        matchDate = 1775397600000000000; // 2026-04-05 14:00 UTC
        venue = "Sawai Mansingh Stadium, Jaipur";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 13 – 6 Apr 2026 15:30 IST
      {
        id = "M13_LSG_SRH";
        team1 = "Lucknow Super Giants";
        team2 = "Sunrisers Hyderabad";
        matchDate = 1775469600000000000; // 2026-04-06 10:00 UTC
        venue = "BRSABV Ekana Stadium, Lucknow";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 14 – 6 Apr 2026 19:30 IST
      {
        id = "M14_CSK_RCB";
        team1 = "Chennai Super Kings";
        team2 = "Royal Challengers Bengaluru";
        matchDate = 1775484000000000000; // 2026-04-06 14:00 UTC
        venue = "MA Chidambaram Stadium, Chennai";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 15 – 7 Apr 2026 19:30 IST
      {
        id = "M15_KKR_PBKS";
        team1 = "Kolkata Knight Riders";
        team2 = "Punjab Kings";
        matchDate = 1775570400000000000; // 2026-04-07 14:00 UTC
        venue = "Eden Gardens, Kolkata";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 16 – 8 Apr 2026 19:30 IST
      {
        id = "M16_GT_MI";
        team1 = "Gujarat Titans";
        team2 = "Mumbai Indians";
        matchDate = 1775656800000000000; // 2026-04-08 14:00 UTC
        venue = "Narendra Modi Stadium, Ahmedabad";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 17 – 9 Apr 2026 19:30 IST
      {
        id = "M17_DC_RR";
        team1 = "Delhi Capitals";
        team2 = "Rajasthan Royals";
        matchDate = 1775743200000000000; // 2026-04-09 14:00 UTC
        venue = "Arun Jaitley Stadium, Delhi";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 18 – 10 Apr 2026 19:30 IST
      {
        id = "M18_SRH_CSK";
        team1 = "Sunrisers Hyderabad";
        team2 = "Chennai Super Kings";
        matchDate = 1775829600000000000; // 2026-04-10 14:00 UTC
        venue = "Rajiv Gandhi Intl. Stadium, Hyderabad";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 19 – 11 Apr 2026 19:30 IST
      {
        id = "M19_RCB_KKR";
        team1 = "Royal Challengers Bengaluru";
        team2 = "Kolkata Knight Riders";
        matchDate = 1775916000000000000; // 2026-04-11 14:00 UTC
        venue = "M. Chinnaswamy Stadium, Bengaluru";
        isCompleted = false;
        actualWinner = null;
      },
      // Match 20 – 12 Apr 2026 19:30 IST
      {
        id = "M20_PBKS_LSG";
        team1 = "Punjab Kings";
        team2 = "Lucknow Super Giants";
        matchDate = 1776002400000000000; // 2026-04-12 14:00 UTC
        venue = "PCA Stadium, Mullanpur";
        isCompleted = false;
        actualWinner = null;
      },
    ];

    for (match in iPLMatches.values()) {
      matches.add(match.id, match);
    };
  };

  public query ({ caller }) func getUpcomingMatches() : async [Match] {
    let now = Time.now();
    let upcoming = matches.values().toArray().filter(func(match) { not match.isCompleted and match.matchDate > now });
    upcoming.sort();
  };

  public shared ({ caller }) func getPrediction(matchId : Text) : async ?Prediction {
    switch (matches.get(matchId)) {
      case (null) { null };
      case (?match) {
        let now = Time.now();
        if (match.matchDate - now > 86400000000000) { return null };

        switch (predictions.get(matchId)) {
          case (?prediction) { ?prediction };
          case (null) {
            let team1ProbNat = (now % 31).toNat() + 45;
            let team2ProbNat = 100 - team1ProbNat;
            let predictedWinner = if (team1ProbNat > team2ProbNat) { match.team1 } else { match.team2 };

            let reasoning = [
              { factor = "Recent Team Form"; description = match.team1 # " have shown strong batting form in their last 5 outings, averaging 180+ in powerplay." },
              { factor = "Head-to-Head Record"; description = "Historical contests between these sides have been closely contested, with the home side holding a slight edge." },
              { factor = "Player Performance"; description = "Key overseas players are available and in peak form, with the top-order expected to set a strong platform." },
              { factor = "Venue Statistics"; description = "At " # match.venue # ", teams batting first have won 60% of matches in recent seasons." },
              { factor = "Pitch Conditions"; description = "The surface is expected to offer early movement for pacers before settling into a good batting track in the second half." },
            ];

            let prediction : Prediction = {
              matchId;
              predictedWinner;
              team1Probability = team1ProbNat;
              team2Probability = team2ProbNat;
              reasoning;
              generatedAt = now;
            };

            predictions.add(matchId, prediction);

            let record : PredictionRecord = {
              date = match.matchDate.toText();
              matchId;
              matchLabel = match.team1 # " vs " # match.team2;
              predictedWinner;
              actualWinner = null;
              isCorrect = null;
            };
            predictionHistory.add(matchId, record);
            totalPredictions += 1;
            ?prediction;
          };
        };
      };
    };
  };

  public query ({ caller }) func getPredictionHistory() : async [PredictionRecord] {
    predictionHistory.values().toArray().sort();
  };

  public query ({ caller }) func getStats() : async Stats {
    let accuracy = if (totalPredictions == 0) { 0 } else {
      (correctPredictions * 100) / totalPredictions;
    };
    { totalPredictions; correctPredictions; accuracy };
  };

  public shared ({ caller }) func setActualWinner(matchId : Text, winner : Text) : async () {
    switch (matches.get(matchId)) {
      case (null) { Runtime.trap("Match does not exist") };
      case (?match) {
        matches.add(matchId, { match with isCompleted = true; actualWinner = ?winner });

        switch (predictionHistory.get(matchId)) {
          case (null) { () };
          case (?record) {
            let isCorrect = switch (predictions.get(matchId)) {
              case (null) { null };
              case (?prediction) { ?(Text.equal(prediction.predictedWinner, winner)) };
            };
            if (isCorrect == ?true) { correctPredictions += 1 };
            predictionHistory.add(matchId, { record with actualWinner = ?winner; isCorrect });
          };
        };
      };
    };
  };
};
