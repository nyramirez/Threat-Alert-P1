$(document).ready(function () {
    var questionnaire = [{
        questions: "Little interest or pleasure in doing things",
        answers: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
    }, {
        questions: "Feeling down, depressed or hopeless",
        answers: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
    }, {
        questions: "Trouble falling asleep, staying asleep, or sleeping too much",
        answers: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
    }, {
        questions: "Feeling tired or having little energy",
        answers: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
    }, {
        questions: "Poor appetite or overeating",
        answers: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
    }, {
        questions: "Feeling bad about yourself - or that you're a failure or have let yourself or your family down",
        answers: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
    }, {
        questions: "Trouble concetrating on things, such as reading the newspaper or watching television",
        answers: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
    }, {
        questions: "Moving or speaking so slowly that other people could have noticed. Or, the opposite -being so fidgety or restless that you have been moving around a lot more than usual",
        answers: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
    }, {
        questions: "Thoughts that you would be better off dead or of hurting yourself in some way",
        answers: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
    }, {
        questions: "If you checked off any problems, how difficult have those problems made it for you to do your work, take care of things at home, or get along with other people?",
        answers: ["Not at all", "Somewhat Difficult", "Very difficult", "Extremely difficult"],
    }];

    var game = {
        totalScore: 0,
        title: "Employee Questionnaire",
        instructions: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
        depStatus: "",
        sumScoreArray: [],
        count: 0,
    }

    $("#container_1").html(`<h2>${game.title}</h2><br><h6>${game.instructions}</h6>`);
    //function to display questionnaire questions and asnwers
    function questionsAnswersDisplay(questionnaire) {
        for (var i = 0; i < questionnaire.length; i++) {
            game.count++;
            var question = $('<div class="py-2"><p></p></div>');
            question.attr("id", "question");
            question.text(questionnaire[i].questions).appendTo("#form");

            for (var j = 0; j < questionnaire[i].answers.length; j++) {
                var p = $("<p>");
                var input = $("<input>").attr("type", "radio").attr("name", game.count).addClass("with-gap").attr("id", questionnaire[i].answers[j]);
                var span = $("<span>").addClass("chosen").attr("data", game.count);
                span.text(questionnaire[i].answers[j]);
                var label = $("<label>").attr("for", questionnaire[i].answers[j]);
                p.append(label.append(input.add(span)));
                $("#form").append(p);
            }
        }
        return questionnaire;
    }


    //questionnaire results
    function phq9testResults() {
        switch (true) {
            case game.totalScore <= 4:
                game.depStatus = "Minimal Depression";
                break;
            case game.totalScore > 4 && game.totalScore < 10:
                game.depStatus = "Minimal Depression";
                break;
            case game.totalScore > 10 && game.totalScore < 15:
                game.depStatus = "Mild Depression";
                break;
            case game.totalScore > 15 && game.totalScore < 20:
                game.depStatus = "Moderate Depression";
                break;
            case game.totalScore > 20 && game.totalScore < 28:
                game.depStatus = "Severe Depression";
                break;
            default:
                game.depStatus = "Employee has not completed PHQ-9 assesment.";
        }
        game.depStatus = $(`<script>${game.depStatus}</script>`);
        console.log(game.depStatus);
    }

    $(document.body).on("click", '.chosen', function () {
        var chosen = $(this);
        console.log(this);
        for (var i = 0; i < questionnaire.length; i++) {
            for (var j = 0; j < questionnaire[i].answers.length; j++) {
                if (chosen.text() === questionnaire[i].answers[j] && parseInt(chosen.attr("data")) === i) {
                    questionnaire[i].score = j;
                    game.sumScoreArray.push(questionnaire[i].score);
                }
            }
        }
    })

    function getScore() {
        for (var k = 0; k < game.sumScoreArray.length; k++) {
            game.totalScore += game.sumScoreArray[k];
        }
        console.log(game.totalScore);
        return game.totalScore;
    }

    $("#submitB").on("click", function (event) {
        event.preventDefault();
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


