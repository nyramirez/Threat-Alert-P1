$(document).ready(function () {
    var questionnaire = {
        n1: {q: "Little interest or pleasure in doing things",
            a: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
        },
        n2: { q: "Feeling down, depressed or hopeless",
        },
        n3: {q: "Trouble falling asleep, stayng asleep, or sleeping too much",
        },
        n4: {q: "Feeling tired or having little energy",
        },
        n5: {q: "Poor appetite or overeating",
        },
        n6: {q: "Feeling bad about yourself - or that you're a failure r hav let yourself or your family down",
        },
        n7: {q: "Trouble concetrating on things, usch as reading the newspaper or watching television",
        },
        n8: { q: "Moving or speaking so slowly that other people could have noticed. Or, the opposite -being so fidgety or restless that you have been moving around a lot more than usual",
        },
        n9: {q: "Thoughts that you would be better off dead or of hurting yourself in some way",
        },
        n10: {
            q: "If you checked off any problems, how difficult have those problems made it for you to do your work, take care of things at home, or get along with other people?",
        }
    }

    var title = $('<h2>Employee Questionnaire</h2>').appendTo("#container_1");

    function questionsAnswersDisplay(questionnaire) {
        for (var i = 1; i < 11; i++) {
            var question = $('<div class="py-2"><p></p></div>');
            question.attr("id", "question");
            question.text(questionnaire["n" + i].q).appendTo("#form");

            for (var j = 0; j < 4; j++) {
                var p=$("<p>");
                var input = $("<input>").attr("type", "radio").attr("name", "options");;
                var span=$("<span>");
                var input2=input.add(span);
                span.text(questionnaire["n" + 1].a[j]);
                var label = $("<label>").attr("for", questionnaire["n" + 1].a[j]);
                var answers = label.append(input2);
                p.append(answers);
                $("#form").append(p);
            }
        }
        return questionnaire;
    }
    questionsAnswersDisplay(questionnaire);
});

//PHQ-9 Depression Test
//Scoring{}
//minimalDep=1-4
//mildDep=5-9
//moderateDep=10-14
//moderatelySevereDep=15-19
//SevereDep=20-27


