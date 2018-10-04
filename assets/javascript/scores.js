$(document).ready(function () {
    var questionnaire = {
        n1: {
            q: "Little interest or pleasure in doing things",
            score: 0,
        },
        n2: {
            q: "Feeling down, depressed or hopeless",
            score: 0,
        },
        n3: {
            q: "Trouble falling asleep, stayng asleep, or sleeping too much",
            score: 0,
        },
        n4: {
            q: "Feeling tired or having little energy",
            score: 0,
        },
        n5: {
            q: "Poor appetite or overeating",
            score: 0,
        },
        n6: {
            q: "Feeling bad about yourself - or that you're a failure r hav let yourself or your family down",
            score: 0,
        },
        n7: {
            q: "Trouble concetrating on things, usch as reading the newspaper or watching television",
            score: 0,
        },
        n8: {
            q: "Moving or speaking so slowly that other people could have noticed. Or, the opposite -being so fidgety or restless that you have been moving around a lot more than usual",
            score: 0,
        },
        n9: {
            q: "Thoughts that you would be better off dead or of hurting yourself in some way",
            score: 0,
        },
        n10: {
            q: "If you checked off any problems, how difficult have those problems made it for you to do your work, take care of things at home, or get along with other people?",
            score: 0,
        },
        a: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
        totalScore: 0,
        title: "Employee Questionnaire",
        instructions: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
        depStatus: "",
        sumScoreArray: [],
    }

    var count = 0;
    $("#container_1").html("<h2>" + questionnaire.title + "</h2><br><h6>" + questionnaire.instructions + "</h6>");

    //function to display questionnaire questions and asnwers
    function questionsAnswersDisplay(questionnaire) {
        for (var i = 1; i < 11; i++) {
            count++;
            var question = $('<div class="py-2"><p></p></div>');
            question.attr("id", "question");
            question.text(questionnaire["n" + i].q).appendTo("#form");

            for (var j = 0; j < 4; j++) {
                var p = $("<p>");
                var input = $("<input>").attr("type", "radio").attr("name", "options").attr("id", questionnaire.a[j]).addClass("with-gap");
                var span = $("<span>").attr("id", "chosen").attr("data", count);
                var input2 = input.add(span);
                span.text(questionnaire.a[j]);
                var label = $("<label>").attr("for", questionnaire.a[j]);
                var answers = label.append(input2);
                p.append(answers);
                $("#form").append(p);
            }
        }
        return questionnaire;
    }

    //phq9Scores(questionsAnswersDisplay);

    function phq9testResults() {
        switch (true) {
            case questionnaire.totalScore <= 4:
                questionnaire.depStatus = "Minimal Depression";
                break;
            case questionnaire.totalScore > 4 && questionnaire.totalScore < 10:
                questionnaire.depStatus = "Minimal Depression";
                break;
            case questionnaire.totalScore > 10 && questionnaire.totalScore < 15:
                questionnaire.depStatus = "Mild Depression";
                break;
            case questionnaire.totalScore > 15 && questionnaire.totalScore < 20:
                questionnaire.depStatus = "Moderate Depression";
                break;
            case questionnaire.totalScore > 20 && questionnaire.totalScore < 28:
                questionnaire.depStatus = "Severe Depression";
                break;
            default:
                questionnaire.depStatus = "Employee has not completed PHQ-9 assesment.";
        }
    }

    $(document.body).on("click", "#chosen", function () {
        // $(this).attr("span:after");
        var chosen = $(this);
        for (var i = 1; i < 11; i++) {
            for (var j = 0; j < 4; j++) {
                if (chosen.text() === questionnaire.a[j] && parseInt(chosen.attr("data")) === i) {
                    questionnaire["n" + i].score = j;
                    console.log(questionnaire["n" + i].score);
                    questionnaire.sumScoreArray.push(questionnaire["n" + i].score);
                    console.log(questionnaire.sumScoreArray);
                }
            }
        }
    })

    //function to calculate PHQ-9 test
    function getScore() {
        for (var k = 0; k < questionnaire.sumScoreArray.length; k++) {
            questionnaire.totalScore += questionnaire.sumScoreArray[k];
        }
        return questionnaire.totalScore;
    }

    //click submit button
    function removeClassb() {
        $("#submitB").removeClass("fa fa-check-square-o");
    }
    function buttonDisplay() {
        setTimeout(removeClassb, 4000);
    }
    $("#submitB").on("click", function (event) {
        event.preventDefault();
        $("#submitB").addClass("fa fa-check-square-o");
        buttonDisplay();
        getScore();
        phq9testResults();
    });

    questionsAnswersDisplay(questionnaire);
});


//PHQ-9 Depression Test
//Scoring{}
//minimalDep=1-4
//mildDep=5-9
//moderateDep=10-14
//moderatelySevereDep=15-19
//SevereDep=20-27


