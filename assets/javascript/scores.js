$(document).ready(function () {
    var questionnaire = {
        n1: {
            q: "Little interest or pleasure in doing things",
            a: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
        },
        n2: {
            q: "Feeling down, depressed or hopeless",
            a: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
        },
        n3: {
            q: "Trouble falling asleep, stayng asleep, or sleeping too much",
            a: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
        },
        n4: {
            q: "Feeling tired or having little energy",
            a: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
        },
        n5: {
            q: "Poor appetite or overeating",
            a: ["Yes, it's all connected", "No, the brain is divided down the middle and has 2 sides", "Depending on the injury", "Only if the injury is severe"],
        },
        n6: {
            q: "Feeling bad about yourself - or that you're a failure r hav let yourself or your family down",
            a: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
        },
        n7: {
            q: "Trouble concetrating on things, usch as reading the newspaper or watching television",
            a: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
        },
        n8: {
            q: "Moving or speaking so slowly that other people could have noticed. Or, the opposite -being so fidgety or restless that you have been moving around a lot more than usual",
            a: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
        },
        n9: {
            q: "Thoughts that you would be better off dead or of hurting yourself in some way",
            a: ["Not at all", "Several Days", "More Than Half the Days", "Nearly Every Day"],
        },
        n10: {
            q: "If you checked off any problems, how difficult have those problems made it for you to do your work, take care of things at home, or get along with other people?",
            a: ["Not difficult at all", "Somewhat difficult", "Very difficult", "Extremely difficult"],
        }
    }
        

    var title = $('<h2>Employee Questionnaire</h2>').appendTo("#container_1");
    var question= $('<div id="question"><p></p></div>').appendTo("#container_1");

    var option=$("<div>").addClass("row");
    var input=$("<div>").addClass("input-field col s12");
    var p=$("<p>");
    var input=$("<input>").attr("id", count).atrr("type", "radio").attr("value", questionnaire["n"+[i]])
    var label=$("<label>").attr("for", questionnaire["n"+[i].a]).append("n"+[i].a)
  

});

//PHQ-9 Depression Test
//Scoring{}
//minimalDep=1-4
//mildDep=5-9
//moderateDep=10-14
//moderatelySevereDep=15-19
//SevereDep=20-27


