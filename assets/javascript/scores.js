$(document).ready(function () {
    //questionnaire questions/answers object
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

    //questionnaire properties object
    var form = {
        employeeID: "",
        totalScore: 0,
        title: "Employee Questionnaire",
        instructions: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
        depStatus: "",
        sumScoreArray: [],
        count: 0,
    }


    $('input#input_text, textarea#textarea2').characterCounter();

    //function to display title, employee ID input field and instructions
    function displayTitle_Instruct_EmpID() {
        $("#container_1").html(`<h2>${form.title}</h2>`);
        $("#employeeIDspace").html(`<div class=row>
                            <div class="input-field col s3">
                            <input id="input_text" type="text" data-length="3" maxlength="3" class="validate" />
                            <label for="input_text">Employee ID</label></div></div>`);
        $("#form").html(`<h6>${form.instructions}</h6>`);
    }

    //function to display questionnaire questions and asnwers
    function questionsAnswersDisplay(questionnaire) {
        displayTitle_Instruct_EmpID();
        for (var i = 0; i < questionnaire.length; i++) {
            form.count++;
            var question = $('<div class="py-2"><p></p></div>');
            question.attr("id", "question");
            question.text(questionnaire[i].questions).appendTo("#form");

            for (var j = 0; j < questionnaire[i].answers.length; j++) {
                var p = $("<p>");
                var input = $("<input>").attr("type", "radio").attr("name", form.count).addClass("with-gap").attr("id", questionnaire[i].answers[j] + form.count);
                var span = $("<span>").addClass("chosen").attr("data", form.count);
                span.text(questionnaire[i].answers[j]);
                var label = $("<label>").attr("for", questionnaire[i].answers[j] + form.count);
                p.append(label.append(input.add(span)));
                $("#form").append(p);
            }
        }
        return questionnaire;
    }

    //questionnaire results
    function phq9testResults() {
        switch (true) {
            case form.totalScore <= 4:
                form.depStatus = "Minimal Depression";
                break;
            case form.totalScore > 4 && form.totalScore < 10:
                form.depStatus = "Minimal Depression";
                break;
            case form.totalScore > 10 && form.totalScore < 15:
                form.depStatus = "Mild Depression";
                break;
            case form.totalScore > 15 && form.totalScore < 20:
                form.depStatus = "Moderate Depression";
                break;
            case form.totalScore > 20 && form.totalScore < 28:
                form.depStatus = "Severe Depression";
                break;
            default:
                form.depStatus = "Employee has not completed PHQ-9 assessment.";
        }
        form.depStatus = $(`<script>${form.depStatus}</script>`);
        //putAssessment(form.employeeID, form.depStatus);
        //console.log(form.depStatus);
    }

    //on click answer to get a number value from every question
    $(document.body).on("click", '.chosen', function () {
        var chosen = $(this);
        for (var i = 0; i < questionnaire.length; i++) {
            for (var j = 0; j < questionnaire[i].answers.length; j++) {
                if (chosen.text() === questionnaire[i].answers[j] && parseInt(chosen.attr("data")) === i) {
                    questionnaire[i].score = j;
                    form.sumScoreArray.push(questionnaire[i].score);
                }
            }
        }
    })

    //fucntion to sum up score
    function getScore() {
        for (var k = 0; k < form.sumScoreArray.length; k++) {
            form.totalScore += form.sumScoreArray[k];
        }
        return form.totalScore;
    }

    //fucntion to change the html after user submits questionnaire
    function changeDisplay() {
        $('#beforeSub').css('display', 'none');
        $('#afterSub').css('display', 'block');
        setTimeout(function () {
            document.location.replace('./Threat-Alert-P1/finalPage.html');
        }, 3000);
    }


    //on click after submission
    $("#submitB").on("click", function (event) {
        event.preventDefault();

        if ($('#input_text').val().length < 1) {
            $.blockUI({ message: "<h4>You must enter an Employee ID</h4>" });
            setTimeout($.unblockUI, 4000);
            return false;
        }
        else if ($('#input_text').val().length < 3) {
            $.blockUI({ message: "<h4>Please check your Employee ID</h4>" });
            setTimeout($.unblockUI, 4000);
            return false;
        }

        form.employeeID = parseInt($("#input_text").val().trim());
        getScore();
        phq9testResults();
        checkInputs();

    });

    //function to show form before submission
    function displayQuestionnaire() {
        $('#afterSub').css('display', 'none');
        $('#beforeSub').css('display', 'block');
    }

    function checkInputs() {
        var check = true;
        $("input:radio").each(function () {
            var name = $(this).attr("name");
            if ($("input:radio[name=" + name + "]:checked").length == 0) {
                check = false;
            }
        });

        if (check) {
            $.blockUI({ message: '<h5>Thank you for submitting your assessment! </br></br> Your manager will contact you shortly.</h5>' });
            setTimeout(function () {
                changeDisplay();
                $.unblockUI;
            }, 5000);
        }
        else {
            $.blockUI({ message: $('#modalquestion'), css: { width: '275px' } });

            $('#yes').click(function () {
                $.blockUI({ message: "<h5>Please wait while we process your answers...</h5>" });
                console.log('hi');
                setTimeout(function () {
                    changeDisplay();
                }, 5000);

                // $.ajax({ 
                //     url: 'https://www.narscosmetics.com/', 
                //     cache: false, 
                //     complete: function() { 
                //         // unblock when remote call returns 
                //         $.unblockUI(); 
                //     } 
                //}); 
            });

            $('#no').click(function () {
                console.log("works");
                window.location.reload(true);
                $.unblockUI();
                return false;
            });
        }
    }

    //calling functions
    displayQuestionnaire();
    questionsAnswersDisplay(questionnaire);
});

//questionnaire dynamics
//PHQ-9 Depression Test
//Scoring{}
//minimalDep=1-4
//mildDep=5-9
//moderateDep=10-14
//moderatelySevereDep=15-19
//SevereDep=20-27


