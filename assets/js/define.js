    class Employee {
        constructor(iId, sFirstName, sLastName) {
            this.iId = iId;
            this.sFirstName = sFirstName;
            this.sLastName = sLastName;
            this.oEmotions.iAnger = 5;
            this.oEmotions.iFear = 3;
            this.sImageFile = "";
            this.sImageLink = "";
        }
    }

    var oCompany = [{}];

    oComapny[0] = new Employee (1, "Roger", "Byford", "Roger.jpg");
    oCompany[1] = new Employee (2, "Akanksha", "Kapoor", "");
    oCompany[2] = new Employee (3, "Aime", "77", "");
    oCompany[3] = new Employee (4, "Nestor", "Ramirez", "");
 