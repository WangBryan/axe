var htmlparser = require('htmlparser2');

var app = exports = module.exports = {};

var dataLine  = 0;
var dataNum   = 0;
var checkdata = 0;
var grades    = [];
var data      = {};
var person    = {"name": '', "grades": data};
var dataArray = [];

var parser = new htmlparser.Parser({
    onopentag: function (name, attribs) {
        switch (name) {
            case 'tr':
                dataLine++;
                data = {};
                person = {"name": '', "grades": data};
                break;
            case 'td':
                dataNum++;
                checkdata = 1;
                break;
            default:
                break;
        }
    },
    ontext: function (text) {
        if (dataLine == 1 && checkdata == 1) {
            if (dataNum > 1) {
                grades[dataNum - 2] = text;
                // console.log('Text' + dataNum + grades[dataNum - 2]);
            }
        }
        else if (dataLine > 1 && checkdata == 1) {
            if (dataNum == 1) {
                person["name"] = text;
            } else {
                // var str = grades[dataNum - 2];
                // console.log('str' + str);
                data[grades[dataNum - 2]] = parseInt(text);
            }
        }
    },
    onclosetag: function (name) {
        switch (name){
            case 'tr':
                dataNum = 0;
                if (dataLine > 1) {
                    dataArray.push(person);
                }
                break;
            case 'td':
                checkdata = 0;
            default:
                break;
        }
    }
});

app.run = function (data) {
    parser.write(data);
    parser.end();
};

app.getResult = function (getData) {
    // console.log(dataArray);
    getData(dataArray);
}
