var john = {
    name: 'John Smith',
    bills: [124,148,558,580,42],
    calcTip: function(){
        var percent = 0;
        this.tips = [];
        this.total = [];

        for(var i = 0; i < this.bills.length; i++){
            var bill = this.bills[i];

            if (bill < 50){
                percent = .2;
            } else if (bill <= 200){
                percent = .15;
            } else {
                percent = .1;
            }

            this.tips[i] = percent * bill;
            this.total[i] = (percent * bill) + bill;
        }
    }
}

var mark = {
    name: 'Mark Miller',
    bills: [77,375,110,45],
    calcTip: function(){
        var percent = 0;
        this.tips = [];
        this.total = [];

        for(var i = 0; i < this.bills.length; i++){
            var bill = this.bills[i];

            if (bill < 100){
                percent = .2;
            } else if (bill <= 300){
                percent = .1;
            } else {
                percent = .25;
            }

            this.tips[i] = percent * bill;
            this.total[i] = (percent * bill) + bill;
        }
    }
}

mark.calcTip();
john.calcTip();

console.log(mark);
console.log(john);

john.average = avgTips(john.tips);
mark.average = avgTips(mark.tips);

if (john.average > mark.average){
    console.log("John's family paid more on average in tips.");
} else if (john.average < mark.average){
    console.log("Mark's family paid more on average in tips.");
} else {
    console.log("Both families paid the same amount in tips.");
}

function avgTips(tips){
    var total = 0;

    for(var i = 0; i < tips.length; i++){
        total += tips[i];
    }

    return total / tips.length;
}