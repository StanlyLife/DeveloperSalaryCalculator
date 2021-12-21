// document.querySelector("#data").innerHTML = JSON.stringify(data);
let DF = [];


UpdateKeys();
UpdateValues();
FixSalaries();
console.log("age salary");
console.log(
  GetAverageNumberValueBasedOnType("age", "salary")
  );
console.log("bonus salary");
console.log(GetAverageNumberValueBasedOnType("bonus", "salary"));
console.log("mean bonus salary");
console.log(GetMeanNumberValueBasedOnType("bonus", "salary"));
console.log("Responses bonus");
console.log(GetResponsesBasedOnType("bonus", ""));
console.log("Responses developers earn most");
console.log(GetResponsesBasedOnType("developersEarnMost", ""));
console.log("Responses happy salary");
console.log(GetResponsesBasedOnType("salaryhappy", ""));
console.log("county salary");
console.log(GetAverageNumberValueBasedOnType("county", "salary"));
console.log("type salary");
console.log(GetAverageNumberValueBasedOnType("type", "salary"));
console.log("sector salary");
console.log(GetAverageNumberValueBasedOnType("sector", "salary"));
var x = GetResponsesBasedOnType("age", "sector");
console.log("Responses age gender");
console.log("RespondantsGoods");
var RespondantsGoods = GetResponsesBasedOnTypeSplit(
  'goods',
  '',
  null,
  null
);
console.log(RespondantsGoods);

/* 
age, gender, gender, gender
1: Gender answer: enig/uenig
  2: Age groups: 
    3: Amount that has answer 1
*/
GetResponsesBasedOnTypeByGroup("shareSalary","openSalary", GetListOfAnswersFor("openSalary"), "openSalary");
console.log("YOE");
// GetAverageNumberValueBasedOnTypeByGroup("yoe","salary", GetListOfAnswersFor("age"));
// console.log("Responses age salary by county");
// GetResponsesBasedOnTypeByGroup("age","salary", GetListOfAnswersFor("county"));
// console.log("age salary by county with responses");
GetAverageNumberValueBasedOnTypeByGroupWithResponses("yoe","salary", GetListOfAnswersFor("age"), "age");
console.log("@@@@@@@@@@"); 
GetMeanValueBasedOnTypeByGroupWithResponses("age","salary", GetListOfAnswersFor("county"), "county");

document.querySelector("#json").textContent  = JSON.stringify(DF, undefined, 2);
function FixSalaries(){
  // var arr = [];
  // DF.forEach(obj => {
  //   if(obj.salary < 2000000 && obj.salary < 300000){
  //     arr.push({yoe: obj.yoe, salary: obj.salary});
  //   }
  // });
  // arr.sort((a,b) => (a.salary > b.salary) ? 1 : ((b.salary > a.salary) ? -1 : 0))
  var arr = [];
  DF.forEach((obj) => {
    if (obj.salary < 2000000 && obj.salary > 300000) {
      arr.push({ ...obj });
    }
  });
  arr.sort((a, b) =>
    a.salary > b.salary ? 1 : b.salary > a.salary ? -1 : 0
  );

  DF = arr;
}
function UpdateKeys(){
  DF = data.map(({
    "Hva er din alder?": age,
    "I hvilket fylke ligger jobben din?": county,
    "Hva beskriver best din arbeidssituasjon?": type,
    "Er du ansatt i det offentlige eller private næringsliv?": sector,
    "Hvor mange års relevant, formell utdannelse har du?": education,
    "Hvor mange års relevant arbeidserfaring har du?": yoe,
    "Hva jobber du mest med?": work,
    "Har du en av disse begrepene i stillingstittelen din?": title,
    "Hva er din grunnlønn? (årslønn før skatt, uten eventuelle bonuser eller overtidsbetaling)": salary,
    "Er du organisert? (Altså medlem av en forening som Tekna, El&it, Nito osv)": union,
    "Pleier du å få mer utbetalt enn grunnlønn på grunn av overtidsbetaling?": overtime,
    "Har du en bonusordning hos din nåværende arbeidsgiver?": bonus,
    "Sist du gikk opp i lønn, hvordan skjedde det? (altså en helt ny lønn eller en lønnsjustering utover indeksregulering, sentrale oppgjør osv.)": raise,
    "Alt i alt - er du fornøyd med din egen lønn?": salaryhappy,
    "Om du skal bytte jobb, hvilke goder kan være like viktig som lønn?": goods,
    "Skal jeg bytte jobb, skal jeg også opp i lønn.": salaryIncreaseByJobChange,
    "Hvor mye man tjener avhenger av hvor flink man er i jobben sin.": skillImportance,
    "Hvor mye man tjener avhenger av hvilken tittel man har.": titleImportance,
    "Hvor mye man tjener avhenger av hvor gammel man er.\" (Altså uavhengig av erfaring og fartstid i selskapet)": ageImportance,
    "Utviklere er blant de som tjener mest på arbeidsplassen min.": developersEarnMost,
    "Jeg tror jeg hadde tjent mer nå om det ikke hadde vært for korona.\" (for eksempel på grunn av manglende lønnsjustering, mindre aktuelt å bytte jobb, osv)": salaryCorona,
    "Jeg synes man bør tjene mer om man jobber hjemmefra.": wfhMore,
    "Jeg synes man bør tjene mindre om man jobber hjemmefra.": wfhLess,
    "Jeg tror kjønn i seg selv spiller inn i hvor mye man tjener.": gender,
    "Om noen spør, synes jeg det er greit å fortelle kolleger hva jeg tjener.": shareSalary,
    "Jeg synes det er greit å spørre kolleger hva de tjener.": askSalary,
    "Vi burde ha mer åpenhet på en arbeidsplass om hva vi tjener.": openSalary,
    ...rest
  }) => ({
    age,
    county,
    type,
    sector,
    education,
    yoe,
    work,
    title,
    salary,
    union,
    overtime,
    bonus,
    raise,
    salaryhappy,
    goods,
    salaryIncreaseByJobChange,
    skillImportance,
    titleImportance,
    ageImportance,
    developersEarnMost,
    salaryCorona,
    wfhMore,
    wfhLess,
    gender,
    shareSalary,
    askSalary,
    openSalary,
    ...rest
  }));
}
function UpdateValues(){
  DF.forEach(obj => {
    obj.salary = obj.salary.replace(",00 kr", "");
    obj.salary = obj.salary.replace(/\s/g,'');
    obj.salary = parseInt(obj.salary);
  })
}
function GetResponsesBasedOnType(name, value, response, arr){
  var dataArray = arr || DF;
  const reduced = dataArray.reduce(function(m, d){
    if(!m[d[name]]){
      m[d[name]] = {...d, count: 1};
      return m;
    }
    m[d[name]][value] += d[value];
    m[d[name]].count += 1;
    return m;
 },{});
 
 // Create new array from grouped data and compute the average
 const result = Object.keys(reduced).map(function(k){
     const item  = reduced[k];
     return {
         name: item[name],
         value: item.count,
     }
 })
 return result;
}
function GetListOfAnswersFor(key){
  const unique = [...new Set(DF.map(item => item[key]))];
  let unqiqueObjects = [];
  unique.forEach(u => {
    o = { name : key, value: u}
    unqiqueObjects.push(o);
  });
  return unique;
}
function GetListOfAnswersWhereKeyIs(key, value){
  let ListOfAnswers = [];
  DF.forEach(u => {
    if(u[key] == value){
      ListOfAnswers.push(u);
    }
  });
  return ListOfAnswers;
}
//#region ValueBasedOnType
function GetAverageNumberValueBasedOnType(name, value, responses, arr){
  var dataArray = arr || DF;

  const reduced = dataArray.reduce(function(m, d){
    if(!m[d[name]]){
      m[d[name]] = {...d, count: 1};
      return m;
    }
    m[d[name]][value] += d[value];
    m[d[name]].count += 1;
    return m;
 },{});
 
 // Create new array from grouped data and compute the average
 const result = Object.keys(reduced).map(function(k){
     const item  = reduced[k];
    if(responses){
      return {
          name: item[name] + ` (${item.count})`,
          value: (item[value]/item.count).toFixed(),
          response: item.count
      }
    }
     return {
         name: item[name],
         value: (item[value]/item.count).toFixed(),
         response: item.count
     }
 })
 return result;
}

function GetMeanNumberValueBasedOnType(name, value, responses, arr){
  var dataArray = arr || DF;
    const reduced = dataArray.reduce(function(m, d){
    if(!m[d[name]]){
      m[d[name]] = {...d, count: 1};
      m[d[name]]["arr"] = []
      return m;
    }
    m[d[name]][value] += d[value];
    m[d[name]]["arr"].push(d[value]);
    m[d[name]].count += 1;
    return m;
 },{});
  const result = Object.keys(reduced).map(function(k){
    const item  = reduced[k];
    if(!item["arr"]){
      return;
    }
    sortedItemArray = item["arr"].sort();
    medianValue = sortedItemArray[(sortedItemArray.length/2).toFixed()];
   if(responses){
     return {
         name: item[name] + ` (${item.count})`,
         value: medianValue,
         response: item.count
     }
   }
    return {
        name: item[name],
        value: medianValue,
        response: item.count
    }
});
 return result;
}
//#endregion
//#region ValueBasedOnTypeByGroup
function GetAverageNumberValueBasedOnTypeByGroup(name, value, group){
  series = [];
  group.forEach(g => {
    var serie = GetAverageNumberValueBasedOnType(name, value);
    var input = {
      name: g,
      series: serie
    };
    series.push(input);
  });
  console.log(series);
  return series;
}
function GetMeanValueBasedOnTypeByGroup(name, value, group){
  series = [];
  group.forEach(g => {
    var serie = GetMeanNumberValueBasedOnType(name, value);
    var input = {
      name: g,
      series: serie
    };
    series.push(input);
  });
  console.log(series);
  return series;
}
//#endregion
//#region BasedOnTypeByGroupWithResponses
function GetMeanValueBasedOnTypeByGroupWithResponses(name, value, group, groupName){
  series = [];
  group.forEach(g => {
    var groupedResponses = GetListOfAnswersWhereKeyIs(groupName, g);
    var serie = GetMeanNumberValueBasedOnType(name, value, true, groupedResponses);
    var input = {
      name: g + ` (${groupedResponses.length})`,
      series: serie
    };
    series.push(input);
  });
  console.log(series);
  return series;
}
function GetAverageNumberValueBasedOnTypeByGroupWithResponses(name, value, group, groupName){
  series = [];
  group.forEach(g => {
    var groupedResponses = GetListOfAnswersWhereKeyIs(groupName, g);
    var serie = GetAverageNumberValueBasedOnType(name, value, true, groupedResponses);
    var input = {
      name: g + ` (${groupedResponses.length})`,
      series: serie
    };
    series.push(input);
  });
  console.log(series);
  return series;
}
//#endregion
function GetResponsesBasedOnTypeByGroup(name, value, group, groupName){
  series = [];
  group.forEach(g => {
    var groupedResponses = GetListOfAnswersWhereKeyIs(groupName, g);
    var serie = GetResponsesBasedOnType(name, value, false, groupedResponses);
    var input = {
      name: g,
      series: serie
    };
    series.push(input);
  });
  console.log(series);
  return series;
}

function GetResponsesBasedOnTypeSplit(name, value, response, arr) {
  var dataArray = DF;

  var results = [];
  dataArray.forEach((obj) => {
    let valg = obj[name].split(',');
    var path = valg.map((x) => x.trim());
    path.forEach((v) => {
      var found = false;
      for (var i = 0; i < results.length; i++) {
        if (results[i].name == v) {
          results[i].value++;
          found = true;
          break;
        }
      }
      if (!found) {
        var o = { name: v, value: 1 };
        results.push(o);
      }
    });
  });
  results = results.filter(function (obj) {
    return obj.value > 5;
  });
  results.sort((a, b) =>
    a.value > b.value ? 1 : b.value > a.value ? -1 : 0
  );
  return results;
}

